import {
  ActivityIndicator,
  Platform,
  TouchableOpacityProps,
} from 'react-native';
import React, { ReactNode } from 'react';
import { Colors } from '../../constants/colors';
import styled from 'styled-components/native';
import CustomText from './CustomText';
import fonts from '../../constants/fonts';
import { toPx } from '../../helpers/functions';

interface BtnWrapProps extends TouchableOpacityProps {
  width: string | number;
  height: string | number;
  bgColor: string;
  borderColor: string;
  borderWidth: string | number;
  borderRadius: string | number;
  jc?: string;
  top?: number;
  bottom?: number;
  align?: string;
  style?: any;
}

const BtnWrap = styled.TouchableOpacity<BtnWrapProps>`
  width: ${(props: { width: string | number }) => toPx(props.width)};
  height: ${(props: { height: string | number }) => toPx(props.height)};
  background-color: ${(props: { bgColor: any }) => props.bgColor};
  border-color: ${(props: { borderColor: any }) => props.borderColor};
  border-width: ${(props: { borderWidth: string | number }) =>
    toPx(props.borderWidth)};
  border-radius: ${(props: { borderRadius: string | number }) =>
    toPx(props.borderRadius)};
  justify-content: ${(props: { jc: any }) => props?.jc || 'center'};
  margin-top: ${(props: { top: any }) => props?.top || 0}px;
  margin-bottom: ${(props: { bottom: any }) => props?.bottom || 0}px;
  align-items: ${(props: { align: any }) => props?.align || 'center'};
  ${(props: { style: any }) => props.style};
  z-index: 1;
`;

interface RowProps {
  justify?: string;
}

const Row = styled.View<RowProps>`
  flex-direction: row;
  align-items: center;
  justify-content: ${(props: { justify: any }) => props.justify || 'center'};
`;

interface ButtonProps {
  text?: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'other';
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  borderWidth?: string | number;
  jc?: string;
  align?: string;
  style?: any;
  top?: number;
  bottom?: number;
  loading?: boolean;
  disabled?: boolean;
  textSize?: number;
  icon?: ReactNode;
  iconRight?: boolean;
  fontFamily?: string;
  fontWeight?: any;
  onPress?: () => void;
  textTop?: number;
  textBottom?: number;
  disabledBgColor?: string;
  disabledTextColor?: string;
  spinnerColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  children,
  variant = 'primary',
  bgColor = Colors.primary,
  borderColor = Colors.primary,
  textColor,
  width = '100%',
  height = '56px',
  borderRadius = '10px',
  borderWidth = '0px',
  jc = 'center',
  align = 'center',
  style,
  top,
  bottom,
  loading = false,
  disabled = false,
  textSize = 16,
  icon = null,
  iconRight = true,
  fontFamily = fonts.bold,
  fontWeight,
  onPress = () => {},
  textTop = 1,
  textBottom,
  disabledBgColor = Colors.disabledBtn,
  disabledTextColor = Colors.neutral_50,
  spinnerColor,
}) => {
  return (
    <BtnWrap
      width={width}
      height={height}
      style={style}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      jc={jc}
      align={align}
      bgColor={
        disabled
          ? disabledBgColor
          : variant === 'secondary'
          ? Colors.white
          : bgColor
      }
      borderColor={disabled ? disabledBgColor : borderColor}
      top={top}
      bottom={bottom}
      onPress={onPress}
      disabled={loading || disabled}>
      {loading ? (
        <ActivityIndicator
          style={{ alignSelf: 'center' }}
          size="small"
          color={
            spinnerColor || disabled
              ? disabledTextColor
              : bgColor === Colors.white
              ? Colors.primary
              : Colors.white
          }
        />
      ) : (
        <Row justify="center">
          {icon && !iconRight && icon}
          {children ? (
            children
          ) : (
            <CustomText
              color={
                textColor ||
                (disabled
                  ? disabledTextColor
                  : variant === 'secondary'
                  ? Colors.primary
                  : Colors.white)
              }
              align="center"
              fontFamily={fontFamily}
              fontSize={textSize}
              top={textTop}
              bottom={textBottom}
              onPress={onPress}>
              {text}
            </CustomText>
          )}
          {icon && iconRight && icon}
        </Row>
      )}
    </BtnWrap>
  );
};

export default Button;
