/* eslint-disable react-native/no-inline-styles */
import { Text } from "react-native";
import { View } from "react-native";

import { useTheme } from "../../hooks/UseTheme";

export const CartScreen = () => {
    const {colors} = useTheme();
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:colors.background}}>
            <Text style={{color:colors.text}}>Cart</Text>
        </View>
    );
};