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
import { ViewState } from '@devexpress/dx-react-scheduler';
import { VIEW } from '../utils/constants';

const currentDate = getTodayDate();
const schedulerData = [{ startDate: `${currentDate}T09:45`, endDate: `${currentDate}T11:00`, title: 'Meeting' }];

export const Scheduler = () => (
  <Paper>
    <DevScheduler data={schedulerData}>
      <ViewState defaultCurrentDate={currentDate} defaultCurrentViewName={VIEW.WEEK} />
      <DayView startDayHour={9} endDayHour={16} />
      <WeekView startDayHour={9} endDayHour={16} />
      <MonthView />
      <Toolbar />
      <ViewSwitcher />
      <DateNavigator />
      <TodayButton />
      <Appointments />
      <AppointmentTooltip showCloseButton showOpenButton />
      <AppointmentForm readOnly />
    </DevScheduler>
  </Paper>
);
