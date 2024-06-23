import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Center, Col, CustomText } from '@/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Col>
        <Center>
          <CustomText>This screen doesn't exist.</CustomText>
        </Center>
      </Col>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
