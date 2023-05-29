import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {View,Text,Button,Image,TextInput,Modal,TouchableWithoutFeedback,Alert,PermissionsAndroid} from 'react-native';
import MapView, {MapPressEvent, Marker, PROVIDER_GOOGLE} from "react-native-maps";
import {ImagePickerResponse, ImageLibraryOptions, CameraOptions, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import auth from "@react-native-firebase/auth";
import {styles} from "../styles/SubmissionStyles";
import {requestCameraPermission, requestLibraryPermission} from '../utils/Permissions';
import {getAddressFromLocation, getLocation, isWithinVentspilsBorder} from "../utils/Locations";
interface ILocation {
    latitude: number;
    longitude: number;
}
function SubmissionScreen({ navigation }: { navigation: any }) {
    const [description, setDescription] = useState<string>('');
    const [picture, setPicture] = useState<string | undefined>('');
    const [status, setStatus] = useState<string>('PENDING');
    const [address, setAddress] = useState<string | null>('');
    const [selectedLocation, setSelectedLocation] = useState<ILocation>({
        latitude: 57.39485,
        longitude: 21.56121,
    });
    const [userLocation, setUserLocation] = useState<ILocation>({
        latitude: 0,
        longitude: 0,
    });
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [isLocationSelected, setIsLocationSelected] = useState(false);

    const handleSelectLocation = (event: MapPressEvent) => {
        const result = isWithinVentspilsBorder(event.nativeEvent.coordinate.latitude, event.nativeEvent.coordinate.longitude);
       if(result) {
            setSelectedLocation({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
            });
            setIsLocationSelected(true);
        } else {
            Alert.alert("Selected coordinate is out of Bounds")
        }
    };

    useEffect(() => {
        getAddressFromLocation(selectedLocation)
            .then((address) => {
                setAddress(address);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedLocation]);

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

    const takePicture = async () => {
        try {
            const permission = await requestCameraPermission();
            if(permission === PermissionsAndroid.RESULTS.GRANTED) {
                const options = {
                    mediaType: 'photo',
                    includeBase64: true
                };

                await launchCamera(options as CameraOptions, (response: ImagePickerResponse) => {
                    if (response.assets && response.assets.length > 0) {
                        setPicture(response.assets[0].base64 || undefined);
                    } else if (response.errorMessage) {
                        Alert.alert("Camera problem", "Please try again");
                    }
                });
            }else {
                Alert.alert("Permission not granted");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const selectPicture = async () => {
        try {
            const permission = await requestLibraryPermission();
            if(permission === PermissionsAndroid.RESULTS.GRANTED) {
                const options: ImageLibraryOptions = {
                    selectionLimit: 1,
                    mediaType: 'photo',
                    includeBase64: true
                };

                await launchImageLibrary(options, (response: ImagePickerResponse) => {
                    if (response.assets?.length && response.assets[0].base64) {
                        setPicture(response.assets[0].base64);
                    } else if (response.errorMessage) {
                        Alert.alert("Gallery problem", "Please try again");
                    }
                });
            }else {
                Alert.alert("Permission not granted");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const submitSubmission = async () => {
        const currentUser = auth().currentUser;
        if (currentUser !== null) {
            const email = currentUser.email;
            try {
                if (description.length < 20 && description.trim().length === 0) {
                    Alert.alert('Error', 'Description must have at least 20 characters.');
                    return;
                }
                if(!isLocationSelected) {
                    Alert.alert('Error', 'Please place the crime location on the map');
                    return;
                }
                const submission = {
                    description,
                    latitude: selectedLocation.latitude,
                    longitude: selectedLocation.longitude,
                    picture,
                    submissionDate: new Date(),
                    status,
                };
                await axios.post(`http://IPv4 Address:8080/api/submissions?email=${email}`,  submission);
                navigation.navigate("Home");
           } catch (error:any) {
               console.error(error);
           }
        }
    };


    const showImage = () => {
        if (!picture) {
            Alert.alert('Error', 'Please take or select a picture first.');
        } else {
            setIsImageModalVisible(true);
        }
    };

    const closeImage = () => {
        setIsImageModalVisible(false);
    };

    return (
        <KeyboardAwareScrollView>
        <View>
            <MapView
                style={{ height: 300, width: '100%' }}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 57.39485,
                    longitude: 21.56121,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.09,
                }}
                onPress={handleSelectLocation}
            >
                {isLocationSelected && <Marker coordinate={selectedLocation} pinColor={"red"} />}
                <Marker coordinate={userLocation} pinColor={"green"} />
            </MapView>
            <View style={{ margin: 10 }}>
                {isLocationSelected &&  <Text style={styles.locationText}>Selected Location: {address}</Text>}

                <Text>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                />
                <View style={styles.buttonContainer}>
                    <Button
                        title="Take Picture"
                        onPress={takePicture}
                    />
                    <Text style={styles.orText}>OR</Text>
                    <Button
                        title="Select Picture"
                        onPress={selectPicture}
                    />
                </View>
                <View style={{marginVertical: 15}}>
                    <Button title="Show Image" onPress={showImage}/>
                </View>
                <View style={styles.centerButtonContainer}>
                    <Button title="Submit" onPress={submitSubmission} />
                </View>
                <Modal visible={isImageModalVisible} transparent>
                    <TouchableWithoutFeedback onPress={closeImage}>
                        <View style={styles.imageModal}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${picture}` }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </View>
        </KeyboardAwareScrollView>
    );
}

export default SubmissionScreen;