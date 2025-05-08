import { TouchableOpacity } from "react-native";
import Arrow from "../../../assets/icons/BackArrow.svg"
import { styles } from "./BackArrow.style";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { AppStackRoutes } from "../../../constants/AppStackRoutes";
export const BackArrow = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => {
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: AppStackRoutes.Main
                        })
                    );
                }
            }}
        >
            <Arrow/>
        </TouchableOpacity>
    )
}