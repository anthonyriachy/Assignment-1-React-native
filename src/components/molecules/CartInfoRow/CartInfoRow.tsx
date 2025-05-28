import { View } from "react-native";
import { CartInfoRowProps } from "./CartInfoRow.type";
import { createStyles } from "./CartInfoRow.style";
import { useTheme } from "../../../hooks/UseTheme";
import { CustomText } from "../../atoms/CustomText/CustomText";

export const CartInfoRow = ({title,value}:CartInfoRowProps) => {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    return (
        <View style={styles.container}>
            <CustomText style={styles.title}>{title}</CustomText>
            <CustomText style={styles.value}>{value}</CustomText>
        </View>
    )
}