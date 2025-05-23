import { Text } from 'react-native-gesture-handler';
import { ItemsSectionHeaderProps } from './ItemsSectionHeader.type';
import { Pressable, View } from 'react-native';
import { createStyles } from './ItemsSectionHeader.style.ts';
import { useTheme } from '../../../hooks/UseTheme';
import { CustomText } from '../../atoms/CustomText/CustomText.tsx';
export function ItemsSectionHeader({title, onClick}: ItemsSectionHeaderProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);    
	return onClick ? (
        <Pressable onPress={onClick} style={styles.container}>
            <CustomText style={styles.title}>{title}</CustomText>
            <CustomText style={styles.viewAll}>See All</CustomText>
        </Pressable>
    ) : (
        <View style={styles.container}>
            <CustomText style={styles.title}>{title}</CustomText>
        </View>
    );
}
