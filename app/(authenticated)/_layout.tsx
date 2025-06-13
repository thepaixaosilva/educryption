import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function AuthenticatedLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        if (isMounted) {
          setIsLoggedIn(!!token);
        }
      } catch (error) {
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoggedIn === null) {
    return null;
  }

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    />
  );
}
