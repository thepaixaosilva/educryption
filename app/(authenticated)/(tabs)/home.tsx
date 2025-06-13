import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../contexts/auth';
import Button from '../../../components/Button';
import { useUsers } from '../../../hooks/queries/useUsers';

export default function App() {
  const { signOut } = useAuth();
  const { data, refetch } = useUsers();
  return (
    <View style={styles.container}>
      <Text>{(data && data[0]?.email) || `nada`}</Text>
      <StatusBar style="auto" />

      <Button onPress={() => signOut()} color="green">
        <Text>Aoba</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
