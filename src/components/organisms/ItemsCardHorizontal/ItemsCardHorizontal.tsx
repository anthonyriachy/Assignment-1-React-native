import { Image, Pressable, View, Text} from "react-native";
import { ItemsCardHorizontalProps } from './ItemsCardHorizontal.type';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createStyles } from './ItemsCardHorizontal.style';
import { useTheme } from "../../../hooks/UseTheme";
import ArrowRightIcon from '../../../assets/icons/RightArrow.svg';
import EditIcon from '../../../assets/icons/edit-button-svgrepo-com (1).svg';
import { getImageUrl } from "../../../lib/imageUtils";
import { useCallback } from "react";

export function ItemsCardHorizontal({ item }: ItemsCardHorizontalProps) {
    const navigation = useNavigation<any>();
    const { colors } = useTheme();
    const styles = createStyles(colors);
 

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
                <Image source={{uri:getImageUrl(item.images[0].url)}} style={styles.image} />
            </View>

            <View style={styles.info}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <ArrowRightIcon width={20} height={20} />
                </View>
            </View>
        </Pressable>
    )
}
