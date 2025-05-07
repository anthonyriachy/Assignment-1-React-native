import { Pressable, ScrollView, Text, View } from "react-native";
import { ItemDetailsInfoProps } from "./ItemDetailsInfo.type";
import { styles } from "./ItemDetailsInfo.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "../../atoms/CustomButton";
import CardIcon from '../../../assets/icons/CardIcon.svg'
export function ItemDetailsInfo({ item }: ItemDetailsInfoProps) {
    const insets = useSafeAreaInsets();
	return <ScrollView style={{flex:1,height:'100%'}}>
    <View style={[styles.container, {paddingBottom:insets.bottom}]}>
        <View style={styles.infoContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>
            <View>
                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
        <View style={styles.buttonContainer}>
			<CustomButton style={{flex:1}} title="Buy Now" onPress={() => {}}/>
			<Pressable style={styles.cardBtn}>
                <CardIcon/>
            </Pressable>
        </View>

    </View>
    </ScrollView>;
}
