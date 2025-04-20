import * as React from 'react';
import { Dimensions, ScrollView, StyleSheet } from 'react-native';
import { Button, Portal, Dialog, DialogProps } from 'react-native-paper';

interface Props extends DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  confirmText?: string;
  onConfirm?: () => void;
  children: React.ReactNode;
}

export default function CustomModal({
  visible,
  onClose,
  title = 'Ajuda',
  confirmText = 'Ok',
  onConfirm,
  children,
  ...props
}: Props) {
  function handleConfirm() {
    if (onConfirm) onConfirm();
    else onClose();
  }

  return (
    <Portal>
      <Dialog
        onDismiss={onClose}
        visible={visible}
        style={{ maxHeight: 0.6 * Dimensions.get('window').height }}
        {...props}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea style={styles.smallPadding}>
          <ScrollView contentContainerStyle={styles.mediumPadding}>
            <Dialog.Content>{children}</Dialog.Content>
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={handleConfirm}>{confirmText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  smallPadding: {
    paddingHorizontal: 0,
  },
  mediumPadding: {
    paddingHorizontal: 16,
  },
  biggerPadding: {
    paddingHorizontal: 24,
  },
});
