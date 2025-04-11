import { useQuery } from '@tanstack/react-query';
import api from '../../services/api';
import Activity from '../../interfaces/activity';

const fetchActivities = () => api.get<Activity[]>('/activities');

export function useActivitiess() {
  return useQuery({
    queryKey: ['activities'],
    queryFn: () => fetchActivities(),
    select: (response) => response.data,
  });
}
