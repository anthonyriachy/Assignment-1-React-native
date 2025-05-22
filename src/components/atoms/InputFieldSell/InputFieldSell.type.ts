import { TextInputProps } from "react-native";

export type inputFieldSellProps={
    placeholder: string;
    label:string;
    error?: string;
    description?:boolean;
}& TextInputProps;

