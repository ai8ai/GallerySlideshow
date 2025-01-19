import { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { AnimationType } from '@/utils/animationStyles';

const useImageAnimation = () => {
    const [scaleAnim] = useState(new Animated.Value(1));
    const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Scale);

    const animateImageChange = (callback: () => void) => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(callback);
    };

    const randomizeAnimationType = () => {
        const animationTypes = Object.values(AnimationType);
        const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
        setAnimationType(randomAnimation);
    };

    return { scaleAnim, animationType, animateImageChange, randomizeAnimationType };
};

export default useImageAnimation;
