import React from 'react';
import { Pressable, Text } from 'react-native';
import { AuthSmallTextProps } from './AuthSmallText.type';
import { createStyles } from './AuthSmallText.style';
import { useTheme } from '../../../hooks/UseTheme';
import { CustomText } from '../CustomText/CustomText';

export const AuthSmallText = ({text,linkText,onPress}:AuthSmallTextProps)=>{
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return(
        <Pressable onPress={onPress} style={styles.container}>
            <CustomText style={styles.text}>
                {text}
            </CustomText>
            <CustomText style={styles.linkText}>
                {linkText}
            </CustomText>
        </Pressable>
    );
};
