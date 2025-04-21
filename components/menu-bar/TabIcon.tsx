import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

type TabIconProps = {
  icon: React.FC<SvgProps>;
  color: string;
  focused: boolean;
};

const TAB_CONFIG = {
  iconSize: 44,
  colors: {
    active: '#003686',
  },
};

export default function TabIcon({ icon: Icon, color, focused }: TabIconProps) {
  return (
    <View style={[styles.iconContainer, focused && styles.activeIconContainer]}>
      <Icon
        width={TAB_CONFIG.iconSize}
        height={TAB_CONFIG.iconSize}
        fill={color}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 8,
    borderRadius: 8,
  },
  activeIconContainer: {
    backgroundColor: TAB_CONFIG.colors.active,
  },
});
