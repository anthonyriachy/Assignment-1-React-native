import { Pressable, Text } from 'react-native';
import { AuthSmallTextProps } from './AuthSmallText.type';
import { styles } from './AuthSmallText.style';

export const AuthSmallText = ({text,linkText,onPress}:AuthSmallTextProps)=>{
    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>
                {text}
            </Text>
            <Text style={styles.linkText}>
                {linkText}
            </Text>
        </Pressable>
    );
};
