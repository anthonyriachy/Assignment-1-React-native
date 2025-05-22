import { ImageSourcePropType } from 'react-native';
import { SvgProps } from 'react-native-svg';

export type ProfileButtonProps = {
    title: string;
    icon: React.FC<SvgProps>;
    onPress?: () => void;
}