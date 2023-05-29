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
    deleteSwipe: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    boldFont: {
        fontWeight: 'bold'
    },
});