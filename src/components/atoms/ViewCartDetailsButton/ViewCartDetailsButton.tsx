 
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native";
import { CustomText } from "../CustomText/CustomText";

export const ViewCartDetailsButton = ({ 
    onPress, 
    opacity, 
    isModalVisible,
    styles
}: { 
    onPress: () => void;
    opacity: Animated.Value;
    isModalVisible: boolean;
    styles: any;
}) => {
    
    return (
        <Animated.View 
            style={[
                styles.bottomContainer,
                { opacity }
            ]}
            pointerEvents={isModalVisible ? 'none' : 'auto'}
        >
            <TouchableOpacity 
                style={styles.expandButton} 
                onPress={onPress}
            >
                <CustomText style={styles.expandButtonText}>View Cart Details</CustomText>
            </TouchableOpacity>
        </Animated.View>
    );
};
    