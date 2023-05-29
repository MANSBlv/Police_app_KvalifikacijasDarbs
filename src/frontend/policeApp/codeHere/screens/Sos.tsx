import React, {useState} from 'react';
import {View, TouchableOpacity, Text, Alert, Linking} from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import auth from "@react-native-firebase/auth";
import axios from "axios";
import { styles } from "../styles/SosStyles";

const Sos = ({ navigation }: { navigation: any }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [canMakePhoneCall, setCanMakePhoneCall] = useState(true);

    const phoneCall = (number: string) => {
        savePhoneCall(number);
    };

    const savePhoneCall = async (number: string) => {
        const user = auth().currentUser;
        if (user !== null) {
            const userEmail = await user.email;
            axios.post('http://IPv4 Address:8080/api/phone-call', {
                    user: userEmail,
                    phoneNumber: number,
                })
                .then((response) => {
                    if (response.data === true) {
                        setPhoneNumber(number);
                        const phoneUrl = `tel:${number}`;
                        Linking.openURL(phoneUrl);
                    } else {
                        setCanMakePhoneCall(false);
                        Alert.alert('Cannot make phone call. Please wait for cooldown period to end.');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.gridItem, { zIndex: 5, position: 'absolute', top: 100, left: 130 }]}
                onPress={() => {
                    phoneCall('28680808');
                }}>
                <CommunityIcon name="police-badge" size={60} color="#900" />
                <Text style={styles.gridText}>Police</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.gridItem, { zIndex: 0, position: 'relative' }]}
                onPress={() => {
                    phoneCall('112');
                }}>
                <Icon name="fire-extinguisher" size={60} color="#900" />
                <Text style={styles.gridText}>Fireman</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.gridItem, { zIndex: 0, position: 'relative' }]}
                onPress={() => {
                    phoneCall('113');
                }}>
                <Icon name="hospital-o" size={60} color="#900" />
                <Text style={styles.gridText}>Medic</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Sos;
