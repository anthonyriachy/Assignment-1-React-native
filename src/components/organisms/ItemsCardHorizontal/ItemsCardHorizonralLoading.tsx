import { View } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { useTheme } from "../../../hooks/UseTheme";
import { ThemeColors } from "../../../constants/theme";
import { createStyles } from "./ItemsCardHorizontal.style";
import LinearGradient from "react-native-linear-gradient";

export const ItemsCardHorizontalShimmer = () => {
    const { colors } = useTheme() as { colors: ThemeColors };
    const styles = createStyles(colors);
    
    return (
        <View style={[styles.container,{paddingHorizontal:10}]}>
            <ShimmerPlaceholder
                style={[styles.imageContainer, { padding: 0 }]}
                LinearGradient={LinearGradient}
            />
            <View style={styles.info}>
                <View style={styles.infoContainer}>
                    <ShimmerPlaceholder
                        style={{ width: '80%', height: 20, marginBottom: 8 }}
                        LinearGradient={LinearGradient}
                    />
                    <ShimmerPlaceholder
                        style={{ width: '40%', height: 20 }}
                        LinearGradient={LinearGradient}
                    />
                </View>
                <View style={styles.arrowContainer}>
                    <ShimmerPlaceholder
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                        LinearGradient={LinearGradient}
                    />
                </View>
            </View>
        </View>
    );
};