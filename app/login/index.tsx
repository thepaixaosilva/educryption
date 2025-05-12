import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/auth';
import Input from '../../components/Input';
import Button from '../../components/Button';
import CustomModal from '../../components/Modal';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Refs
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const fullNameRef = useRef<TextInput>(null);

  // Handlers
  const updateField = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      email: '',
      password: '',
      username: '',
      fullName: '',
    });
  }, []);

  const handleTabChange = useCallback(
    (register: boolean) => {
      setIsRegistering(register);
      resetForm();
    },
    [resetForm],
  );

  const handleSignIn = useCallback(async () => {
    const { email, password } = formData;

    if (!email || !password) {
      Alert.alert('Por favor, preencha email e senha');
      return;
    }

    setIsLoading(true);
    try {
      // Simular uma requisição com 1.5 segundos de delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await signIn(email, password);
      router.push('/home');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  }, [formData, signIn, router]);

  const handleRegister = useCallback(() => {
    const { email, password, username, fullName } = formData;

    if (!email || !password || !username || !fullName) {
      Alert.alert('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      // Implementar função de registro
      Alert.alert('Registro', 'Função a ser implementada');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o registro');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  // Estilos dinâmicos
  const dynamicStyles = {
    titleSection: {
      ...styles.titleSection,
      height: isRegistering
        ? 0.2 * Dimensions.get('window').height
        : 0.3 * Dimensions.get('window').height,
      marginTop: isRegistering ? 10 : 20,
    },
    logo: {
      ...styles.logo,
      width: isRegistering ? 120 : 180,
      height: isRegistering ? 120 : 180,
    },
    mainSection: {
      ...styles.mainSection,
      backgroundColor: '#023E8A',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  };

  const renderForgotPassword = () => {
    if (isRegistering) return null;

    return (
      <TouchableOpacity
        onPress={() => setShowForgotPasswordModal(true)}
        style={styles.forgotPasswordButton}
      >
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>
    );
  };

  const renderRegistrationFields = () => {
    if (!isRegistering) return null;

    return (
      <>
        <Input
          ref={fullNameRef}
          placeholder="Nome completo"
          value={formData.fullName}
          onChangeText={(text) => updateField('fullName', text)}
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => usernameRef.current?.focus()}
        />
        <Input
          ref={usernameRef}
          placeholder="Nome de usuário"
          value={formData.username}
          onChangeText={(text) => updateField('username', text)}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={dynamicStyles.titleSection}>
              <Image
                source={require('../../assets/images/dudu-default.png')}
                style={dynamicStyles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>EduCryption</Text>
            </View>

            <View
              style={[
                styles.tabSection,
                { width: '90%', marginTop: isRegistering ? 16 : 32 },
              ]}
            >
              {['Entrar', 'Registrar'].map((tab, index) => (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.tab,
                    index === (isRegistering ? 1 : 0) && styles.activeTab,
                  ]}
                  onPress={() => handleTabChange(index === 1)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      index === (isRegistering ? 1 : 0) && styles.activeTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={dynamicStyles.mainSection}>
              <View style={styles.formContainer}>
                {renderRegistrationFields()}

                <Input
                  ref={emailRef}
                  placeholder="Email"
                  value={formData.email}
                  onChangeText={(text) => updateField('email', text)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                />

                <Input
                  ref={passwordRef}
                  placeholder="Senha"
                  value={formData.password}
                  onChangeText={(text) => updateField('password', text)}
                  isPassword={true}
                  autoCapitalize="none"
                  returnKeyType="send"
                  onSubmitEditing={
                    isRegistering ? handleRegister : handleSignIn
                  }
                />

                {renderForgotPassword()}
              </View>
            </View>

            <View style={styles.buttonSection}>
              <View style={{ width: '90%' }}>
                <Button
                  color={isRegistering ? '#28a745' : '#28a745'}
                  onPress={isRegistering ? handleRegister : handleSignIn}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>
                      {isRegistering ? 'Criar conta' : 'Entrar'}
                    </Text>
                  )}
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomModal
        visible={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        title="Recuperar Senha"
        confirmText="Enviar"
        style={styles.modal}
      >
        <Text style={styles.modalText}>
          Insira seu email para recuperar sua senha
        </Text>
        <Input
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => updateField('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </CustomModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // paddingHorizontal: 24,
  },
  titleSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    // As dimensões serão definidas dinamicamente
  },
  title: {
    fontSize: 36,
    color: '#336699',
    fontFamily: 'LilitaOne-Regular',
    marginBottom: 8,
  },
  mainSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  tabSection: {
    flexDirection: 'row',
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#023E8A',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Poppins-Medium',
  },
  activeTabText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  formContainer: {
    width: '100%',
    gap: 16,
    backgroundColor: '#023E8A',
    marginTop: 16,
    marginBottom: 16,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  forgotPassword: {
    color: '#f5f5f5',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  buttonSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#023E8A',
    paddingVertical: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  modal: {
    backgroundColor: '#fff',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default Login;
