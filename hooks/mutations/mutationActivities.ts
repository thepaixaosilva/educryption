import { useMutation, useQueryClient } from '@tanstack/react-query';
import Activity from '../../interfaces/activity';
import api from '../../services/api';

const createActivity = (activity: Activity) =>
  api.post<Activity>('/activities', activity);

export const useCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => createActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

const updateActivity = (activity: Activity) =>
  api.put<Activity>(`/activities/${activity.id}`, activity);

export const useUpdateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (activity: Activity) => updateActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};

const deleteActivity = (id: number) =>
  api.delete<Activity>(`/activities/${id}`);

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteActivity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });
};
