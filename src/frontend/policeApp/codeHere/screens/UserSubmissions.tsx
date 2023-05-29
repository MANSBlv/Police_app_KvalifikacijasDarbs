import React, {useEffect, useState} from "react";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import {Alert, FlatList, Image, Modal, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import moment from 'moment';
import {Icon, ListItem} from 'react-native-elements';
import {Submission} from "../models/Submission";
import { Swipeable } from 'react-native-gesture-handler';
import { styles } from "../styles/UserSubmissionStyles";
import {getAddressFromLocation} from "../utils/Locations";
interface ILocation {
    latitude: number;
    longitude: number;
}
function UserSubmissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);

    useEffect(() => {
        getSubmissions();
    }, []);

    useEffect(() => {
        getStreetName();
    }, [submissions]);

    const getSubmissions = async () => {
        const currentUser = auth().currentUser;
        if (currentUser !== null) {
            const email = currentUser.email;
            try {
                const response = await axios.get(`http://IPv4 Address:8080/api/submissions/user?email=${email}`);
                if(response.data.isEmpty) {
                    ToastAndroid.show("There are no submissions at this moment!", ToastAndroid.SHORT);
                } else {
                    console.log(response.data);
                    setSubmissions(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getStreetName = async () => {
        const addressList: string[] = [];

        for (const submission of submissions) {
            try {
                const location: ILocation = {
                    latitude: submission.latitude,
                    longitude: submission.longitude,
                };
                const street = await getAddressFromLocation(location);
                if(street !== null) {
                    addressList.push(street);
                }
            } catch (error) {
                console.log(error);
            }
        }

        setAddresses(addressList);
    };

    const deleteSubmission = async (index: number) => {
        const allSubmissions = [...submissions];
        try {
            const currentUser = auth().currentUser;
            if (currentUser !== null) {
                const email = currentUser.email;
                await axios.put(`http://IPv4 Address:8080/api/submissions/delete?email=${email}`, allSubmissions[index]);
                allSubmissions[index].isDeleted = true;
                setSubmissions(allSubmissions);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rightSwipeDelete = (index: number) => {
        const handleDeleteAction = () => {
            deleteSubmission(index);
        };
        return (
            <TouchableOpacity style={styles.deleteSwipe} onPress={handleDeleteAction}>
                <Text style={{ color: 'white' }}>Delete</Text>
            </TouchableOpacity>
        );
    };
    const openImage = (index: number) => {
        const submission = submissions[index];

        if (submission.picture) {
            setIsImageModalVisible(true);
        } else {
            Alert.alert("No Image", "The selected submission does not have an image.");
        }
    };


    const closeImage = () => {
        setIsImageModalVisible(false);
    };
    const renderUserSubmissions = ({ item, index }: { item: Submission, index: number }) => {
        if (item.isDeleted) {
            return null;
        }
        return (
            <Swipeable renderRightActions={(progress) => rightSwipeDelete(index)}>
                <ListItem containerStyle={{ borderRadius: 10 }}>
                    <ListItem.Content>
                        <ListItem.Title>{moment(item.submissionDate).format('DD/MM/YYYY')}</ListItem.Title>
                        <ListItem.Subtitle>
                            <Text style={styles.boldFont}>Description: </Text>
                            {item.description}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <Text style={styles.boldFont}>Address: </Text>
                            {addresses[index]}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <Text style={styles.boldFont}>Status: </Text>
                            {item.status}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon name='picture-o' type='font-awesome' onPress={() => openImage(index)} />
                </ListItem>
                <Modal visible={isImageModalVisible} transparent>
                    <TouchableWithoutFeedback onPress={closeImage}>
                        <View style={styles.imageModal}>
                            <Image
                                source={{ uri: `data:image/jpeg;base64,${item.picture}` }}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </Swipeable>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {submissions.length > 0 ? (
                <FlatList
                    data={submissions}
                    renderItem={renderUserSubmissions}
                    keyExtractor={(item) => item.submissionId.toString()}
                />
            ) : (
                <Text>No submissions found.</Text>
            )}
        </View>
    );
}

export default UserSubmissions;