import { useCallback } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (
  onBackPress = () => {
    return false;
  },
  backDepsArray: Array<any>,
) => {
  return useCallback(() => {
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, backDepsArray);
};

export default useBackHandler;
