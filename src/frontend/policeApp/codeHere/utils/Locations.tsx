import {requestLocationPermission} from "./Permissions";
import Geolocation from "react-native-geolocation-service";
import Geocoder from 'react-native-geocoding';

interface ILocation {
    latitude: number;
    longitude: number;
}

export const isWithinVentspilsBorder = (latitude:number, longitude:number) => {
    const ventspilsBorder = {
        latitudeNorth: 57.470495440788554,
        latitudeSouth: 57.34972738596187,
        longitudeEast: 21.67294453829527,
        longitudeWest: 21.524735391139984,
    };

    return (
        (latitude >= ventspilsBorder.latitudeSouth &&
            latitude <= ventspilsBorder.latitudeNorth) &&
        (longitude <= ventspilsBorder.longitudeEast &&
            longitude >= ventspilsBorder.longitudeWest)
    );
};

export const getAddressFromLocation = (location: ILocation) => {
    return Geocoder.from(location.latitude, location.longitude)
        .then((address) => {
            const addressResult = address.results[0].address_components;
            let street = null;
            for (let i = 0; i < addressResult.length; i++) {
                for (let j = 0; j < addressResult[i].types.length; j++) {
                    if (addressResult[i].types[j] === 'route') {
                        street = addressResult[i].long_name;
                    }
                }
            }
            if (street === null) {
                street = "Can't find the street";
            }
            return street;
        })
        .catch((error: any) => {
            console.log(error);
            return null;
        });
};

export const getLocation = async () => {
    const permission = await requestLocationPermission();
    if (permission === 'granted') {
        return new Promise<ILocation>((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        });
    }
};