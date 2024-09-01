import {
  Scheduler as DevScheduler,
  WeekView,
  Appointments,
  DayView,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@mui/material';
import { getTodayDate } from '../utils/methods';
import { ChangeSet, EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import { APPOINTMENT_FORM_MESSAGES, PL_LOCALE, TODAY_MESSAGES, VIEW, VIEW_LABEL } from '../utils/constants';
import { useAppointments } from '../utils/hooks/useAppointments';

const currentDate = getTodayDate();

export const Scheduler = () => {
  const { appointments, isLoading, error, addAppointment, updateAppointment, deleteAppointment } = useAppointments();

  const commitChanges = async ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const appointmentToAdd = {
        startDate: currentDate,
        ...added,
      };
      await addAppointment(appointmentToAdd);
    }
    if (changed) {
      await Promise.all(Object.entries(changed).map(([id, updates]) => updateAppointment({ id, ...updates })));
    }
    if (deleted !== undefined) {
      await deleteAppointment(deleted as string);
    }
  };

  if (isLoading) return <p>Ładowanie...</p>;

  if (error) return <p>Wystąpił błąd...</p>;

  return (
    <Paper>
      <DevScheduler data={appointments} locale={PL_LOCALE}>
        <ViewState defaultCurrentDate={currentDate} defaultCurrentViewName={VIEW.WEEK} />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <DayView startDayHour={9} endDayHour={16} displayName={VIEW_LABEL.DAY} />
        <WeekView startDayHour={9} endDayHour={16} displayName={VIEW_LABEL.WEEK} />
        <MonthView displayName={VIEW_LABEL.MONTH} />
        <Toolbar />
        <ViewSwitcher />
        <DateNavigator />
        <TodayButton messages={TODAY_MESSAGES} />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm messages={APPOINTMENT_FORM_MESSAGES} />
      </DevScheduler>
    </Paper>
  );
};
