import { Text, View } from "react-native";
import { ItemsCardInfoProps } from "./ItemsCardInfo.type";
import { createStyles } from "./ItemsCardInfo.style";
import { useTheme } from '../../../hooks/UseTheme';

export function ItemsCardInfo({title,price}:ItemsCardInfoProps) {
	const { colors } = useTheme();
	const styles = createStyles(colors);	
	return <View style={styles.container}>
		<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
		<Text style={styles.price}>${price}</Text>
	</View>;
}
