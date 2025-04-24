import { Text, Pressable, StyleSheet } from 'react-native';
import { TextProps } from 'react-native';

interface ClickableWordProps extends TextProps {
  children: React.ReactNode;
  onPress: () => void;
  fontSize?: number;
}

export default function ClickableWord({
  children,
  onPress,
  fontSize = 16,
  ...props
}: ClickableWordProps) {
  return (
    <Text onPress={onPress} style={[styles.clickable, { fontSize }]} {...props}>
      {children}
    </Text>
  );
}

// TODO: Create a color palette for the app
// TODO: Create a theme provider for the app (for dark mode support)
// TODO: Switch default color to theme color 
const styles = StyleSheet.create({
  clickable: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: 'Poppins', // TODO: Define the fonts to be used in the app
  },
});
