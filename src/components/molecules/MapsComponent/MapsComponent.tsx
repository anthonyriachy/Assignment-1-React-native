import { Marker, Region } from "react-native-maps";
import MapView from "react-native-maps";
import { useTheme } from "../../../hooks/UseTheme";
import { createStyles } from "./MapsComponent.style";
import { useEffect, useState } from "react";
import { Modal, TouchableOpacity, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { MapComponentProps } from "./MapsComponent.type";
import { BackArrow } from "../../atoms/BackArrow";
import FullScreenIcon from "../../../assets/icons/fullscreen-svgrepo-com.svg";

export const MapComponent = ({setValue, latitude, longitude, locationName,isView}: MapComponentProps) => {
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const [isMapModalVisible, setIsMapModalVisible] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<Region>({
        latitude: latitude || 37.78825,
        longitude: longitude || -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Update map when location props change
    useEffect(() => {
        if (latitude && longitude) {
            setSelectedLocation({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
    }, [latitude, longitude]);

    const onMapPress = (e: any) => {
        if(isView) return;
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const newRegion = {
            ...selectedLocation,
            latitude,
            longitude,
        };
        setSelectedLocation(newRegion);
        if (setValue) {
            setValue('location.latitude', latitude);
            setValue('location.longitude', longitude);
        }
    };

  

    return (
        <View>
            <View style={styles.mapContainer}>
                <TouchableOpacity
                    style={styles.fullScreenButton}
                    onPress={() => setIsMapModalVisible(true)}
                >
                    <FullScreenIcon width={14} height={14}/>
                </TouchableOpacity>
                <MapView
                    style={styles.map}
                    region={selectedLocation}
                    onPress={onMapPress}
                >
                    <Marker
                        coordinate={{
                            latitude: selectedLocation.latitude,
                            longitude: selectedLocation.longitude,
                        }}
                        title={locationName}
                    />
                </MapView>
            </View>


{/* full screen map */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={isMapModalVisible}
                onRequestClose={() => setIsMapModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.closeButton}>
                        <BackArrow onPress={() => setIsMapModalVisible(false)}/>
                    </View>
                    <MapView
                        style={styles.map}
                        region={selectedLocation}
                        onPress={onMapPress}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                    >
                        <Marker
                            coordinate={{
                                latitude: selectedLocation.latitude,
                                longitude: selectedLocation.longitude,
                            }}
                            title={locationName}
                        />
                    </MapView>
                </View>
            </Modal>
        </View>
    );
};