import React from 'react';
import { Text, TextProps } from 'react-native';
import { globalStyles } from '../../../constants/globalStyles';

type TextVariant = keyof typeof globalStyles;

interface CustomTextProps extends TextProps {
  variant?: TextVariant;
}

export const CustomText: React.FC<CustomTextProps> = ({ 
  style, 
  variant = 'regular',
  ...props 
}) => {
  return (
    <Text
      style={[
        { fontFamily: globalStyles[variant] },
        style,
      ]}
      {...props}
    />
  );
}; 