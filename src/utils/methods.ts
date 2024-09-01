import { db } from 'src/libs/db/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { QUERY_KEYS } from './constants';
import { AppointmentModel } from '@devexpress/dx-react-scheduler';

export const getTodayDate = () => new Date().toISOString().split('T')[0];

export const generateRandomId = () => Date.now().toString(36).concat(Math.random().toString(36).substring(2));

export const fetchAppointments = async (): Promise<AppointmentModel[]> => {
  try {
    const appointmentCollection = collection(db, QUERY_KEYS.APPOINTMENT_KEY);
    const querySnapshot = await getDocs(appointmentCollection);
    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        startDate: data.startDate.toDate().toISOString(),
        endDate: data.endDate.toDate().toISOString(),
        title: data.title,
        allDay: data.allDay,
        notes: data.notes,
        rRule: data.rRule || '',
      } as AppointmentModel;
    });
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
};

export const addAppointment = async (appointment: AppointmentModel): Promise<void> => {
  try {
    const appointmentCollection = collection(db, QUERY_KEYS.APPOINTMENT_KEY);
    await addDoc(appointmentCollection, {
      ...appointment,
      startDate: new Date(appointment.startDate),
      endDate: new Date(appointment.endDate!),
    });
  } catch (error) {
    throw new Error(`Error adding appointment: ${error}`);
  }
};

export const updateAppointment = async ({
  id,
  ...updates
}: Partial<AppointmentModel> & { id: string }): Promise<Partial<AppointmentModel> & { id: string }> => {
  try {
    const appointmentCollection = collection(db, QUERY_KEYS.APPOINTMENT_KEY);
    const appointmentRef = doc(appointmentCollection, id);
    await updateDoc(appointmentRef, {
      ...updates,
    });
    return { id, ...updates };
  } catch (error) {
    throw new Error(`Error updating appointment: ${error}`);
  }
};

export const deleteAppointment = async (id: string): Promise<void> => {
  try {
    const appointmentCollection = collection(db, QUERY_KEYS.APPOINTMENT_KEY);
    const appointmentRef = doc(appointmentCollection, id);
    await deleteDoc(appointmentRef);
  } catch (error) {
    throw new Error(`Error removing appointment: ${error}`);
  }
};
