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

    const renderMenu = () => (
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

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{
                    title: 'Home',
                    headerRight: renderMenu,
                }} />
                <Stack.Screen name="about" options={{
                    title: 'SS',
                    headerRight: renderMenu,
                }} />
            </Stack>
            <StatusBar style="light" />
        </>
    );
}

const styles = StyleSheet.create({
    menuButton: {
        marginRight: 10,
    },
});
