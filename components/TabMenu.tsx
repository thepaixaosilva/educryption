import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import TabIcon from './menu-bar/TabIcon';
import CenterButton from './menu-bar/CenterButton';
import Icons from '../assets/icons/Icons';

// TODO: Create a color palette for the app
// TODO: Create a theme provider for the app (for dark mode support)
// TODO: Switch default color to theme color
const TAB_CONFIG = {
  tabBarHeight: 65,
  colors: {
    primary: '#023E8A',
    white: '#ffffff',
    inactive: '#cccccc',
  },
};

// TODO: Pass router as prop to TabMenu
export default function TabMenu() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: TAB_CONFIG.colors.white,
        tabBarInactiveTintColor: TAB_CONFIG.colors.inactive,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: (props) => <TabIcon icon={Icons.Home} {...props} />,
        }}
      />

      <Tabs.Screen
        name="qr-scan"
        options={{
          title: 'Scan QR',
          tabBarIcon: (props) => <TabIcon icon={Icons.Qr} {...props} />,
        }}
      />

      <Tabs.Screen
        name="center-button"
        options={{
          tabBarButton: () => <CenterButton />,
        }}
        listeners={{
          tabPress: (e) => e.preventDefault(),
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          title: 'Perfil',
          tabBarIcon: (props) => <TabIcon icon={Icons.Usr} {...props} />,
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: 'Mais',
          tabBarIcon: (props) => <TabIcon icon={Icons.ThreeDots} {...props} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: TAB_CONFIG.colors.primary,
    height: TAB_CONFIG.tabBarHeight,
    borderTopWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
