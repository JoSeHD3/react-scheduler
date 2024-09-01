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
import { generateRandomId, getTodayDate } from '../utils/methods';
import {
  AppointmentModel,
  ChangeSet,
  EditingState,
  IntegratedEditing,
  ViewState,
} from '@devexpress/dx-react-scheduler';
import { APPOINTMENT_FORM_MESSAGES, PL_LOCALE, TODAY_MESSAGES, VIEW, VIEW_LABEL } from '../utils/constants';
import { useState } from 'react';

const currentDate = getTodayDate();
const initialData: AppointmentModel[] = [
  { id: generateRandomId(), startDate: `${currentDate}T09:45`, endDate: `${currentDate}T11:00`, title: 'Spotkanie' },
];

export const Scheduler = () => {
  const [data, setData] = useState<AppointmentModel[]>(initialData);

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const newAppointment: AppointmentModel = {
        id: generateRandomId(),
        startDate: added.startDate!,
        ...added,
      };
      setData([...data, newAppointment]);
    }
    if (changed) {
      const updatedData = data.map((appointment) =>
        changed[appointment.id as string] ? { ...appointment, ...changed[appointment.id as string] } : appointment
      );
      setData(updatedData);
    }
    if (deleted !== undefined) {
      const filteredData = data.filter((appointment) => appointment.id !== deleted);
      setData(filteredData);
    }
  };
  return (
    <Paper>
      <DevScheduler data={data} locale={PL_LOCALE}>
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
