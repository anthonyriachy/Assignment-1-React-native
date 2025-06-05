import React from 'react';
import {Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./Profilebutton.style";
import { ProfileButtonProps } from "./Profilebutton.type";
import LeftArrow from '../../../assets/icons/RightArrow.svg';
import { CustomText } from "../CustomText/CustomText";
export const ProfileButton = ({ title, icon: Icon, onPress }: ProfileButtonProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.leftContainer}>
                <Icon width={23} height={23} stroke={colors.text}/>
                <CustomText style={styles.title}>{title}</CustomText>
            </View>
            <LeftArrow width={24} height={24} stroke={colors.text} />
        </TouchableOpacity>
    )
}   