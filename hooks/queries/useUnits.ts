import { useQuery } from '@tanstack/react-query';
import Unit from '../../interfaces/unit';
import api from '../../services/api';

const fetchUnits = () => api.get<Unit[]>('/units');

export function useUnits() {
  return useQuery({
    queryKey: ['units'],
    queryFn: () => fetchUnits(),
    select: (response) => response.data,
  });
}
