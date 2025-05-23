import { View } from "react-native"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"




export const CarouselSectionLoading = () => {
    return (
        <View>
            <ShimmerPlaceholder
                style={{ width: '100%', height: 40, borderRadius: 10 }}
            />
        </View>
    )
}