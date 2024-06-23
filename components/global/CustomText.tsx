import styled from 'styled-components/native';
import React from 'react';
import {
  TextProps as RNTextProps,
  Pressable,
  StyleProp,
  ViewStyle,
  TextStyle as RNTextStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';
import fonts from '../../constants/fonts';
import Text from 'react-native-text';

// Define the props for TextStyle component
interface TextStyleProps extends RNTextProps {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  bgColor?: string;
  color?: string;
  align?: string;
  textTransform?: string;
  textDecoration?: string;
  opacity?: number;
  textWidth?: string | number;
  maxWidth?: string | number;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  transform?: string;
}

const TextStyle = styled(Text) <TextStyleProps>`
  font-size: ${props => props.fontSize || 15}px;
  font-family: ${props => props.fontFamily};
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || '400'};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  text-align: ${({ align }) => align || 'left'};
  text-transform: ${({ textTransform }) => textTransform || 'none'};
  text-decoration: ${({ textDecoration }) => textDecoration || 'none'};
  opacity: ${({ opacity }) => opacity || 1};
  width: ${({ textWidth }) => textWidth || 'auto'};
  max-width: ${({ maxWidth }) => maxWidth || 'auto'};
  ${({ style }) => style as any};
`;

// Define the props for CustomText component
interface CustomTextProps extends TextStyleProps {
  styleArray?: Array<any>;
  children?: React.ReactNode;
  text?: string | React.ReactNode;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  numberOfLines?: number;
  transform?: string;
  wrapperStyle?: ViewStyle;
  removeView?: boolean;
  onPress?: () => void;
}

const CustomText: React.FC<CustomTextProps> = ({
  styleArray = [],
  fontSize = 14,
  fontFamily = fonts.regular,
  children,
  text,
  fontWeight,
  color = Colors.baseBlack,
  bgColor = 'transparent',
  top,
  right,
  left,
  bottom,
  align,
  style,
  maxWidth,
  numberOfLines,
  transform,
  wrapperStyle,
  removeView = false,
  onPress,
  ...props
}) => {
  return removeView ? (
    <TextStyle
      right={right}
      left={left}
      fontWeight={fontWeight}
      color={styleArray[2] || color}
      fontSize={styleArray[0] || fontSize}
      style={style}
      fontFamily={styleArray[1] || fontFamily}
      numberOfLines={numberOfLines}
      transform={transform}
      maxWidth={maxWidth}
      align={align}
      bgColor={bgColor}
      onPress={onPress}
      {...props}>
      {children || text || '...'}
    </TextStyle>
  ) : (
    <Pressable
      style={[
        {
          marginTop: top,
          marginBottom: bottom,
          marginLeft: left,
          marginRight: right,
          borderRadius: 24,
        },
        wrapperStyle,
      ]}
      onPress={onPress}
      onPressIn={props.onPressIn}>
      <TextStyle
        fontWeight={fontWeight}
        color={styleArray[2] || color}
        fontSize={styleArray[0] || fontSize}
        style={style}
        fontFamily={styleArray[1] || fontFamily}
        numberOfLines={numberOfLines}
        transform={transform}
        maxWidth={maxWidth}
        align={align}
        bgColor={bgColor}
        {...props}>
        {children || text || '...'}
      </TextStyle>
    </Pressable>
  );
};

export default CustomText;
