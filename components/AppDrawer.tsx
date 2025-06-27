import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/auth';
import Icons from '../assets/icons/Icons';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

interface AppDrawerProps {
  visible: boolean;
  onClose: () => void;
}

export default function AppDrawer({ visible, onClose }: AppDrawerProps) {
  const router = useRouter();
  const { signOut } = useAuth();
  const translateX = React.useRef(new Animated.Value(DRAWER_WIDTH)).current;

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: visible ? 0 : DRAWER_WIDTH,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  const handleNavigate = (route: string) => {
    onClose();
    router.push(route);
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={1} 
        onPress={onClose} 
      />
      <Animated.View
        style={[
          styles.drawer,
          { transform: [{ translateX }] }
        ]}
      >
        <ScrollView bounces={false}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>U</Text>
              </View>
              <Text style={styles.userName}>Usuário EduCryption</Text>
              <Text style={styles.userEmail}>usuario@educryption.com</Text>
            </View>
          </View>

          {/* Menu Items */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('/home')}
          >
            <Icons.Home width={24} height={24} color="#333" />
            <Text style={styles.menuText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('/about-us')}
          >
            <Icons.Usr width={24} height={24} color="#333" />
            <Text style={styles.menuText}>Sobre nós</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onClose();
              signOut();
              router.replace('/login');
            }}
          >
            <Icons.Logout width={24} height={24} color="#ff4444" />
            <Text style={[styles.menuText, { color: '#ff4444' }]}>Sair da conta</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: 'white',
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  header: {
    backgroundColor: '#023E8A',
    padding: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 32,
    color: '#023E8A',
    fontWeight: 'bold',
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
});