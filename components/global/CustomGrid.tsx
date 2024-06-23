import styled from 'styled-components/native';
import { Colors } from '../../constants/colors';
import { toPx } from '../../helpers/functions';
import { StyleProp, ViewStyle } from 'react-native';

export interface CommonProps {
  wrap?: boolean;
  flexWrap?: 'wrap' | 'no-wrap';
  align?: string;
  bgColor?: string;
  width?: string | number;
  justify?: string;
  paddingTop?: number;
  top?: number;
  paddingBottom?: number;
  bottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  marginTop?: number;
  mTop?: number;
  marginBottom?: number;
  mBottom?: number;
  borderRadius?: number;
  borderTop?: number;
  showBorderTop?: boolean;
  borderTopColor?: string;
  borderBottom?: number;
  showBorder?: boolean;
  centered?: boolean;
  borderBottomColor?: string;
  borderWidth?: number;
  borderColor?: string;
  bottomWidth?: number;
  vert?: number;
  hori?: number;
  left?: number;
  right?: number;
  gap?: number;
  style?: StyleProp<ViewStyle>;
  padding?: string;
}

interface ColProps extends CommonProps {
  padding?: string;
}

const parsePadding = (padding?: string): string => {
  if (!padding) return '0px';

  const values = padding.split(' ');
  switch (values.length) {
    case 1:
      return `${values[0]} ${values[0]} ${values[0]} ${values[0]}`;
    case 2:
      return `${values[0]} ${values[1]} ${values[0]} ${values[1]}`;
    case 3:
      return `${values[0]} ${values[1]} ${values[2]} ${values[1]}`;
    case 4:
      return `${values[0]} ${values[1]} ${values[2]} ${values[3]}`;
    default:
      return '0px';
  }
};

export const Row = styled.View<CommonProps>`
  flex-direction: row;
  flex-wrap: ${(props: { flexWrap: any }) => props.flexWrap || 'wrap'};
  bottom: 0px;
  align-items: ${(props: { align: any }) =>
    props.align ? props.align : 'center'};
  background-color: ${(props: { bgColor: any }) =>
    props.bgColor ? props.bgColor : Colors.transparent};
  width: ${(props: { width: string | number }) => toPx(props.width) || '100%'};
  justify-content: ${(props: { justify: any }) =>
    props.justify ? props.justify : 'space-between'};
  padding-top: ${(props: { paddingTop: any; top: any; vert: any }) =>
    props.paddingTop || props.top || props.vert
      ? props.paddingTop || props.top || props.vert
      : 0}px;
  padding-bottom: ${(props: { paddingBottom: any; bottom: any; vert: any }) =>
    props.paddingBottom || props.bottom || props.vert
      ? props.paddingBottom || props.bottom || props.vert
      : 0}px;
  padding-left: ${(props: { left: any; hori: any }) =>
    props.left || props.hori ? props.left || props.hori : undefined}px;
  padding-right: ${(props: { right: any; hori: any }) =>
    props.right || props.hori ? props.right || props.hori : undefined}px;
  margin-top: ${(props: { marginTop: any; mTop: any }) =>
    props.marginTop || props.mTop ? props.marginTop || props.mTop : 0}px;
  margin-bottom: ${(props: { marginBottom: any; mBottom: any }) =>
    props.marginBottom || props.mBottom
      ? props.marginBottom || props.mBottom
      : 0}px;
  border-radius: ${(props: { borderRadius: any }) =>
    props.borderRadius ? props.borderRadius : 0}px;
  border-width: ${(props: { borderWidth: any }) =>
    props.borderWidth ? props.borderWidth : 0}px;
  border-top-width: ${(props: { borderTop: any }) =>
    props.borderTop ? props.borderTop : 1}px;
  border-top-color: ${(props: {
    showBorderTop: any;
    borderTopColor: any;
    borderColor: any;
  }) =>
    props?.showBorderTop
      ? props.borderTopColor || Colors.baseBlack
      : props.borderColor || 'transparent'};
  border-bottom-width: ${(props: { borderBottom: any }) =>
    props.borderBottom ? props.borderBottom : 1}px;
  border-bottom-color: ${(props: {
    showBorder: any;
    borderBottomColor: any;
    borderColor: any;
  }) =>
    props?.showBorder
      ? props.borderBottomColor || Colors.baseBlack
      : props.borderColor || 'transparent'};
  padding: ${(props: { padding: string | undefined }) =>
    parsePadding(props.padding)};
  ${(props: { style: any }) => props.style};
`;

