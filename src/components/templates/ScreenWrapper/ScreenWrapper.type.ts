import { ViewStyle } from 'react-native';

export type ScreenWrapperProps = {
    children: React.ReactNode;
    disableSafeArea?: boolean;
    style?: ViewStyle;
}
