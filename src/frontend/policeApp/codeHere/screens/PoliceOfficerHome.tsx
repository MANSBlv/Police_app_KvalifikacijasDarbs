import {
    Alert,
    FlatList,
    Image,
    Modal,
    Text,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import React, {useEffect, useState} from "react";
import {Submission} from "../models/Submission";
import auth from "@react-native-firebase/auth";
import axios from "axios";
import {Icon, ListItem} from "react-native-elements";
import moment from "moment/moment";
import { styles } from "../styles/PoliceOfficerHomeStyles";
import {getAddressFromLocation} from "../utils/Locations";
interface ILocation {
    latitude: number;
    longitude: number;
}
function PoliceOfficerHome({navigation}: {navigation: any}) {
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
            try {
                const response = await axios.get(`http://IPv4 Address:8080/api/submissions/all`);
                console.log(response.data);
                if(response.data.length === 0) {
                    ToastAndroid.show("There are no submissions at this moment!", ToastAndroid.SHORT);
                } else {
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

    const signOut = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Register');
        } catch (error) {
            console.log(error);
        }
    };

    const statusChange = async (index: number, newStatus: string) => {
        const updatedSubmissions = [...submissions];
        updatedSubmissions[index] = { ...updatedSubmissions[index], status: newStatus };
        try {
            const currentUser = auth().currentUser;
            if (currentUser !== null) {
                const email = currentUser.email;
                await axios.put(`http://IPv4 Address:8080/api/submissions/police/update?email=${email}&status=${newStatus}`, updatedSubmissions[index]);
                setSubmissions(updatedSubmissions);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderSubmittedSubmissions = ({ item, index }: { item: Submission, index: number }) => {
        return (
            <View>
                <ListItem containerStyle={{ borderRadius: 10 }}>
                    <ListItem.Content>
                        <ListItem.Title>{moment(item.submissionDate).format("DD/MM/YYYY")}</ListItem.Title>
                        <ListItem.Subtitle>
                            <Text style={{ fontWeight: "bold" }}>Description: </Text>
                            {item.description}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <Text style={{ fontWeight: "bold" }}>Address: </Text>
                            {addresses[index]}
                        </ListItem.Subtitle>
                        <ListItem.Subtitle>
                            <Text style={{ fontWeight: "bold" }}>Status: </Text>
                            {item.status}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => statusChange(index, "REVIEWED")}>
                            <View style={styles.greenCircle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => statusChange(index, "REJECTED")}>
                            <View style={styles.redCircle} />
                        </TouchableOpacity>
                    </View>
                    <Icon name="picture-o" type="font-awesome" onPress={() => openImage(index)} />
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
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {submissions.length > 0 ? (
                <FlatList
                    data={submissions}
                    renderItem={renderSubmittedSubmissions}
                    keyExtractor={(item) => item.submissionId.toString()}
                />
            ) : (
                <Text>No submissions found.</Text>
            )}
            <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
                <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>

    );
}

export default PoliceOfficerHome;