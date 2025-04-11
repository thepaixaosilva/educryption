import { useMutation, useQueryClient } from '@tanstack/react-query';
import Unit from '../../interfaces/unit';
import api from '../../services/api';

const createUnit = (unit: Unit) => api.post<Unit>('/units', unit);

export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: Unit) => createUnit(unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
  });
};

const updateUnit = (unit: Unit) => api.put<Unit>(`/units/${unit.id}`, unit);

export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (unit: Unit) => updateUnit(unit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
  });
};

const deleteUnit = (id: number) => api.delete<Unit>(`/units/${id}`);

export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
  });
};
