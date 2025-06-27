import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Home = () => {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Atividades DES</Text>
          <View style={styles.titleUnderline} />
        </View>

        <TouchableOpacity style={styles.qrButton} onPress={() => router.replace('/(authenticated)/(tabs)/qr-scan')}>
          <Ionicons name="qr-code-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.qrButtonText}>Ler QR Code</Text>
        </TouchableOpacity>

        <View style={[styles.unitBox, styles.disabledUnit]}>
          <MaterialIcons name="lock-outline" size={28} color="#ccc" style={styles.icon} />
          <Text style={styles.unitText}>1ª Fase DES</Text>
          <Text style={styles.unitNote}>Em breve</Text>
        </View>

        <TouchableOpacity
          style={styles.unitBox}
          onPress={() => router.replace('/(authenticated)/activities/des/function1')}
        >
          <MaterialIcons name="lock-open" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.unitText}>2ª Fase DES - Função 1: Expansão</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.unitBox}
          onPress={() => router.replace('/(authenticated)/activities/des/function2')}
        >
          <MaterialIcons name="lock-open" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.unitText}>2ª Fase DES - Função 2: XOR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.unitBox}
          onPress={() => router.replace('/(authenticated)/activities/des/function3')}
        >
          <MaterialIcons name="lock-open" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.unitText}>2ª Fase DES - Função 3: S-Box</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.unitBox}
          onPress={() => router.replace('/(authenticated)/activities/des/function4')}
        >
          <MaterialIcons name="lock-open" size={28} color="#fff" style={styles.icon} />
          <Text style={styles.unitText}>2ª Fase DES - Função 4: P-Box</Text>
        </TouchableOpacity>

        <View style={[styles.unitBox, styles.disabledUnit]}>
          <MaterialIcons name="lock-outline" size={28} color="#ccc" style={styles.icon} />
          <Text style={styles.unitText}>3ª Fase DES</Text>
          <Text style={styles.unitNote}>Em breve</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 24,
    alignItems: 'center',
    paddingTop: 60, // mais afastado do topo
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: '#336699',
    fontFamily: 'LilitaOne-Regular',
  },
  titleUnderline: {
    marginTop: 4,
    width: 60,
    height: 4,
    backgroundColor: '#023E8A',
    borderRadius: 2,
  },
  unitBox: {
    width: '100%',
    backgroundColor: '#023E8A',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  unitText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 4,
  },
  unitNote: {
    color: '#e0e0e0',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginTop: 6,
  },
  disabledUnit: {
    backgroundColor: '#7baedc',
  },
  icon: {
    marginBottom: 4,
  },
  qrButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#0077B6',
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 12,
  alignSelf: 'center',
  marginBottom: 24,
  elevation: 2,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},

qrButtonText: {
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Poppins-SemiBold',
},
});