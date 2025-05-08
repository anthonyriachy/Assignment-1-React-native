import { Pressable, Text } from 'react-native';
import { AuthSmallTextProps } from './AuthSmallText.type';
import { createStyles } from './AuthSmallText.style';
import { useTheme } from '../../../hooks/UseTheme';

export const AuthSmallText = ({text,linkText,onPress}:AuthSmallTextProps)=>{
    const { colors } = useTheme();
    const styles = createStyles(colors);
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
