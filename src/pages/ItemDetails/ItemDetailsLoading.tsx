import { StyleSheet, View, ScrollView } from "react-native"
import { BackArrow } from "../../components/atoms/BackArrow"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import LinearGradient from "react-native-linear-gradient"
import { ThemeColors } from "../../constants/theme.ts"
import { useTheme } from "../../hooks/UseTheme"
import { useMemo } from "react"

export const ItemDetailsLoading = () => {
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(colors), [colors]);

    return (
        <View style={styles.container}>
            <View style={styles.backButton}>
                <BackArrow />
            </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.imageContainer}>
                    <ShimmerPlaceholder style={styles.image} LinearGradient={LinearGradient}/>
                </View>
                <View style={styles.infoContainer}>
                    {/* Title and Price */}
                    <View style={styles.titleContainer}>
                        <ShimmerPlaceholder style={styles.titleShimmer} LinearGradient={LinearGradient}/>
                        <ShimmerPlaceholder style={styles.priceShimmer} LinearGradient={LinearGradient}/>
                    </View>

                    {/* Date and Location */}
                    <View style={styles.moreDetails}>
                        <View style={styles.dateContainer}>
                            <ShimmerPlaceholder style={styles.dateShimmer} LinearGradient={LinearGradient}/>
                        </View>
                        <View style={styles.locationContainer}>
                            <ShimmerPlaceholder style={styles.locationShimmer} LinearGradient={LinearGradient}/>
                        </View>
                    </View>

                    {/* Seller Info */}
                    <View style={styles.sellerContainer}>
                        <View style={styles.sellerInfoContainer}>
                            <ShimmerPlaceholder style={styles.sellerImageShimmer} LinearGradient={LinearGradient}/>
                            <View style={styles.sellerNameContainer}>
                                <ShimmerPlaceholder style={styles.sellerNameShimmer} LinearGradient={LinearGradient}/>
                                <ShimmerPlaceholder style={styles.sellerContactShimmer} LinearGradient={LinearGradient}/>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <ShimmerPlaceholder style={styles.descriptionTitleShimmer} LinearGradient={LinearGradient}/>
                        <ShimmerPlaceholder style={styles.descriptionShimmer} LinearGradient={LinearGradient}/>
                        <ShimmerPlaceholder style={styles.descriptionShimmer} LinearGradient={LinearGradient}/>
                    </View>

                    {/* Map */}
                    <View style={styles.mapContainer}>
                        <ShimmerPlaceholder style={styles.mapShimmer} LinearGradient={LinearGradient}/>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
                <ShimmerPlaceholder style={styles.buttonShimmer} LinearGradient={LinearGradient}/>
                <ShimmerPlaceholder style={styles.buttonShimmer2} LinearGradient={LinearGradient}/>
            </View>
        </View>
    )
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100,
    },
    imageContainer: {
        width: '100%',
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 20,
    },
    titleContainer: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleShimmer: {
        width: '50%',
        height: 24,
        marginBottom: 8,
        borderRadius: 4,
    },
    priceShimmer: {
        width: '30%',
        height: 20,
        borderRadius: 4,
    },
    moreDetails: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    dateShimmer: {
        width: 100,
        height: 20,
        borderRadius: 4,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationShimmer: {
        width: 120,
        height: 20,
        borderRadius: 4,
    },
    sellerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    sellerInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sellerImageShimmer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    sellerNameContainer: {
        flex: 1,
    },
    sellerNameShimmer: {
        width: '60%',
        height: 20,
        marginBottom: 5,
        borderRadius: 4,
    },
    sellerContactShimmer: {
        width: '40%',
        height: 20,
        borderRadius: 4,
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    descriptionTitleShimmer: {
        width: '30%',
        height: 20,
        marginBottom: 10,
        borderRadius: 4,
    },
    descriptionShimmer: {
        width: '100%',
        height: 20,
        marginBottom: 8,
        borderRadius: 4,
    },
    mapContainer: {
        height: 200,
        marginBottom: 20,
    },
    mapShimmer: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 10,
    },
    buttonShimmer: {
        width: '70%',
        height: 50,
        borderRadius: 8,
    },
    buttonShimmer2: {
        width: '27%',
        height: 50,
        borderRadius: 8,
    }
})