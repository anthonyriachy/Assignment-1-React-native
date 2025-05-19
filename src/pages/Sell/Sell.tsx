import { Text, View } from "react-native";
import { styles } from "../../components/atoms/BackArrow/BackArrow.style";
import { BackArrow } from "../../components/atoms/BackArrow";
import { createStyles } from "./Sell.style";
import { useTheme } from "../../hooks/UseTheme";

export function Sell() {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return (
        <View style={styles.container}>
          <View style={styles.backButton}>
                <BackArrow />
            </View>   
            <Text>Add Item</Text>
        </View>
    );
}           