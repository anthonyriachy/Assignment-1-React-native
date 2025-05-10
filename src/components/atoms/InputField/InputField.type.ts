import { TextInputProps } from "react-native";

export type InputFieldProps = {
    placeholder: string;
    error?: string;
    password?: boolean;
}& TextInputProps;