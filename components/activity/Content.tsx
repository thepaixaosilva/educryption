import { View, StyleSheet } from 'react-native';

interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <View style={styles.content}>{children}</View>;
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
