import { TabBarIcon } from '@/components';
import { Colors } from '@/constants/colors';
import fonts from '@/constants/fonts';
import { Stack, Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: fonts.SFRegular,
          fontSize: 11,
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          marginBottom: -5,
        },
        tabBarStyle: {
          height: 72,
          borderTopColor: '#EAE7F2',
          borderTopWidth: 1,
        },
      }}
      initialRouteName="shipments">
      <Tabs.Screen
        name="shipments"
        options={{
          title: 'Shipments',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="Shipments" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="Scan" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="Wallet" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
