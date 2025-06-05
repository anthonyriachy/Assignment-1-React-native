import React from 'react';
import { Text, TextInput, View } from "react-native";
import { createStyles } from "./NumberInput.style";
import { NumberInputProps } from "./NumberInput.type";
import { useTheme } from "../../../hooks/UseTheme";
import { CustomText } from "../CustomText/CustomText";

export const NumberInput=({Icon,label,error,...props}:NumberInputProps)=>{
    const {colors}=useTheme()       
    const styles=createStyles(colors)
    return <View style={styles.container}>
        <CustomText style={styles.label}>{label}</CustomText>
        {error && <CustomText style={styles.error}>{error}</CustomText>}
        <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
                {Icon}
            </View>
            <TextInput
                {...props}
                style={styles.input}
                keyboardType="numeric"
                placeholderTextColor={colors.placeholder}
                onChangeText={(text) => {
                    if (text === '' || !isNaN(Number(text))) {
                        props.onChangeText?.(Number(text));
                    }
                }}
            />
        </View>
    </View>
}