import React, {useEffect, useState} from "react";
import {View} from "react-native";
import MapView, {Marker} from "react-native-maps";
import { styles } from "../styles/PoliceStationStyles";
import {getLocation} from "../utils/Locations";
interface ILocation {
    latitude: number;
    longitude: number;
}
function PoliceStation() {

    const [userLocation, setUserLocation] = useState<ILocation>({
        latitude: 0,
        longitude: 0,
    });

    const policeStationLocations = [
        {
            title: 'Ventspils Municipal Police',
            coordinate: {
                latitude: 57.39301451367271,
                longitude: 21.566714644432068,
            },
        },
        {
            title: 'National Police',
            coordinate: {
                latitude: 57.39601642700416,
                longitude: 21.557335294783115,
            },
        },
    ];

    useEffect(() => {
        getLocation()
            .then((location: any) => {
                setUserLocation({
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{
                latitude: 57.39485,
                longitude: 21.56121,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }}>
                {policeStationLocations.map(location => (
                    <Marker key={location.title} coordinate={location.coordinate} title={location.title} pinColor="purple" />
                ))}
                <Marker coordinate={userLocation} pinColor={"green"} />
            </MapView>
        </View>
    );
}

export default PoliceStation;