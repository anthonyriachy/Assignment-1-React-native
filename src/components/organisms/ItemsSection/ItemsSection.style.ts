import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		gap: 16,
	},
	verticalContainer: {
		gap: 16,
		paddingHorizontal: 15,
	},
	listContainer: {
		gap: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingVertical: 8,
	},
	verticalListContainer: {
		justifyContent: 'space-between',
		gap: 16,
		margin: 16,
		backgroundColor: 'red',
	},
	loaderContainer: {
		paddingVertical: 16,
		alignItems: 'center',
		width: '100%',
	},
	noMoreProductsContainer: {
		paddingVertical: 20,
		alignItems: 'center',
		justifyContent: 'center',
	},
	noMoreProductsText: {
		fontSize: 14,
		color: '#666',
		fontWeight: '500',
	},
});
