import * as React from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import { Button, Portal, Dialog } from 'react-native-paper'

interface ModalProps {
  visible: boolean
  onClose: () => void
  title?: string
  confirmText?: string
  onConfirm?: () => void
  children: React.ReactNode
}

export default function CustomModal({
  visible,
  onClose,
  title = 'Ajuda',
  confirmText = 'Ok',
  onConfirm,
  children
}: ModalProps) {
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
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea style={styles.smallPadding}>
          <ScrollView contentContainerStyle={styles.biggerPadding}>
            <Dialog.Content>
              {children}
            </Dialog.Content>
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
  biggerPadding: {
    paddingHorizontal: 24,
  },
})