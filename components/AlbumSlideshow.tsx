import styles from '@/styles/styles'
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Animated, Pressable, } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { AnimationType, getAnimationStyle } from '@/utils/animationStyles';
import ImageOptionsModal from '@/components/ImageOptionsModal';

import useScaleAnimation from '@/hooks/useAnimations';
import useFetchImages from '@/hooks/useFetchImages';
import useInterval from '@/hooks/useInterval';
import useModalActions from '@/hooks/useModalActions';

interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Scale);

    const { scaleAnim, animateImageChange } = useScaleAnimation();
    const { images, setImages, loading } = useFetchImages(album);
    const { savedIntervalValue, handleIntervalChange } = useInterval();
    const { modalVisible, setModalVisible, isIntervalInputVisible, setIsIntervalInputVisible, modalOptions, } = useModalActions(images, currentIndex, setImages);

    useEffect(() => {
        if (images.length > 0 && !firstImageLoaded) {
            setFirstImageLoaded(true);
            const animationTypes = Object.values(AnimationType);
            const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
            setAnimationType(randomAnimation);
            animateImageChange(() => setCurrentIndex(0));
        }
    }, [images, firstImageLoaded, animateImageChange]);

    useEffect(() => {
        if (firstImageLoaded) {
            const intervalDuration = parseInt(savedIntervalValue || '5000', 10); // Fallback in case savedIntervalValue is undefined
            const interval = setInterval(() => {
                const newIndex = Math.floor(Math.random() * images.length);
                const animationTypes = Object.values(AnimationType);
                const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
                setAnimationType(randomAnimation);
                animateImageChange(() => setCurrentIndex(newIndex));
            }, intervalDuration);

            return () => clearInterval(interval);
        }
    }, [firstImageLoaded, images, animateImageChange]);

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#000" />;
    }

    return (
        <View style={styles.imageContainer}>
            <Animated.View style={[styles.image, getAnimationStyle(animationType, scaleAnim)]}>
                <Pressable onPress={() => setModalVisible(true)}>
                    <Animated.Image source={{ uri: images[currentIndex] }} style={styles.image} />
                </Pressable>
            </Animated.View>
            <ImageOptionsModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setIsIntervalInputVisible(false);
                }}
                isIntervalInputVisible={isIntervalInputVisible}
                savedIntervalValue={savedIntervalValue}
                handleIntervalChange={handleIntervalChange}
                modalOptions={modalOptions}
            />
        </View>
    );
};

export default AlbumSlideshow;