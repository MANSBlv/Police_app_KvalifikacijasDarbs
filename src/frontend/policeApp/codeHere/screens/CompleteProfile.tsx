import React from 'react';
import {View} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from "axios";
import auth from "@react-native-firebase/auth";
import { TextInput, Button } from 'react-native-paper';
import {UserForm} from "../models/UserForm";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import { styles } from "../styles/CompleteProfileStyles";

type FormData = {
    firstName: string;
    lastName: string;
    mobileNumber: string;
};

function CompleteProfile({navigation}: {navigation: any}) {
    const { control, handleSubmit } = useForm<FormData>();

    const submitProfile = async (data: FormData) => {
        const user = auth().currentUser;
        if (user !== null) {
            const userEmail = await user.email;
            const completeUser: UserForm = {
                name: data.firstName,
                surname: data.lastName,
                phoneNr: data.mobileNumber,
                email: userEmail
            };
            try {
                await axios.put('http://IPv4 Address:8080/api/user/profile/complete', {
                    user: completeUser
                });
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <KeyboardAwareScrollView>
        <View style={styles.container}>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="First Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                    />
                )}
                name="firstName"
                rules={{ required: true }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Last Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                    />
                )}
                name="lastName"
                rules={{ required: true }}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        label="Mobile Number"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={styles.input}
                    />
                )}
                name="mobileNumber"
                rules={{ required: true }}
            />
            <Button mode="contained" onPress={handleSubmit(submitProfile)} style={styles.button}>
                Save Profile
            </Button>
        </View>
            </KeyboardAwareScrollView>
    );
}
export default CompleteProfile;