import {PermissionsAndroid} from "react-native";

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'App needs access to your device location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission given');
            return PermissionsAndroid.RESULTS.GRANTED;
        } else {
            console.log('Location permission denied');
            return PermissionsAndroid.RESULTS.DENIED;
        }
    } catch (err) {
        console.log(err);
        return PermissionsAndroid.RESULTS.DENIED;
    }
};

export const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "App Camera Permission",
                message:"App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Camera permission given');
            return PermissionsAndroid.RESULTS.GRANTED;
        } else {
            console.log('Camera permission denied');
            return PermissionsAndroid.RESULTS.DENIED;
        }
    } catch (err) {
        console.log(err);
        return PermissionsAndroid.RESULTS.DENIED;
    }
};

export const requestLibraryPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
                title: "App Storage Permission",
                message: "App needs access to your images",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('images permission given');
            return PermissionsAndroid.RESULTS.GRANTED;
        } else {
            console.log('images permission denied');
            return PermissionsAndroid.RESULTS.DENIED;
        }
    } catch (err) {
        console.log(err);
        return PermissionsAndroid.RESULTS.DENIED;
    }
};