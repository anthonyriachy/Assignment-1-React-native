import { View } from "react-native"
import OrderCompleteImage from '../../assets/icons/OrderCompleteIcon.svg'
import { CustomButton } from "../../components/atoms/CustomButton/CustomButton"
import { useTheme } from "../../hooks/UseTheme"
import { createStyles } from "./OrderComplete.style"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { AppStackRoutes } from "../../constants/AppStackRoutes"
import { AppStackParamsList } from "../../types/AppStackParamsList"
import { NavigationProp } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
export const OrderComplete = () => {
    const {colors}=useTheme()
    const styles=createStyles(colors)
    const navigation = useNavigation<NavigationProp<AppStackParamsList>>();
    const handleGoHome=()=>{
        navigation.navigate(AppStackRoutes.BottomTabs)
    }
    return (
        <View style={styles.container}>
            <OrderCompleteImage />
            <View style={styles.textContainer}>
                <CustomText style={styles.title}>Order Complete</CustomText>
                <CustomText style={styles.description}>Your order has been placed successfully</CustomText>
            </View>
            <CustomButton
                title="Continue Shopping"
                onPress={handleGoHome}
            />
        </View>
    )
}
