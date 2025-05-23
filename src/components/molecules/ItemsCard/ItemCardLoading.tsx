import { View } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useTheme } from '../../../hooks/UseTheme';
import { ThemeColors } from '../../../constants/theme';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './ItemsCard.style';
export const ItemsCardShimmer = () => {
	const { colors } = useTheme() as { colors: ThemeColors };
	return (
		<View style={styles.parentContainer}>

				<ShimmerPlaceholder
					style={{ width: '100%', height: 129, borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
					LinearGradient={LinearGradient}
				/>

					<ShimmerPlaceholder
						style={{ width: '40%', height: 20, marginBottom: 8 }}
					LinearGradient={LinearGradient}
					/>
					<ShimmerPlaceholder
						style={{ width: '80%', height: 20, marginBottom: 8 }}
						LinearGradient={LinearGradient}
					/>
					<ShimmerPlaceholder
						style={{ width: '60%', height: 20 }}
					LinearGradient={LinearGradient}
					/>


		</View>
	);
};
