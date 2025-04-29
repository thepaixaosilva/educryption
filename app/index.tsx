import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/auth';

export default function Index() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
