import React, { useEffect, useState } from 'react';
import { View, Modal, Text, TextInput, StyleSheet, ActivityIndicator, Animated, Pressable, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as MediaLibrary from 'expo-media-library';

import { AnimationType, getAnimationStyle } from '@/utils/animationStyles'; // Import the animation module
import useScaleAnimation from '@/hooks/useAnimations';
import CustomModal from '@/components/CustomModal';

const DEFAULT_INTERVAL = 5000;

interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);
    const { scaleAnim, animateImageChange } = useScaleAnimation();
    const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Scale);
    const [modalVisible, setModalVisible] = useState(false);
    const [isIntervalInputVisible, setIsIntervalInputVisible] = useState(false);

    const [savedIntervalTime, setSavedIntervalTime] = useState<number | null>(null);

    const getIntervalTime = async () => {
        try {
            const storedTime = await AsyncStorage.getItem('intervalTime');
            return storedTime ? parseInt(storedTime, 10) : null;
        } catch (error) {
            console.error('Failed to retrieve interval time:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchIntervalTime = async () => {
            const savedTime = await getIntervalTime();
            if (savedTime) {
                setIntervalTime(savedTime);
            }
        };
        fetchIntervalTime();
    }, []);


    const handleDeleteImage = () => {
        const updatedImages = [...images];
        updatedImages.splice(currentIndex, 1);
        setImages(updatedImages);
        setModalVisible(false);
    };

    const handleChangeInterval = () => {
        setIsIntervalInputVisible(true); // Show the text input
    };

    const handleHelp = () => {
        console.log('Help clicked');
        setModalVisible(false);
    };
    const modalOptions = [
        { label: 'Change Interval', onPress: handleChangeInterval },
        { label: 'Delete Current Image', onPress: handleDeleteImage },
        { label: 'Help', onPress: handleHelp },
    ];

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const assets = await MediaLibrary.getAssetsAsync({
                    album,
                    mediaType: MediaLibrary.MediaType.photo,
                });
                setImages(assets.assets.map((asset) => asset.uri));
                setLoading(false);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [album]);

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
            const interval = setInterval(() => {
                const newIndex = Math.floor(Math.random() * images.length);
                const animationTypes = Object.values(AnimationType);
                const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
                setAnimationType(randomAnimation);
                animateImageChange(() => setCurrentIndex(newIndex));
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [firstImageLoaded, images, animateImageChange]);

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#000" />;
    }

    return (
        <View style={styles.imageContainer}>
            <Animated.View
                style={[styles.image, getAnimationStyle(animationType, scaleAnim)]}
            >
                <Pressable onPress={() => setModalVisible(true)}>
                    <Animated.Image
                        source={{ uri: images[currentIndex] }}
                        style={styles.image}
                    />
                </Pressable>
            </Animated.View>
            <CustomModal
                visible={modalVisible}
                onClose={() => {
                    setModalVisible(false);
                    setIsIntervalInputVisible(false); // Reset input visibility when closing
                }}
                options={!isIntervalInputVisible ? modalOptions : []} // Hide default options when input is active
            >
                {isIntervalInputVisible && (
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter Interval (ms)"
                        keyboardType="numeric"
                    />
                )}
            </CustomModal>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
});

export default AlbumSlideshow;
