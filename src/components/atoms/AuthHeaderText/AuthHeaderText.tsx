
import { AuthHeaderTextProps } from './AuthHeaderText.type';
import { styles } from './AuthHeaderText.style';
import { Text } from 'react-native';

export const AuthHeaderText = ({title}:AuthHeaderTextProps)=>{
    return(
        <Text style={styles.title}>
            {title}
        </Text>
    );
};
