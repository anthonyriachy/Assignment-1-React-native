import { TouchableOpacity } from "react-native";
import Arrow from "../../../assets/icons/BackArrow.svg"
import { styles } from "./BackArrow.style";
import { useNavigation } from "@react-navigation/native";
export const BackArrow = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={()=>navigation.goBack()}>
            <Arrow/>
        </TouchableOpacity>
    )
}