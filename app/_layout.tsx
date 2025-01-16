import React from 'react';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {

    return (
        <>
            <Stack>
                <Stack.Screen name="index" options={{
                    title: 'click album to slideshow',
                }} />
                <Stack.Screen
                    name="about"
                    options={{ headerShown: false }} // Hide the header for the "About" screen
                />
            </Stack>
            <StatusBar style="light" translucent />
        </>
    );
}

