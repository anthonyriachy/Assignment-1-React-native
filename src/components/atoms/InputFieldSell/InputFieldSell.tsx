import { Text, View, TextInput } from "react-native";
import { inputFieldSellProps } from "./InputFieldSell.type";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./InputFieldSell.style";
export const InputFieldSell = ({error,label,description=false,...props}:inputFieldSellProps) => {
    const {colors}=useTheme()
    const styles=createStyles(colors,description)
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            {error && <Text style={styles.error}>{error}</Text>}
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