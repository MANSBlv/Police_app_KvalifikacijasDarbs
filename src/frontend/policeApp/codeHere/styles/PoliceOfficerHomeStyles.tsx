import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    imageModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: '100%',
        aspectRatio: 1,
    },
    greenCircle: {
        backgroundColor: "green",
        width: 20,
        height: 20,
        borderRadius: 10
    },
    redCircle: {
        backgroundColor: "red",
        width: 20,
        height: 20,
        borderRadius: 10,
        marginLeft: 10
    },
    signOutButton: {
        alignSelf: 'center',
        marginTop: 16,
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: 'red',
        borderRadius: 8,
        position: 'absolute',
        bottom: 16,
        left: 150,
    },
    signOutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});