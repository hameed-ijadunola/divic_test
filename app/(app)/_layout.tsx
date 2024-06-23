import { SafeAreaWrap } from '@/components';
import { Colors } from '@/constants/colors';
import { useSession } from '@/contexts/auth';
import { Slot, Stack } from 'expo-router';
import React from 'react';
import { ActivityIndicator } from 'react-native';

const Layout = () => {
  const { isLoading } = useSession();

  if (isLoading) {
    return (
      <SafeAreaWrap isSplash>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaWrap>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
