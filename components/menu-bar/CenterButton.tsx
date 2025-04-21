import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icons from '../../assets/icons/Icons';

const TAB_CONFIG = {
  centerIconSize: 40,
  centerButtonSize: 70,
  colors: {
    secondary: '#03045E',
    white: '#ffffff',
  },
};

export default function CenterButton() {
  const router = useRouter();

  return (
    <View style={styles.centerButtonContainer}>
      <TouchableOpacity
        style={styles.centerButton}
        onPress={() => router.push('/center-button')}
      >
        <View style={styles.iconWrapper}>
          <Icons.Next
            width={TAB_CONFIG.centerIconSize}
            height={TAB_CONFIG.centerIconSize}
            color={TAB_CONFIG.colors.white}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerButtonContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  centerButton: {
    backgroundColor: TAB_CONFIG.colors.secondary,
    width: TAB_CONFIG.centerButtonSize,
    height: TAB_CONFIG.centerButtonSize,
    borderRadius: TAB_CONFIG.centerButtonSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    top: -40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconWrapper: {
    transform: [{ translateY: -4 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
});
