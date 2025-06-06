import React from 'react';
import { TouchableOpacity } from "react-native";
import Arrow from "../../../assets/icons/BackArrow.svg"
import { styles } from "./BackArrow.style";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { AppStackRoutes } from "../../../constants/AppStackRoutes";
import { BackArrowProps } from "./BackArrow.type";
import { BottomTabRoutes } from "../../../constants/BottomTabRoutes";

export const BackArrow = ({onPress}:BackArrowProps) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => {    
                if(onPress){
                    onPress();
                    return;
                }
                if (navigation.canGoBack()) {
                    navigation.goBack();
                } else {
                    // Navigate to home screen
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'AppStack',
                                    state: {
                                        routes: [
                                            {
                                                name: 'MainBottomTabs',
                                                state: {
                                                    routes: [
                                                        {
                                                            name: BottomTabRoutes.Home
                                                        }
                                                    ]
                                                }
                                            }
                                        ]
                                    }
                                }
                            ]
                        })
                    );
                }
            }}
        >
            <Arrow/>
        </TouchableOpacity>
    )
}