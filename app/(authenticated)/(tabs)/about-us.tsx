import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';

const AboutUsPage = () => {
  const router = useRouter();

  const teamMembers = [
    {
      id: 1,
      name: "Isabella Lie Oshima",
      ra: "1050482313005"
    },
    {
      id: 2,
      name: "Matheus Paixão Silva",
      ra: "1050482313006"
    },
    {
      id: 3,
      name: "Samuel Oliveira Azevedo dos Santos",
      ra: "1050482313028"
    },
    {
      id: 4,
      name: "Victoria Miki Fujii",
      ra: "1050482313030"
    }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Sobre Nós</Text>
          <Text style={styles.subtitle}>Sobre nossa equipe e nosso sistema</Text>
        </View>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.homeButtonText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Sobre o Sistema EduCryption</Text>
          <Text style={styles.paragraph}>
            O EduCryption é um aplicativo educacional que visa facilitar o aprendizado de Segurança 
            da Informação para estudantes de tecnologia. Utilizando gamificação, o app transforma 
            conceitos complexos, como operações lógicas e permutação, em atividades práticas e interativas.
          </Text>
          <Text style={styles.paragraph}>
            As atividades são desbloqueadas por QR Codes fornecidos pelos professores, integrando o ensino 
            presencial ao digital. 
          </Text>
          <Text style={styles.paragraph}>
            Nosso objetivo é ser uma ferramenta complementar que reforça o aprendizado 
            através da prática ativa, tornando os conteúdos mais acessíveis e engajadores.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.teamHeader}>
          <Text style={styles.sectionTitle}>Nossa Equipe</Text>
        </View>

        <View style={styles.teamGrid}>
          {teamMembers.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitials}>
                  {(() => {
                    const names = member.name.split(' ');
                    return names[0][0] + names[names.length - 1][0];
                  })()}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.ra}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          EduCryption © 2025 - Projeto Integrador
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1976D2',
  },
  headerContent: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    marginTop: 25
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    opacity: 0.9,
  },
  homeButton: {
    backgroundColor: '#1976D2',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
    textAlign: 'justify',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  featuresBox: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  techBox: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  thanksBox: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#9C27B0',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    color: '#1976D2',
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2E7D32',
    marginBottom: 8,
  },
  techGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  techItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  techName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  techDesc: {
    fontSize: 14,
    color: '#666',
  },
  teamHeader: {
    marginBottom: 24,
  },
  teamGrid: {
    gap: 0,
  },
  memberCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  memberInitials: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 6,
  },
  memberDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AboutUsPage;