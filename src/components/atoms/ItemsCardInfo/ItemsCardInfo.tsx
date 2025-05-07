import { Text, View } from "react-native";
import { ItemsCardInfoProps } from "./ItemsCardInfo.type";
import { styles } from "./ItemsCardInfo.style";

export function ItemsCardInfo({title,price}:ItemsCardInfoProps) {
	return <View style={styles.container}>
		<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
		<Text style={styles.price}>${price}</Text>
	</View>;
}
