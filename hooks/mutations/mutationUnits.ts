import { useMutation, useQueryClient } from '@tanstack/react-query';
import Unit from '../../interfaces/unit';
import api from '../../services/api';

const createUnit = (unit: Partial<Unit>) => api.post<Unit>('/units', unit);

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUnit,
    onSuccess: (response) => {
      const unit = response.data;
      queryClient.invalidateQueries({ queryKey: ['units'] });
      queryClient.setQueryData(['unit', unit.id], unit);
    },
  });
}

const updateUnit = (unit: Unit) => api.put<Unit>(`/units/${unit.id}`, unit);

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUnit,
    onSuccess: (_data, unit) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      queryClient.invalidateQueries({ queryKey: ['unit', unit.id] });
    },
  });
}

const deleteUnit = (id: number) => api.delete(`/units/${id}`);

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUnit,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['units'] });
      queryClient.invalidateQueries({ queryKey: ['unit', id] });
    },
  });
}
