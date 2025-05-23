import { useTheme } from '../../../hooks/UseTheme';
import { Text } from 'react-native';
import { createStyles } from './ErrorText.style.ts';
import { CustomText } from '../CustomText/CustomText.tsx';

export const ErrorText = ({ error }: { error: string | undefined }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <CustomText style={styles.errorText}>{error}</CustomText>
    );
};  