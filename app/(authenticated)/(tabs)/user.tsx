import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { useUser } from '../../../hooks/queries/useUsers';
import Icons from '../../../assets/icons/Icons';

const { width } = Dimensions.get('window');

export default function UserProfile() {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#023E8A" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Icons.Cross width={48} height={48} color="#ff4444" />
        <Text style={styles.errorText}>Ops! Algo deu errado</Text>
        <Text style={styles.errorDetail}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
      {/* Header com foto de perfil */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {user?.avatar_url ? (
            <Image
              source={{ uri: user.avatar_url }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user?.full_name || 'Usuário'}</Text>
        {/* <Text style={styles.userRole}>Estudante</Text> */}
      </View>

      {/* Cards de Informação */}
      <View style={styles.content}>
        {/* Card de Informações Pessoais */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icons.Usr width={24} height={24} color="#023E8A" />
            <Text style={styles.cardTitle}>Informações Pessoais</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nome Completo</Text>
            <Text style={styles.value}>{user?.full_name || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Nome de Usuário</Text>
            <Text style={styles.value}>{user?.username || 'Não informado'}</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || 'Não informado'}</Text>
          </View>
        </View>

        {/* Card de Estatísticas */}
        {/* <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icons.Trophy width={24} height={24} color="#023E8A" />
            <Text style={styles.cardTitle}>Estatísticas</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Pontos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0%</Text>
              <Text style={styles.statLabel}>Progresso</Text>
            </View>
          </View>
        </View> */}

        {/* Card de Conquistas */}
        {/* <View style={[styles.card, styles.achievementsCard]}>
          <View style={styles.cardHeader}>
            <Icons.Trophy width={24} height={24} color="#023E8A" />
            <Text style={styles.cardTitle}>Conquistas</Text>
          </View>
          
          <View style={styles.emptyAchievements}>
            <Text style={styles.emptyText}>
              Comece a completar atividades para ganhar conquistas!
            </Text>
          </View>
        </View> */}
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    backgroundColor: '#023E8A',
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarText: {
    fontSize: 40,
    color: '#023E8A',
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#023E8A',
    marginLeft: 8,
  },
  infoContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#023E8A',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  achievementsCard: {
    marginBottom: 32,
  },
  emptyAchievements: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    textAlign: 'center',
  },
  errorDetail: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#023E8A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});