import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import { useActivity } from '../../../contexts/activity';

interface Props {
  title: string;
  subtitle?: string;
  description?: string;
  showProgress?: boolean;
  hideReset?: boolean;
  children?: React.ReactNode;
  onReset?: () => void;
}

export default function Header({
  title,
  subtitle,
  description,
  showProgress = true,
  hideReset = true,
  children,
  onReset,
}: Props) {
  const { resetProgress } = useActivity();

  const handleReset = () => {
    resetProgress();
    if (onReset) onReset();
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>

      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {showProgress && <ProgressBar />}

      {description && (
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>
      )}
      {children}

      {!hideReset && (
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetText}>Reiniciar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  resetButton: {
    alignSelf: 'flex-end',
    marginTop: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resetText: {
    fontSize: 12,
    color: '#666',
  },
});
