import { useQuery } from '@tanstack/react-query';
import User from '../../interfaces/user';
import api from '../../services/api';

const fetchUsers = () => api.get<User[]>('/users');

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    select: (response) => response.data,
  });
}

export function useUser() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export function useUserById(id: number) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await api.get<User>(`/users/${id}`);
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
}
