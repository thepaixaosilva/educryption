import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import Activity from '../../interfaces/activity';

const fetchActivities = () => api.get<Activity[]>('/activities');

export function useActivities() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities(),
    select: (response) => response.data,
  });
}

export function useActivityById(id: string) {
  return useQuery({
    queryKey: ['activity', id],
    queryFn: async () => {
      const { data } = await api.get<Activity>(`/activities/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
