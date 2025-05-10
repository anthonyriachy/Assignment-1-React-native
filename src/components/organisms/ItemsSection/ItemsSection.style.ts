import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		gap: 10,
	},
	listContainer: {
		gap: 12,
		paddingLeft:15,
		paddingRight:15,
        paddingVertical:5,
	},
	verticalListContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap:15,
		paddingHorizontal:15,
	},
});
