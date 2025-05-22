import { Text, TextInput, View } from "react-native";
import { createStyles } from "./NumberInput.style";
import { NumberInputProps } from "./NumberInput.type";
import { useTheme } from "../../../hooks/UseTheme";

export const NumberInput=({Icon,label,error,...props}:NumberInputProps)=>{
    const {colors}=useTheme()       
    const styles=createStyles(colors)
    return <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
                {Icon}
            </View>
            <TextInput
                {...props}
                style={styles.input}
                keyboardType="numeric"
                onChangeText={(text) => {
                    if (text === '' || !isNaN(Number(text))) {
                        props.onChangeText?.(Number(text));
                    }
                }}
            />
        </View>
    </View>
}