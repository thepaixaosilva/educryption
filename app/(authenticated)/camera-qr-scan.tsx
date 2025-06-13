import { CameraView } from "expo-camera";
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// não é usado no código, coloquei só pra controle interno kkk
const todasAtividades = [
  { titulo: 'DES Fase 1: Expansão' },
  { titulo: 'DES Fase 2: XOR' },
  { titulo: 'DES Fase 3: S-Box' },
  { titulo: 'DES Fase 4: P-Box' },
]

export default function qrScanCamera() {
  const [hasScanned, setHasScanned] = useState(false)

  const desbloquearAtividade = async (atividade: string) => {
    const json = await AsyncStorage.getItem('atividadesDesbloqueadas')
    const desbloqueadas = json ? JSON.parse(json) : []

    if (!desbloqueadas.includes(atividade)) {
      desbloqueadas.push(atividade)
      await AsyncStorage.setItem('atividadesDesbloqueadas', JSON.stringify(desbloqueadas))
    }
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    if (!hasScanned) {
      setHasScanned(true)
      Alert.alert("Atividade desbloqueada: ", ` ${data}`, [
        {
          text: "OK", onPress: () => {
            setHasScanned(false)
            router.replace("/(authenticated)/(tabs)/qr-scan")
            desbloquearAtividade(data)
          }
        }
      ])
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      <CameraView
        style={styles.camStyle}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.guideBox} />

      <Pressable style={styles.cancelButton} onPress={() => router.replace("./qr-scan")}>
        <Text style={styles.cancelButtonText}>Cancelar</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camStyle: {
    width: '100%',
    height: '100%',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: '#FF5252',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guideBox: {
    position: 'absolute',
    top: '35%',
    left: '15%',
    width: '70%',
    height: '30%',
    borderWidth: 3,
    borderColor: '#00FFAA',
    borderRadius: 12,
    zIndex: 10,
  },
})
