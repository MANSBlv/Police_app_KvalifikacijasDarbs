import {Alert} from "react-native";

export const authErrorMessages = (authCode: any) => {
    console.log(authCode);
    switch (authCode) {
        case "auth/wrong-password":
            return "Password provided is not correct";
        case "auth/invalid-email":
            return "Email provided is invalid";
        case "auth/email-already-in-use":
            return "Email address already in use!";
        case "auth/user-not-found":
            return "User does not exist";
        default:
            return "";
    }
};

export const fieldCheck = (email:string, password:string) : boolean => {
    if(email === null || email.trim().length === 0) {
        Alert.alert("Invalid email", "Please provide an email");
        return false;
    }
    if(password === null || password.trim().length === 0) {
        Alert.alert("Invalid password", "Please provide a passport");
        return false;
    }
    return true;
}