import React, {useRef, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, DrawerLayoutAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../styles/HomeStyles";
const Home = ({navigation}: {navigation: any}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const drawerRef = useRef<DrawerLayoutAndroid>(null);

    const signOut = async () => {
        try {
            await auth().signOut();
            navigation.navigate('Register');
        } catch (error) {
            console.log(error);
        }
    };

    const renderSidebar = () => (
        <View style={styles.sidebar}>
            <TouchableOpacity style={styles.sidebarOption} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.sidebarOptionText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarOption} onPress={() => navigation.navigate('UserSubmissions')}>
                <Text style={styles.sidebarOptionText}>Submissions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarOption} onPress={() => signOut()}>
                <Text style={styles.sidebarOptionText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );

    const renderMainContent = () => (
        <View style={styles.mainContent}>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Sos')}>
                    <Icon name="phone" size={60} color="#900" />
                    <Text style={styles.gridText}>SOS Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('Submission')}>
                    <Icon name="camera" size={60} color="#900" />
                    <Text style={styles.gridText}>Create Submission</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.gridItem} onPress={() => console.log('Ask Question')}>
                    <Icon name="question" size={60} color="#900" />
                    <Text style={styles.gridText}>Ask Question</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate('PoliceStation')}>
                    <Icon name="map-marker" size={60} color="#900" />
                    <Text style={styles.gridText}>Find Nearest Police Station</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const openDrawer = () => {
        if (drawerRef.current) {
            drawerRef.current.openDrawer();
        }
    };

    return (
        <DrawerLayoutAndroid
            ref={drawerRef}
            drawerWidth={200}
            drawerPosition="left"
            renderNavigationView={renderSidebar}
            onDrawerClose={() => setIsSidebarOpen(false)}
            onDrawerOpen={() => setIsSidebarOpen(true)}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.sidebarToggle} onPress={openDrawer}>
                    <Icon name="bars" size={30} color="#900" />
                </TouchableOpacity>
                <ScrollView>{renderMainContent()}</ScrollView>
            </View>
        </DrawerLayoutAndroid>
    );
};

export default Home;
