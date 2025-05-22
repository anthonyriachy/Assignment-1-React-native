import { Text, View } from "react-native";
import { ItemsCardInfoProps } from "./ItemsCardInfo.type";
import { createStyles } from "./ItemsCardInfo.style";
import { useTheme } from '../../../hooks/UseTheme';
import DateIcon from '../../../assets/icons/DateIcon.svg';
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
import { getRelativeTime } from '../../../lib/dateUtils';
export function ItemsCardInfo({title,price,date,location}:ItemsCardInfoProps) {
	const { colors, theme } = useTheme();
	const styles = createStyles(colors, theme);	
return <View style={styles.container}>
		<View>
			<Text style={styles.price}>${price}</Text>
			<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
		</View>
		<View style={styles.bottomContainer}>
			{date && <View style={styles.dateContainer}>
				<DateIcon width={20} height={20} />
				<Text style={styles.date} numberOfLines={1} ellipsizeMode="tail">{getRelativeTime(date)}</Text>
			</View>}
			{location && <View style={styles.locationContainer}>
				<LocationIcon width={20} height={20} />
				<Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{location.name}</Text>
			</View>}
		</View>
	</View>;
}
