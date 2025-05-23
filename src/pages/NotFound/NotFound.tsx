import { View } from 'react-native';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { globalStyles } from '../../constants/globalStyles';
import { colors } from '../../constants/colors';

export function NotFound() {
	return <View>
		<CustomText style={{fontFamily:globalStyles.semiBold,color:colors.primary}}>Not Found</CustomText>
	</View>;
}
