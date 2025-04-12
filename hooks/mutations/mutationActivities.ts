import { useMutation, useQueryClient } from '@tanstack/react-query';
import Activity from '../../interfaces/activity';
import api from '../../services/api';

const createActivity = (activity: Partial<Activity>) =>
  api.post<Activity>('/activities', activity);

export function useCreateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivity,
    onSuccess: (response) => {
      const activity = response.data;
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.setQueryData(['activity', activity.id], activity);
    },
  });
}

const updateActivity = (activity: Activity) =>
  api.put<Activity>(`/activities/${activity.id}`, activity);

export function useUpdateActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateActivity,
    onSuccess: (_res, activity) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', activity.id] });
    },
  });
}

const deleteActivity = (id: number) => api.delete(`/activities/${id}`);

export function useDeleteActivity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: (_res, id) => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      queryClient.invalidateQueries({ queryKey: ['activity', id] });
    },
  });
}
