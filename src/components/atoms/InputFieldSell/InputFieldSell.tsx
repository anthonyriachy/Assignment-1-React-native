import React from 'react';
import { View, TextInput } from "react-native";
import { inputFieldSellProps } from "./InputFieldSell.type";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./InputFieldSell.style";
import { CustomText } from "../CustomText/CustomText";
import { ErrorText } from "../ErrorText/ErrorText";
export const InputFieldSell = ({error,label,description=false,...props}:inputFieldSellProps) => {
    const {colors}=useTheme()
    const styles=createStyles(colors,description)
    return (
        <View>
            <CustomText style={styles.label}>{label}</CustomText>
            {error && <ErrorText error={error} />}
            <TextInput
                placeholderTextColor={colors.placeholder}
                {...props}
                style={styles.input}
                multiline={description}
                numberOfLines={description ? 5 : 1}
            />
        </View>

    )
}