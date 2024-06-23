import React, { useState, useRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { FloatingLabelInput } from 'react-native-floating-label-input';
import { Colors } from '@/constants/colors';
import fonts from '@/constants/fonts';
import CustomText from './CustomText';

interface CustomTextInputProps extends TextInputProps {
  height?: number;
  label?: string;
  bgColor?: string;
  placeholderTextColor?: string;
  onChangeText?: (text: string) => void;
  onCountrySelect?: (text: string) => void;
  onFocus?: () => void;
  name?: string;
  error?: string;
  warning?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputMask?: 'phone' | 'date' | undefined;
  inputBg?: string;
  fontSize?: number;
  labelPaddingTop?: number;
  onPress?: () => void;
  loading?: boolean;
  inputStyles?: TextStyle;
  containerStyles?: ViewStyle;
  extraComponent?: React.ReactNode;
  labelStyle?: TextStyle;
  showWarning?: boolean;
  options?: Array<{ label: string | number; value: string | number }>;
  isDropdown?: boolean;
  isPassword?: boolean;
  isPhone?: boolean;
  prefix?: string;
  marginTop?: number;
  width?: string | number;
  inputType?: string;
  returnValue?: boolean;
  handleChange?: (text: string) => void;
  showNaira?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  textAlignVertical?: string;
  paddingVertical?: number;
  secureTextEntry?: boolean;
  rightComponent?: React.ReactNode;
  leftComponent?: React.ReactNode;
  maxLength?: number;
  onSubmitEditing?: () => void;
  returnKeyLabel?: string | undefined;
  returnKeyType?: string | undefined;
  enablesReturnKeyAutomatically?: boolean;
  addBtn?: boolean;
  addBtnPressed?: () => void;
  borderRadius?: number;
  [key: string]: any;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  marginTop = 0,
  width,
  height = 56,
  label,
  placeholder = '',
  placeholderTextColor = Colors.placeHolder,
  inputType = 'default',
  keyboardType = 'default',
  returnValue = true,
  handleChange = () => {},
  name = '',
  error = '',
  value,
  showNaira = false,
  disabled = false,
  inputBg,
  fontSize = 16,
  multiline = false,
  numberOfLines,
  paddingVertical,
  labelPaddingTop = 20,
  secureTextEntry,
  rightComponent,
  leftComponent,
  onPress,
  loading,
  maxLength,
  onSubmitEditing,
  returnKeyLabel,
  returnKeyType = 'done',
  enablesReturnKeyAutomatically = true,
  addBtn,
  addBtnPressed,
  inputStyles,
  borderRadius = 10,
  ...props
}) => {
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const ref = useRef<TextInput>(null);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ backgroundColor: '#fff', width: '100%', marginTop }}>
      <FloatingLabelInput
        ref={ref}
        staticLabel={!!value || focused}
        value={value}
        defaultValue={value}
        label={label}
        onChangeText={
          returnValue
            ? e => {
                handleChange(e);
              }
            : handleChange(name)
        }
        isFocused={focused}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
          setTouched(true);
        }}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType}
        returnKeyLabel={returnKeyLabel}
        enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
        maxLength={maxLength}
        togglePassword={show}
        multiline={multiline}
        hint={placeholder}
        hintTextColor={placeholderTextColor}
        inputStyles={{
          ...styles.input,
          fontSize: fontSize,
          fontFamily: fonts.variable,
          fontWeight: '400',
          color: Colors.primary,
          ...inputStyles,
        }}
        containerStyles={{
          ...styles.inputContainerStyle,
          paddingLeft: 14,
          paddingRight: 14,
          borderColor: error
            ? Colors.error
            : focused
            ? Colors.primary
            : Colors.transparent,
          borderWidth: 1,
          backgroundColor: disabled ? Colors.white : Colors.inputBg,
          height: multiline && !height ? 150 : height,
          borderRadius: borderRadius,
        }}
        editable={!disabled}
        customLabelStyles={{
          colorFocused: Colors.inputtext,
          leftFocused: 14,
          leftBlurred: 14,
          topFocused: -12,
          topBlurred: 0,
          fontSizeFocused: 4,
          fontSizeBlurred: fontSize,
          fontFamily: fonts.variable,
          fontWeight: 'normal',
          colorBlurred: Colors.placeHolder,
          ...props.customLabelStyle,
        }}
        blurOnSubmit={true}
        labelStyles={{
          paddingTop: focused || value ? 5 : 0,
          ...props.labelStyle,
        }}
        leftComponent={leftComponent}
        rightComponent={rightComponent}
        showPasswordContainerStyles={{ paddingRight: 5 }}
        keyboardType={keyboardType || inputType}
        darkTheme
        {...props}
      />
      {error && <Text style={styles.errorText}>{error || 'error'}</Text>}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  inputContainerStyle: {
    backgroundColor: Colors.inputBg,
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: fonts.variable,
    fontWeight: '400',
  },
  info: {
    fontSize: 10,
    lineHeight: 16,
    fontFamily: fonts.regular,
    color: Colors.neutral_40,
    paddingTop: 3,
  },
  errorText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: Colors.error,
    paddingTop: 5,
  },
});

export default CustomTextInput;
