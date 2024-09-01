import { useMutation, useQuery, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/utils/constants';
import { addAppointment, deleteAppointment, fetchAppointments, updateAppointment } from 'src/utils/methods';

export const useAppointments = () => {
  const queryClient = useQueryClient();

  const {
    data: appointments,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.APPOINTMENT_KEY],
    queryFn: fetchAppointments,
  });

  const mutationAdd = useMutation(addAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const mutationUpdate = useMutation(updateAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  const mutationDelete = useMutation(deleteAppointment, {
    onSuccess: () => {
      queryClient.invalidateQueries('appointments');
    },
  });

  return {
    appointments,
    isLoading,
    error,
    addAppointment: mutationAdd.mutate,
    updateAppointment: mutationUpdate.mutate,
    deleteAppointment: mutationDelete.mutate,
  };
};
