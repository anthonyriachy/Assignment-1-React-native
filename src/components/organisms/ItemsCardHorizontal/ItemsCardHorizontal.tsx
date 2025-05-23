import { Image, Pressable, View, Text} from "react-native";
import { ItemsCardHorizontalProps } from './ItemsCardHorizontal.type';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createStyles } from './ItemsCardHorizontal.style';
import { useTheme } from "../../../hooks/UseTheme";
import ArrowRightIcon from '../../../assets/icons/RightArrow.svg';
import { getImageUrl } from "../../../lib/imageUtils";
import { useCallback, useState } from "react";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { ThemeColors } from "../../../constants/theme";
import LinearGradient from "react-native-linear-gradient";
import { CustomText } from "../../atoms/CustomText/CustomText";

export function ItemsCardHorizontal({ item }: ItemsCardHorizontalProps) {
    const navigation = useNavigation<any>();
    const { colors } = useTheme() as { colors: ThemeColors };
    const styles = createStyles(colors);
    const [isLoading, setIsLoading] = useState(true);

	const handleClick = useCallback(() => {
		navigation.dispatch(
			CommonActions.navigate({
				name: 'Details',
				params: { itemId: item._id }
			})
		);
	},[item._id,navigation]);

    return (
        <Pressable onPress={handleClick} style={styles.container}>
            <View style={styles.imageContainer}>
                {isLoading && (
                    <ShimmerPlaceholder
                        style={styles.image}
                        LinearGradient={LinearGradient}
                        shimmerColors={[colors.background, colors.border, colors.background]}
                    />
                )}
                <Image 
                    source={{uri: getImageUrl(item.images[0].url)}} 
                    style={[styles.image, isLoading && { position: 'absolute', opacity: 0 }]} 
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                />
            </View>

            <View style={styles.info}>
                <View style={styles.infoContainer}>
                    <CustomText style={styles.title}>{item.title}</CustomText>
                    <CustomText style={styles.price}>${item.price}</CustomText>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowRightIcon width={20} height={20} />
                </View>
            </View>
        </Pressable>
    )
}
