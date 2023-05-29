import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    locationText: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    button: {
        flex: 1,
        marginHorizontal: 5,
    },
    centerButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        marginLeft: -14,
    },
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
    orText: {
        fontSize: 24,
    },
});
