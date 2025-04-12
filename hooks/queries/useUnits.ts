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

export function useUnitById(id: string) {
  return useQuery({
    queryKey: ['unit', id],
    queryFn: async () => {
      const { data } = await api.get<Unit>(`/units/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
