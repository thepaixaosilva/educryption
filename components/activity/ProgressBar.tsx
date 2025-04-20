import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useActivity } from '../../contexts/activity';

interface ProgressBarProps {
  showPercentage?: boolean;
  height?: number;
  backgroundColor?: string;
  fillColor?: string;
}

export default function ProgressBar({
  showPercentage = true,
  height = 10,
  backgroundColor = '#EEEEEE',
  fillColor = '#4CAF50',
}: ProgressBarProps) {
  const { calculateProgress } = useActivity();
  const progress = calculateProgress();

  return (
    <View style={styles.container}>
      <View style={[styles.progressBackground, { height, backgroundColor }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
              height,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>

      {showPercentage && (
        <Text style={styles.percentage}>{Math.round(progress)}% completo</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  progressBackground: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 5,
  },
  percentage: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
});
