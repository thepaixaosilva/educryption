import React, { Children } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonProps, Button as PaperButton, Text } from 'react-native-paper';

interface Props extends ButtonProps {
  color?: string;
  onPress: () => void;
};

export default function CustomButton({ color = '#d5d5d5', onPress, ...props}: Props) {
  return (
    <PaperButton
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
      {...props}
    >
      {props.children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
});
