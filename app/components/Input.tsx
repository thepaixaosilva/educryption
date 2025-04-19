import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  Keyboard,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Text,
} from 'react-native';
import applyMask from '../utils/inputMasks';
import PasswordIcon from './icons/PasswordIcon';
import InputLabel from './InputLabel';

interface Props extends TextInputProps {
  // Appearance
  width?: string | number;
  height?: number;
  backgroundColor?: string;
  fontSize?: number;
  textAlign?: 'left' | 'center' | 'right';

  // Functionalities
  label?: string;
  error?: string;
  isPassword?: boolean;
  required?: boolean;
  clearable?: boolean;

  // Mask
  mask?: string; // Ex: '(##) #####-####'
  maskFn?: (text: string) => string;

  // Validation
  validation?: (value: string) => boolean;

  // Additional content
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;

  // Events
  onTab?: () => void;
  onEnter?: () => void;
}

export default function Input({
  // Style props
  style,
  width,
  height,
  backgroundColor,
  fontSize,
  textAlign,

  // Functional props
  label,
  error,
  isPassword,
  required = false,
  clearable = false,

  // Mask props
  mask,
  maskFn,

  // Content props
  startContent,
  endContent,

  // Callback props
  onChangeText,
  validation,
  onTab,
  onEnter,

  ...props
}: Props) {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);
  const inputRef = useRef<TextInput>(null);

  const handleTextChange = useCallback(
    (text: string) => {
      if (mask || maskFn) {
        const rawValue = text.replace(/[^0-9]/g, '');
        const maxDigits = mask ? (mask.match(/#/g) || []).length : undefined;
        const limited = maxDigits ? rawValue.slice(0, maxDigits) : rawValue;

        const maskedValue = maskFn
          ? maskFn(limited)
          : mask
          ? applyMask(limited, mask)
          : limited;

        setValue(maskedValue);
        onChangeText?.(maskedValue);

        if (validation) {
          const isValid = validation(maskedValue);
          setShowErrorMessage(!isValid);
          setLocalError(!isValid ? error || 'Campo inválido' : undefined);
        }
      } else {
        setValue(text);
        onChangeText?.(text);

        if (validation) {
          const isValid = validation(text);
          setShowErrorMessage(!isValid);
          setLocalError(!isValid ? error || 'Campo inválido' : undefined);
        }
      }
    },
    [mask, maskFn, validation, error, onChangeText],
  );

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const key = e.nativeEvent.key;
    if (key === 'Tab' && onTab) {
      onTab();
      return;
    }

    if (key === 'Enter' && onEnter) {
      onEnter();
      Keyboard.dismiss();
      return;
    }
  };

  const handleClear = () => {
    setValue('');
    onChangeText?.('');
    setShowErrorMessage(false);
    setLocalError(undefined);
  };

  const wrapperStyles = useMemo(
    () => [
      styles.inputWrapper,
      showErrorMessage || error ? styles.inputWrapperError : null,
      backgroundColor ? { backgroundColor } : null,
      height ? { height } : null,
    ],
    [showErrorMessage, error, backgroundColor, height],
  );

  const inputStyles = useMemo(
    () => [
      styles.input,
      style,
      fontSize ? { fontSize } : null,
      textAlign ? { textAlign } : null,
    ],
    [style, fontSize, textAlign],
  );

  return (
    <View style={styles.container}>
      {label && <InputLabel label={label} required={required} />}

      <View style={wrapperStyles}>
        {startContent && (
          <View style={styles.contentContainer}>{startContent}</View>
        )}

        <TextInput
          ref={inputRef}
          value={value}
          style={inputStyles}
          placeholderTextColor="#888"
          secureTextEntry={isPassword && !visible}
          autoCapitalize="none"
          onChangeText={handleTextChange}
          onKeyPress={handleKeyPress}
          {...props}
        />

        <View style={styles.endContentContainer}>
          {clearable && value !== '' && (
            <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>✕</Text>
            </TouchableOpacity>
          )}

          {isPassword && (
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={styles.visibilityToggle}
              accessibilityLabel={visible ? 'Ocultar senha' : 'Mostrar senha'}
            >
              <PasswordIcon visible={visible} />
            </TouchableOpacity>
          )}

          {endContent && (
            <View style={styles.contentContainer}>{endContent}</View>
          )}
        </View>
      </View>

      {(showErrorMessage || localError) && (
        <Text style={styles.error}>{localError}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    minHeight: 48,
  },
  inputWrapperError: {
    borderColor: 'red',
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#000',
  },
  contentContainer: {
    marginHorizontal: 4,
  },
  endContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visibilityToggle: {
    padding: 8,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#888',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
