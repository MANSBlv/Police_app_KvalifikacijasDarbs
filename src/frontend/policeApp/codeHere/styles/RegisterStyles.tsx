import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logo: {
        position: 'absolute',
        top: -50,
        width: 450,
        height: 450,
    },
    inputContainer: {
        position: 'absolute',
        top: 350,
        alignItems: 'center',
    },
    input: {
        top: 45,
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        padding: 10,
        backgroundColor: '#fff',
    },
    button: {
        top: 40,
    },
    toggleText: {
        marginTop: 50,
        marginBottom: -55,
        color: 'gray',
        fontSize: 14,
        margin: 12
    },
});