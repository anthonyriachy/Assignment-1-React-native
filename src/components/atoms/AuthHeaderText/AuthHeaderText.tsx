import { useTheme } from '../../../hooks/UseTheme';
import { AuthHeaderTextProps } from './AuthHeaderText.type';
import { createStyles } from './AuthHeaderText.style';
import { Text } from 'react-native';
import { CustomText } from '../CustomText/CustomText';

export const AuthHeaderText = ({title}:AuthHeaderTextProps)=>{
    const { colors } = useTheme();
    const styles = createStyles(colors);
    return(
        <CustomText style={styles.title}>
            {title}
        </CustomText>
    );
};
