import React from 'react';
import { Text, View } from "react-native";
import { ItemsCardInfoProps } from "./ItemsCardInfo.type";
import { createStyles } from "./ItemsCardInfo.style";
import { useTheme } from '../../../hooks/UseTheme';
import DateIcon from '../../../assets/icons/DateIcon.svg';
import LocationIcon from '../../../assets/icons/LocationIcon.svg';
import { getRelativeTime } from '../../../lib/dateUtils';
import { CustomText } from "../CustomText/CustomText";
export function ItemsCardInfo({title,price,date,location}:ItemsCardInfoProps) {
	const { colors, theme } = useTheme();
	const styles = createStyles(colors, theme);	
return <View style={styles.container}>
		<View>
			<CustomText style={styles.price}>${price}</CustomText>
			<CustomText style={styles.title} numberOfLines={1} ellipsizeMode="tail" testID="items-card-title">{title}</CustomText>
		</View>
		<View style={styles.bottomContainer}>
			{date && <View style={styles.dateContainer}>
				<DateIcon width={20} height={20} />
				<CustomText style={styles.date} numberOfLines={1} ellipsizeMode="tail">{getRelativeTime(date)}</CustomText>
			</View>}
			{location && <View style={styles.locationContainer}>
				<LocationIcon width={20} height={20} />
				<CustomText style={styles.location} numberOfLines={1} ellipsizeMode="tail" testID="items-card-location">{location.name}</CustomText>
			</View>}
		</View>
	</View>;
}
