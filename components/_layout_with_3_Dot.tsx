import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuAction = 'home' | 'delete' | 'quit';

export default function RootLayout() {
    const handleMenuAction = (action: MenuAction) => {
        switch (action) {
            case 'home':
                Alert.alert('Navigation', 'Back to Home');
                break;
            case 'delete':
                Alert.alert('Action', 'Delete clicked');
                break;
            case 'quit':
                Alert.alert('Action', 'Quit clicked');
                break;
            default:
                break;
        }
    };

    const renderHomeMenu = () => (
        <TouchableOpacity
            onPressIn={() => {
                Alert.alert('Menu', 'Choose an action:', [
                    { text: 'Back to Home', onPress: () => handleMenuAction('home') },
                    { text: 'Delete', onPress: () => handleMenuAction('delete') },
                    { text: 'Quit', onPress: () => handleMenuAction('quit') },
                    { text: 'Cancel', style: 'cancel' },
                ]);
            }}
            style={styles.menuButton}
        >
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
    );

    const renderSSMenu = () => (
        <TouchableOpacity
            onPressIn={() => {
                Alert.alert('Menu', 'Choose an action:', [
                    { text: 'Back to Home1', onPress: () => handleMenuAction('home') },
                    { text: 'Delete1', onPress: () => handleMenuAction('delete') },
                    { text: 'Quit1', onPress: () => handleMenuAction('quit') },
                    { text: 'Cancel1', style: 'cancel' },
                ]);
            }}
            style={styles.menuButton}
        >
            <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
    );

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{
                    title: 'click album to slideshow',
                    headerRight: renderHomeMenu,
                }} />
                <Stack.Screen name="about" options={{
                    title: '3 seconds per photo',
                    headerRight: renderSSMenu,
                }} />
            </Stack>
            <StatusBar style="light" translucent />
        </>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        marginRight: 10,
    },
});
