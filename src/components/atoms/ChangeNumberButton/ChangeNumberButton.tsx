import { Pressable, View } from "react-native";
import { ChangeNumberButtonProps } from "./ChangeNumberButton.type";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./ChangeNumberButton.style";
import { CustomText } from "../CustomText/CustomText";

export function ChangeNumberButton({Icon,onPress}:ChangeNumberButtonProps) {
    const {colors} = useTheme();
    const styles = createStyles(colors);
    return (
        <Pressable style={styles.container} onPress={onPress}>
            <CustomText style={styles.text}>{Icon}</CustomText>
        </Pressable>
    );
}