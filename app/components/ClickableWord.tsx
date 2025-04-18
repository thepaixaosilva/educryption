import { Text, Pressable, StyleSheet } from "react-native"

interface ClickableWordProps {
  children: React.ReactNode
  onPress: () => void
}

export default function ClickableWord({ children, onPress }: ClickableWordProps) {
  return (
    <Text onPress={onPress} style={styles.clickable}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  clickable: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: 'Poppins'
  },
})