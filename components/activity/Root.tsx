import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Root({ children }: LayoutProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexGrow: 1,
  },
});
