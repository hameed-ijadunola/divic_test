import { Button, SafeAreaWrap } from '@/components';
import { AnimatedAppLoader } from '@/components';
import { SessionProvider } from '@/contexts/auth';
import { store } from '@/redux/store';
import { useFonts } from 'expo-font';
import { ErrorBoundaryProps, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from 'react-native-toast-notifications';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

// Prevent the splash screen from auto-hiding before asset loading is complete.

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        width: '100%',
        height: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 24,
        gap: 12,
      }}>
      <Text style={{ textAlign: 'center' }}>{props.error.message}</Text>
      <Button onPress={props.retry} text="Try Again?" />
    </ScrollView>
  );
}

// SplashScreen.preventAutoHideAsync();

const RootLayout: React.FC = () => {
  const [loaded] = useFonts({
    Inter: require('@/assets/fonts/Inter-Variable.ttf'),
    InterThin: require('@/assets/fonts/Inter-Thin.ttf'),
    InterExtraLight: require('@/assets/fonts/Inter-ExtraLight.ttf'),
    InterLight: require('@/assets/fonts/Inter-Light.ttf'),
    InterRegular1: require('@/assets/fonts/Inter-Regular.ttf'),
    InterMedium: require('@/assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('@/assets/fonts/Inter-SemiBold.ttf'),
    InterBold: require('@/assets/fonts/Inter-Bold.ttf'),
    InterExtraBold: require('@/assets/fonts/Inter-ExtraBold.ttf'),
    InterBlack: require('@/assets/fonts/Inter-Black.ttf'),
    SFLight: require('@/assets/fonts/SF-Pro-Text-Light.otf'),
    SFRegular: require('@/assets/fonts/SF-Pro-Text-Regular.otf'),
    SFMedium: require('@/assets/fonts/SF-Pro-Text-Medium.otf'),
    SFSemiBold: require('@/assets/fonts/SF-Pro-Text-Semibold.otf'),
    SFBold: require('@/assets/fonts/SF-Pro-Text-Bold.otf'),
    SFBlack: require('@/assets/fonts/SF-Pro-Text-Black.otf'),
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [loaded]);

  const AppLoading = () => {
    return (
      <SafeAreaWrap isSplash={true} style={styles.container}>
        <LottieView
          autoPlay
          // loop={false}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
          }}
          speed={0.5}
          source={require('@/assets/splash/splash.json')}
          onAnimationFinish={() => setLoading(false)}
        />
      </SafeAreaWrap>
    );
  };

  let persistor = persistStore(store);

  const { width } = useWindowDimensions();

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView>
      <Provider store={store}>
        <PersistGate loading={<AppLoading />} persistor={persistor}>
          <SafeAreaProvider>
            <SessionProvider>
              <ToastProvider>
                <Slot />
              </ToastProvider>
            </SessionProvider>
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
