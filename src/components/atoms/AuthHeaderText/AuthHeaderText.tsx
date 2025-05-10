import { useTheme } from '../../../hooks/UseTheme';
import { AuthHeaderTextProps } from './AuthHeaderText.type';
import { createStyles } from './AuthHeaderText.style';
import { Text } from 'react-native';

export const AuthHeaderText = ({title}:AuthHeaderTextProps)=>{
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return(
        <Text style={styles.title}>
            {title}
        </Text>
    );
};