export const PressableRow = styled.Pressable<CommonProps>`
  flex-direction: row;
  flex-wrap: ${(props: { wrap: any }) => (props.wrap ? 'wrap' : 'no-wrap')};
  bottom: 0px;
  align-items: ${(props: { align: any }) =>
    props.align ? props.align : 'center'};
  background-color: ${(props: { bgColor: any }) =>
    props.bgColor ? props.bgColor : Colors.transparent};
  width: ${(props: { width: string | number }) => toPx(props.width) || '100%'};
  justify-content: ${(props: { justify: any }) =>
    props.justify ? props.justify : 'space-between'};
  padding-top: ${(props: { paddingTop: any; top: any }) =>
    props.paddingTop || props.top ? props.paddingTop || props.top : 0}px;
  padding-bottom: ${(props: { paddingBottom: any; bottom: any }) =>
    props.paddingBottom || props.bottom
      ? props.paddingBottom || props.bottom
      : 0}px;
  margin-top: ${(props: { marginTop: any; mTop: any }) =>
    props.marginTop || props.mTop ? props.marginTop || props.mTop : 0}px;
  margin-bottom: ${(props: { marginBottom: any; mBottom: any }) =>
    props.marginBottom || props.mBottom
      ? props.marginBottom || props.mBottom
      : 0}px;
  border-bottom-width: ${(props: { bottomWidth: any }) =>
    props.bottomWidth ? props.bottomWidth : 1}px;
  border-bottom-color: ${(props: {
    showBorder: any;
    borderBottom: any;
    borderColor: any;
  }) =>
    props?.showBorder
      ? props.borderBottom || Colors.baseBlack
      : props.borderColor || 'transparent'};
  border-radius: ${(props: { borderRadius: any }) =>
    props.borderRadius ? props.borderRadius : 0}px;
  padding: ${(props: { padding: string | undefined }) =>
    parsePadding(props.padding)};
  ${(props: { style: any }) => props.style};
`;

export const SpacedRow = styled.View<CommonProps>`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: ${(props: { align: any }) =>
    props.align ? props.align : 'center'};
  background-color: ${(props: { bgColor: any }) =>
    props.bgColor ? props.bgColor : Colors.transparent};
  justify-content: ${(props: { justify: any }) =>
    props.justify ? props.justify : 'space-between'};
  padding-top: ${(props: { paddingTop: any; top: any }) =>
    props.paddingTop || props.top ? props.paddingTop || props.top : 0}px;
  padding-bottom: ${(props: { paddingBottom: any; bottom: any }) =>
    props.paddingBottom || props.bottom
      ? props.paddingBottom || props.bottom
      : 0}px;
  margin-top: ${(props: { marginTop: any; mTop: any }) =>
    props.marginTop || props.mTop ? props.marginTop || props.mTop : 0}px;
  margin-bottom: ${(props: { marginBottom: any; mBottom: any }) =>
    props.marginBottom || props.mBottom
      ? props.marginBottom || props.mBottom
      : 0}px;
  border-radius: ${(props: { borderRadius: any }) =>
    props.borderRadius ? props.borderRadius : 0}px;
  padding: ${(props: { padding: string | undefined }) =>
    parsePadding(props.padding)};
  ${(props: { style: any }) => props.style};
`;

export const Col = styled.View<ColProps>`
  background-color: ${(props: { bgColor: any }) =>
    props.bgColor ? props.bgColor : Colors.transparent};
  width: ${(props: { width: string | number }) => toPx(props.width) || '100%'};
  justify-content: ${(props: { justify: any }) =>
    props.justify
      ? props.justify
      : props.centered
      ? 'center'
      : 'space-between'};
  align-items: ${(props: { align: any }) =>
    props.align ? props.align : props.centered ? 'center' : 'flex-start'};
  margin-top: ${(props: { marginTop: any }) =>
    props.marginTop ? props.marginTop : 0}px;
  margin-bottom: ${(props: { marginBottom: any }) =>
    props.marginBottom ? props.marginBottom : 0}px;
  border-radius: ${(props: { borderRadius: any }) =>
    props.borderRadius ? props.borderRadius : 0}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: {
    showBorder: any;
    borderBottom: any;
    borderColor: any;
  }) =>
    props?.showBorder
      ? props.borderBottom || Colors.baseBlack
      : props.borderColor || 'transparent'};
  padding: ${(props: { padding: string | undefined }) =>
    parsePadding(props.padding)};
  ${(props: { style: any }) => props.style};
`;

export const PressableCol = styled.Pressable<ColProps>`
  background-color: ${(props: { bgColor: any }) =>
    props.bgColor ? props.bgColor : Colors.transparent};
  width: ${(props: { width: string | number }) => toPx(props.width) || '100%'};
  justify-content: ${(props: { justify: any }) =>
    props.justify ? props.justify : 'space-between'};
  align-items: ${(props: { align: any }) =>
    props.align ? props.align : 'flex-start'};
  margin-top: ${(props: { marginTop: any }) =>
    props.marginTop ? props.marginTop : 0}px;
  margin-bottom: ${(props: { marginBottom: any }) =>
    props.marginBottom ? props.marginBottom : 0}px;
  border-radius: ${(props: { borderRadius: any }) =>
    props.borderRadius ? props.borderRadius : 0}px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props: {
    showBorder: any;
    borderBottom: any;
    borderColor: any;
  }) =>
    props?.showBorder
      ? props.borderBottom || Colors.baseBlack
      : props.borderColor || 'transparent'};
  ${(props: { style: any }) => props.style};
`;

export const SpacedCol = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
`;

export const Center = styled.View<CommonProps>`
  justify-content: center;
  align-items: center;
  ${(props: { style: any }) => props.style};
`;

export default {
  Col,
  Row,
  PressableCol,
  PressableRow,
  SpacedCol,
  SpacedRow,
  Center,
};
