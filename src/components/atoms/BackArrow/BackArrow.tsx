import { TouchableOpacity } from "react-native";
import Arrow from "../../../assets/icons/BackArrow.svg"
import { styles } from "./BackArrow.style";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { AppStackRoutes } from "../../../constants/AppStackRoutes";
import { BackArrowProps } from "./BackArrow.type";
export const BackArrow = ({onPress}:BackArrowProps) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => {    
                if(onPress){
                    onPress();
                    return;
                }
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: AppStackRoutes.AppStack
                        })
                    );
                }
            }}
        >
            <Arrow/>
        </TouchableOpacity>
    )
}