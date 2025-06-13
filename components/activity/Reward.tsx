// TODO: Refactor this component to a success screen or modal, or remove it if not needed
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useActivity } from '../../contexts/activity';

interface ActivityRewardProps {
  message?: string;
  imageSrc?: any;
}

export default function Reward({
  message = 'Parabéns! Yocê completou todas as etapas desta atividade.',
  imageSrc,
}: ActivityRewardProps) {
  const { calculateProgress } = useActivity();
  const progress = calculateProgress();
  const isCompleted = progress === 100;

  if (!isCompleted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Etapa Concluída!</Text>

      {imageSrc && <Image source={imageSrc} style={styles.image} />}

      <Text style={styles.message}>{message}</Text>

      {/* <View style={styles.badge}>
        <Text style={styles.badgeText}>Conquista Desbloqueada</Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  badge: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 2,
  },
  badgeText: {
    color: '#333',
    fontWeight: 'bold',
  },
});
