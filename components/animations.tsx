import { Animated } from 'react-native';

// Fade-in and fade-out animation
export const fadeInOut = (fadeAnim: Animated.Value, duration: number = 2500) => {
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
