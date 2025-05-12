import { useMutation, useQueryClient } from '@tanstack/react-query';
import User from '../../interfaces/user';
import api from '../../services/api';

const createUser = (user: Partial<User>) => api.post<User>('/api/users', user);

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (response) => {
      const user = response.data;
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.setQueryData(['user', user.id], user);
    },
  });
}

const updateUser = (user: User) => api.put<User>(`/api/users/${user.id}`, user);

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    },
  });
}

const deleteUser = (id: number) => api.delete(`/api/users/${id}`);

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
}
