import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';

export default function Login() {
  const router = useRouter();
  const { user, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (email && password) {
      setIsLoading(true);
      try {
        // Simular uma requisição com 1.5 segundos de delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push('/home');
        // signIn(email, password);
      } catch (error) {
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert('Por favor, preencha email e senha');
    }
  };

  const handleRegister = () => {
    if (email && password) {
      // Implementar função de registro
      Alert.alert('Registro', 'Função a ser implementada');
    } else {
      Alert.alert('Por favor, preencha email e senha');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Image
          source={require('../../assets/images/dudu-default.png')}
          style={{ width: 100, height: 100 }} // Ajuste o tamanho conforme necessário
        />
        <Text style={styles.title}>EduCryption</Text>
      </View>

      <View style={styles.mainSection}>
        <View style={styles.tabSection}>
          <TouchableOpacity
            style={[styles.tab, !isRegistering && styles.activeTab]}
            onPress={() => setIsRegistering(false)}
          >
            <Text
              style={[styles.tabText, !isRegistering && styles.activeTabText]}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, isRegistering && styles.activeTab]}
            onPress={() => setIsRegistering(true)}
          >
            <Text
              style={[styles.tabText, isRegistering && styles.activeTabText]}
            >
              Registro
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          {!isRegistering && (
            <TouchableOpacity
              onPress={() => {
                setShowForgotPasswordModal(true);
              }}
            >
              <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.buttonSection}>
        <Button
          color={isRegistering ? '#28a745' : '#3AC2F2'}
          onPress={isRegistering ? handleRegister : handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isRegistering ? 'Registrar' : 'Entrar'}
            </Text>
          )}
        </Button>
      </View>
      {showForgotPasswordModal && (
        <CustomModal
          visible={showForgotPasswordModal}
          onClose={() => setShowForgotPasswordModal(false)}
          title="Recuperar Senha"
          confirmText="Enviar"
          style={styles.modal}
        >
          <Text>Insira seu email para recuperar sua senha</Text>
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
        </CustomModal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  titleSection: {
    flexDirection: 'row',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainSection: {
    height: '50%',
    paddingHorizontal: 24,
  },
  tabSection: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTab: {
    borderBottomColor: '#3AC2F2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#336699',
    fontWeight: '600',
  },
  formContainer: {
    width: '100%',
  },
  forgotPassword: {
    color: '#336699',
    textAlign: 'right',
    marginTop: 8,
    fontSize: 14,
  },
  buttonSection: {
    height: '20%',
    justifyContent: 'flex-end',
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#336699',
    fontFamily: 'LilitaOne-Regular',
  },
  buttonText: {
    color: '#f3f3f3',
    fontSize: 16,
    fontWeight: '500',
  },
  modal: {
    maxHeight: '60%',
    backgroundColor: '#f3f3f3',
  },
});
