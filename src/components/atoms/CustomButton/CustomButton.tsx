import {TouchableOpacity, Text} from 'react-native';
import { CustomButtonProps } from './CustomButton.type';
import { styles } from './CustomButton.style';

export const CustomButton = ({title,onPress,disabled,loading,style:customStyle}:CustomButtonProps)=>{
    return(
        <TouchableOpacity
            style={[styles.button,customStyle]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            <Text style={styles.text}>{loading ? 'Loading...' : title}</Text>
        </TouchableOpacity>
    );
};
