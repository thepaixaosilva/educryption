import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useQueryClient } from '@tanstack/react-query';
import { useSignIn } from '../hooks/queries/useAuth';
import { useUser } from '../hooks/queries/useUsers';

type AuthContextType = {
  user: any;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isRestoring, setIsRestoring] = useState(true);

  const { data: user, isLoading: userLoading } = useUser();
  const { mutateAsync: signInMutation, isPending: signingIn } = useSignIn();

  const signIn = async (email: string, password: string) => {
    const data = await signInMutation({ email, password });

    await SecureStore.setItemAsync('access_token', data.token);
    await SecureStore.setItemAsync('refresh_token', data.refreshToken);

    await queryClient.invalidateQueries({ queryKey: ['user'] });

    router.replace('/');
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');

    queryClient.clear();
    router.replace('/login');
  };

  const restoreSession = async () => {
    const token = await SecureStore.getItemAsync('access_token');

    if (!token) {
      setIsRestoring(false);
      return;
    }

    await queryClient.invalidateQueries({ queryKey: ['user'] });
    setIsRestoring(false);
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isRestoring || userLoading || signingIn,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
