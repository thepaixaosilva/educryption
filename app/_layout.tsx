import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from '../contexts/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function Layout() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
