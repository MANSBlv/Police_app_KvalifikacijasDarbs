import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    gridItem: {
        height: 150,
        width: 150,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    gridIcon: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    gridText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});