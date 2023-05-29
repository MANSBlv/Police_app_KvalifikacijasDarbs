import React, { useState } from 'react';
import {View, TextInput, Button, Alert, Image, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import axios from "axios";
import backgroundImage from '../images/logo.png';
import { styles } from "../styles/RegisterStyles";
import {authErrorMessages, fieldCheck} from "../utils/Errors";
function Register({navigation}: {navigation: any}) { //not recommended type safety
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const registration = async () => {
        if(fieldCheck(email, password)) {
            try {
                await auth().createUserWithEmailAndPassword(email, password);
                const currentUser = auth().currentUser;
                if (currentUser !== null) {
                    const email = currentUser.email;
                    try {
                        await axios.post('http://IPv4 Address:8080/api/register', {
                            email: email
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                navigation.navigate('CompleteProfile');
            } catch (error: any) {
                console.log(error);
                const errorMessage = authErrorMessages(error.code);
                if (errorMessage !== "") {
                    Alert.alert(errorMessage);
                } else {
                    Alert.alert('An error occurred, please try again later.');
                }
            }
        }
    };

    const login = async () => {
        if(fieldCheck(email, password)) {
            try {
                await auth().signInWithEmailAndPassword(email, password);
                const currentUser = auth().currentUser;
                if (currentUser !== null) {
                    const email = currentUser.email;
                    const response = await axios.get(`http://IPv4 Address:8080/api/officer?email=${email}`);
                    if (response.data === true) {
                        navigation.navigate('PoliceOfficerHome');
                    } else {
                        navigation.navigate('Home');
                    }
                }

            } catch (error: any) {
                const errorMessage = authErrorMessages(error.code);
                if (errorMessage !== '') {
                    Alert.alert(errorMessage);
                } else {
                    Alert.alert('An error occurred, please try again later.');
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backgroundImage} style={styles.logo} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />
            <View style={styles.button}>
                <Button
                    title={isRegistering ? 'Register' : 'Log in'}
                    onPress={isRegistering ? registration : login}
                />
            </View>
            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.toggleText}>
                    {isRegistering ? 'Already have an account? Log in' : 'Create an account'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
export default Register;