import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, Linking, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function qrScan() {
  const [permission, requestPermission] = useCameraPermissions()
  const isPermissionGranted = Boolean(permission?.granted)
  const limparAtividadesDesbloqueadas = async () => {
    try {
      await AsyncStorage.removeItem('atividadesDesbloqueadas')
      console.log('Atividades desbloqueadas removidas com sucesso.')
    } catch (error) {
      console.error('Erro ao limpar atividades desbloqueadas:', error)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.title} onPress={limparAtividadesDesbloqueadas}>Desbloquear Atividades</Text>
      <Text style={styles.subtitle}>Escaneie o QR Code fornecido na aula para desbloquear as atividades.</Text>

      <Pressable
        style={[styles.button, styles.greenButton]}
        onPress={async () => {
          const { status } = await requestPermission()

          if (status === 'granted') {
            Alert.alert("Permissão concedida", "A câmera está autorizada.")
          }
        }}
      >
        <Text style={styles.buttonText}>Permissão de Câmera</Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("./camera-qr-scan")}
        style={[
          styles.button,
          styles.yellowButton,
          { opacity: isPermissionGranted ? 1 : 0.5 },
        ]}
        disabled={!isPermissionGranted}
      >
        <Text style={styles.buttonText}>Ler QR Code</Text>
      </Pressable>

      {/* Link para home */}
      <Pressable onPress={() => router.replace("/")}>
        <Text style={styles.homeLink}>Voltar para Home</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 20,
    padding: 20,
  },
  homeLink: {
    marginTop: 30,
    color: '#1976D2',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: 220,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  greenButton: {
    backgroundColor: '#9E9E9E',
  },
  yellowButton: {
    backgroundColor: '#1565C0',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
})