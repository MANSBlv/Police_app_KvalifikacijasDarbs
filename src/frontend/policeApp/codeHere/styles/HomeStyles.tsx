import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sidebarToggle: {
        position: 'absolute',
        top: -8,
        left: 10,
        zIndex: 1,
        padding: 10,
        borderRadius: 5,
    },
    sidebarToggleText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: '80%',
        height: '100%',
        backgroundColor: '#fff',
        padding: 20,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    sidebarOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    sidebarOptionText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mainContent: {
        padding: 20,
        marginTop: 90,
    },
    grid:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    gridItem: {
        flex: 1,
        height: 150,
        margin: 10,
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