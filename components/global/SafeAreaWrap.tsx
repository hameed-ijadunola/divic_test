import React, { ReactNode } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StatusBarStyle,
  ViewStyle,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface SafeAreaWrapProps {
  children?: ReactNode;
  style?: ViewStyle;
  bg?: string;
  height?: string | number;
  width?: string | number;
  safeAreaBg?: string;
  barStyle?: StatusBarStyle;
  barBg?: string;
  isSplash?: boolean;
  empty?: boolean;
}

const SafeAreaWrap: React.FC<SafeAreaWrapProps> = ({
  children,
  style = { width: '100%', height: '100%' },
  bg,
  safeAreaBg,
  barStyle,
  barBg,
  isSplash,
  empty,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        backgroundColor:
          safeAreaBg || (isSplash ? Colors.primary : Colors.baseWhite),
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: bg || (isSplash ? Colors.primary : Colors.baseWhite),
          flex: 1,
          paddingTop: isSplash
            ? 0
            : (Platform.OS === 'ios' ? 10 : insets?.top + 20) || 50,
          ...style,
        }}>
        {!empty && children}
      </View>
      <StatusBar
        barStyle={
          Platform.OS === 'android'
            ? barStyle || 'dark-content'
            : 'dark-content'
        }
        backgroundColor={barBg || Colors.transparent}
      />
    </SafeAreaView>
  );
};

export default SafeAreaWrap;
