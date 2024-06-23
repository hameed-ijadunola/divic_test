import LottieView from 'lottie-react-native';
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface AnimatedAppLoaderProps {
  children: ReactNode;
  loading: boolean;
}

function AnimatedAppLoader({ children, loading }: AnimatedAppLoaderProps) {
  return !loading ? (
    children
  ) : (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#fff',
        }}
        source={require('@/assets/splash/splash.json')}
      />
    </View>
  );
}

export default AnimatedAppLoader;

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
