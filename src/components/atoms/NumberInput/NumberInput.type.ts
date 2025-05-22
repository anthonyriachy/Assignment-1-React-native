import { TextInputProps } from "react-native";

export type NumberInputProps = {
    Icon?: React.ReactNode;
    label: string;
    error?: string;
    onChangeText?: (value: number) => void;
} & TextInputProps;