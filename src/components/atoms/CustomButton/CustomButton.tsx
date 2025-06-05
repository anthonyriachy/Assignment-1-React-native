import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import { CustomButtonProps } from './CustomButton.type';
import { styles } from './CustomButton.style';
import { CustomText } from '../CustomText/CustomText';

export const CustomButton = ({title,onPress,disabled,loading,style:customStyle}:CustomButtonProps)=>{
    return(
        <TouchableOpacity
            testID="custom-button"
            style={[styles.button,customStyle]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            <CustomText style={styles.text}>{loading ? title+'...' : title}</CustomText>
        </TouchableOpacity>
    );
};
