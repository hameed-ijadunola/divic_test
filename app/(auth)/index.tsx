import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Platform,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  Button,
  Col,
  CustomText,
  CustomTextInput,
  Row,
  SafeAreaWrap,
  Yup,
} from '@/components';
import { Colors } from '@/constants/colors';
import ReactNativeModal from 'react-native-modal';
import fonts from '@/constants/fonts';
import { router, useFocusEffect } from 'expo-router';
import BackSvg from '@/assets/svgs/Chevron.svg';
import SeparatorSvg from '@/assets/svgs/Separator.svg';
import { useFormik } from 'formik';
import { useSession } from '@/contexts/auth';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { customFetchQuery } from '@/redux/features/customFetchQuery';
import { saveToken, saveUser } from '@/redux/features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Onboarding = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { startSession } = useSession();
  const { height, width } = useWindowDimensions();
  const [loginUser, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [urlFocused, setUrlFocused] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShowLogin(false);
    }, []),
  );

  const validationSchema = Yup.object().shape({
    usr: Yup.string().required().label('Username / Email'),
    pwd: Yup.string().required().label('Password'),
  });

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    isValid,
    dirty,
    touched,
  } = useFormik({
    initialValues: { usr: '', url: '', pwd: '' },
    // enableReinitialize: true,
    validateOnMount: false,
    validateOnChange,
    validationSchema: validationSchema,
    onSubmit: values => handleSignIn(values),
  });

  const handleSignIn = async values => {
    console.log('values', values);
    // delete values.url;
    const res = await customFetchQuery({
      api: loginUser,
      apiProps: values,
      handleSuccess: data => {
        console.log('data', data);
        dispatch(saveToken('token'));
        dispatch(saveUser(data));
        startSession('token');
      },
      handleError: ({ data }) => {
        console.log('error', data);
        Alert.alert('Error!', data?.message || '');
      },
    });
  };
  return (
    <>
      <SafeAreaWrap
        isSplash
        barStyle="light-content"
        bg={Colors.primary}
        safeAreaBg={showLogin ? Colors.black : undefined}
        style={showLogin ? styles.container1 : styles.container}>
        <Image
          source={require('@/assets/images/shippex.png')}
          style={styles.image}
        />
        <Button
          text="Login"
          variant="secondary"
          style={showLogin ? { ...styles.btn1, width: width - 60 } : styles.btn}
          onPress={() => setShowLogin(true)}
        />
      </SafeAreaWrap>
      <ReactNativeModal
        avoidKeyboard={false}
        testID={'modal'}
        isVisible={showLogin}
        coverScreen
        backdropOpacity={0}
        animationInTiming={1500}
        animationOutTiming={1500}
        onBackdropPress={() => setShowLogin(false)}
        style={{
          justifyContent: 'flex-end',
          height: height,
          margin: 0,
          ...(Platform.OS == 'android' && {
            position: 'absolute',
            paddingBottom: 20,
          }),
        }}>
        <Col
          padding="5px 8px 32px 8px"
          bgColor={Colors.baseWhite}
          style={{
            bottom: 0,
            width: '100%',
            height: height - 53,
            borderTopEndRadius: 12,
            borderTopStartRadius: 12,
          }}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
            extraHeight={50}
            extraScrollHeight={50}>
            <View>
              <Col
                align="center"
                justify="center"
                width={width - 16}
                paddingTop={5}>
                <Image
                  source={require('@/assets/images/Grabber.png')}
                  style={styles.grabber}
                />
              </Col>
              <Row
                align="center"
                justify="flex-start"
                width={width - 16}
                padding="11px 8px 11px 0px"
                onPress={() => setShowLogin(false)}>
                <BackSvg onPress={() => setShowLogin(false)} />
                <CustomText
                  text="Cancel"
                  styleArray={[17, fonts.regular, Colors.primary]}
                  left={3}
                  onPress={() => setShowLogin(false)}
                />
              </Row>
              <View style={{ paddingHorizontal: 8 }}>
                <CustomText
                  text="Login"
                  styleArray={[34, fonts.semiBold, Colors.baseBlack]}
                  bottom={16}
                  style={{ lineHeight: 41 }}
                />
                <CustomText
                  text="Please enter your First, Last name and your phone number in order to register"
                  styleArray={[16, fonts.regular, Colors.neutral_70]}
                  bottom={7}
                  style={{ lineHeight: 24 }}
                />
                <CustomTextInput
                  marginTop={31}
                  label={'URL'}
                  placeholder="Enter URL"
                  handleChange={handleChange('url')}
                  value={values.url}
                  error={errors.url}
                  onFocus={() => {
                    setUrlFocused(true);
                  }}
                  onBlur={() => {
                    setUrlFocused(false);
                  }}
                  // staticLabel={urlFocused}
                  leftComponent={
                    (urlFocused || values.url) && (
                      <Row width={'auto'}>
                        <CustomText
                          styleArray={[16, fonts.variable, Colors.neutral_70]}>
                          https://
                        </CustomText>
                        <SeparatorSvg style={{ marginHorizontal: 6 }} />
                      </Row>
                    )
                  }
                />
                <CustomTextInput
                  marginTop={31}
                  label={'Username / Email'}
                  placeholder="Enter Username / Email"
                  handleChange={handleChange('usr')}
                  value={values.usr}
                  error={errors.usr}
                />
                <CustomTextInput
                  marginTop={31}
                  label={'Password'}
                  placeholder="Enter Password"
                  handleChange={handleChange('pwd')}
                  value={values.pwd}
                  error={errors.pwd}
                  isPassword
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          <Col
            padding="10px 8px 0px 8px"
            style={{ position: 'absolute', bottom: 40, left: 8, right: 8 }}>
            <Button
              text="Login"
              onPress={() => {
                setValidateOnChange(true);
                handleSubmit();
              }}
              disabled={!isValid}
              loading={isLoading}
            />
          </Col>
        </Col>
      </ReactNativeModal>
    </>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    marginTop: 40,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  image: { width: 207.63, height: 36 },
  btn: { position: 'absolute', bottom: 60 },
  btn1: { position: 'absolute', bottom: 70 },
});
