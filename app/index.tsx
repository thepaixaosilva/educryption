import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/auth';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3AC2F2" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/home" />;
  }

  return <Redirect href="/login" />;
}
