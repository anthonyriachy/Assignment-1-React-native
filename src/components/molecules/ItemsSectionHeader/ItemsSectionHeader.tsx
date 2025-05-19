import { Text } from 'react-native-gesture-handler';
import { ItemsSectionHeaderProps } from './ItemsSectionHeader.type';
import { Pressable, View } from 'react-native';
import { createStyles } from './ItemsSectionHeader.style.ts';
import { useTheme } from '../../../hooks/UseTheme';
export function ItemsSectionHeader({title, onClick}: ItemsSectionHeaderProps) {
    const { colors } = useTheme();
    const styles = createStyles(colors);    
	return onClick ? (
        <Pressable onPress={onClick} style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.viewAll}>See All</Text>
        </Pressable>
    ) : (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
