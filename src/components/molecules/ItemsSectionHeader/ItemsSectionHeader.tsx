import { Text } from 'react-native-gesture-handler';
import { ItemsSectionHeaderProps } from './ItemsSectionHeader.type';
import { Pressable } from 'react-native';
import { styles } from './ItemsSectionHeader.style.ts';
export function ItemsSectionHeader({title, onClick}: ItemsSectionHeaderProps) {
	return<Pressable onPress={onClick} style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.viewAll}>See All</Text>
    </Pressable>;
}
