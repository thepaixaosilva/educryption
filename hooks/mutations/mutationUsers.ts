import { useMutation, useQueryClient } from '@tanstack/react-query';
import User from '../../interfaces/user';
import api from '../../services/api';

const createUser = (user: User) => api.post<User>('/users', user);

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

const updateUser = (user: User) => api.put<User>(`/users/${user.id}`, user);

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_data, user) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', user.id] });
    },
  });
};

const deleteUser = (id: number) => api.delete(`/users/${id}`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};
