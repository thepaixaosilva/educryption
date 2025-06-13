import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import api from '../../services/api';

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data } = await api.post('/api/auth/login', { email, password });

      await Promise.all([
        SecureStore.setItemAsync('access_token', data.token),
        SecureStore.setItemAsync('refresh_token', data.refreshToken),
      ]);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
