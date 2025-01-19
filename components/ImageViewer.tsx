import React, { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';

const ss = useRef(new Animated.Value(0)).current;

export const fadeAnimation = (
    fadeAnim: Animated.Value,
    newIndex: number,
    setCurrentIndex: (index: number) => void
) => {
    Animated.timing(fadeAnim, {
        toValue: 0.5, // Fade out the current image
        duration: 5000, // Smooth fade-out duration
        useNativeDriver: true,
    }).start(() => {
        setCurrentIndex(newIndex); // Update the image
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade in the new image
            duration: 5500, // Smooth fade-in duration
            useNativeDriver: true,
        }).start();
    });
};


// Fade-in and fade-out animation
export const fadeAnim2 = (fadeAnim: Animated.Value, duration: number = 2500) => {
    return Animated.sequence([
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
        }),
    ]);
};

// Scale animation (zoom in/out)
export const scaleAnim2 = (scaleAnim: Animated.Value, duration: number = 3500) => {
    return Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: duration / 2,
            useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
        }),
    ]);
};



export const scaleAnim = (scaleAnim: Animated.Value, duration: number = 3500) => {
    return Animated.sequence([
        Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: duration / 2,
            useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
        }),
    ]);
};


            Animated.timing(scaleAnim, {
                toValue: 0.5, // Fade out the current image
                duration: 1500, // Smooth fade-out duration
                useNativeDriver: true,
            }).start(() => {
                setCurrentIndex(newIndex); // Update the image
                Animated.timing(scaleAnim, {
                    toValue: 1, // Fade in the new image
                    duration: 3500, // Smooth fade-in duration
                    useNativeDriver: true,
                }).start();
            });


// Slide animation (left to right)
export const slideAnim = (slideAnim: Animated.Value, duration: number = 4500) => {
    return Animated.sequence([
        Animated.timing(slideAnim, {
            toValue: -500,
            duration: duration / 2,
            useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: true,
        }),
    ]);
};

// Rotation animation (360 degrees)
export const rotateAnim = (rotateAnim: Animated.Value, duration: number = 1500) => {
    return Animated.timing(rotateAnim, {
        toValue: 1, // Rotate 360 degrees
        duration: duration,
        useNativeDriver: true,
    });
};
