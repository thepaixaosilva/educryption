import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface InputLabelProps {
  label: string;
  required?: boolean;
}

function InputLabel({ label, required = false }: InputLabelProps) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
      {required && <Text style={styles.required}>*</Text>}
    </View>
  );
}

const MemoizedInputLabel = React.memo(InputLabel);

// TODO: Create a color palette for the app
// TODO: Create a theme provider for the app (for dark mode support)
// TODO: Switch colors to theme colors
const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    color: '#333',
    fontSize: 14,
  },
  required: {
    color: 'red',
    fontSize: 14,
    marginLeft: 2,
  },
});

export default MemoizedInputLabel;
