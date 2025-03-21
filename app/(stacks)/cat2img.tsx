import { View, Text, Image, Animated, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ToastAndroid, Platform } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from '@/config/styles';

export default function SlideshowScreen() {
    const navigation = useNavigation();
    const parentNavi = navigation.getParent();

    const params = useLocalSearchParams();
    const album = JSON.parse(params.selectedAlbum as string);

    const [images, setImages] = useState<string[]>([]);
    const [currentImage, setCurrentImage] = useState(0);
    const [isAutoSlideshow, setIsAutoSlideshow] = useState(false);
    const [hasPermission, setHasPermission] = useState(false);
    const [resizeMode, setResizeMode] = useState<'cover' | 'contain'>('cover');

    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        console.log("Current Image:", images[currentImage]);
    }, [currentImage]);
    // Fetch image list dynamically from GitHub API


    useEffect(() => {
        if (images.length > 0) {
            getResizeMode(images[currentImage], (mode) => {
                setResizeMode(mode);
            });

            const nextIndex = (currentImage + 1) % images.length;
            Image.prefetch(images[nextIndex]); // Preload next image
        }
    }, [currentImage]);


    useEffect(() => {
        const fetchImageList = async () => {
            try {
                const assets = await MediaLibrary.getAssetsAsync({
                    album,
                    mediaType: MediaLibrary.MediaType.photo,
                });
                setImages(assets.assets.map((asset) => asset.uri));
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImageList();
    }, [album]);


    // Manual navigation
    const goToNextImage = () => { setCurrentImage((prev) => (prev + 1) % images.length); };
    const goToPrevImage = () => { setCurrentImage((prev) => (prev - 1 + images.length) % images.length); };

    // Auto slideshow
    const startAutoSlideshow = () => {
        setIsAutoSlideshow(true);
        intervalRef.current = window.setInterval(() => {
            goToNextImage();
        }, 3000);
    };

    const stopAutoSlideshow = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsAutoSlideshow(false);
    };

    const getResizeMode = (imageUrl: string, callback: (mode: "cover" | "contain") => void) => {
        Image.getSize(imageUrl, (width, height) => {
            const aspectRatio = height / width;
            console.log(aspectRatio.toFixed(2))

            // Decide resizeMode based on aspect ratio
            const mode = aspectRatio > 1.4 ? "cover" : "contain";
            callback(mode);
        }, (error) => {
            console.error("Failed to get image size:", error);
            callback("cover");  // Default to "cover" if error occurs
        });
    };


    // Scale animation for toggle
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const toggleSlideshow = () => {
        if (isAutoSlideshow) {
            stopAutoSlideshow();
            Animated.timing(scaleAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
        } else {
            Animated.timing(scaleAnim, { toValue: 0.3, duration: 2500, useNativeDriver: true }).start(() => {
                startAutoSlideshow();
                Animated.timing(scaleAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
            });
        }
    };

    useEffect(() => {
        // Hide Drawer header
        if (parentNavi) {
            parentNavi.setOptions({ headerShown: false });
        }
        return () => {
            if (parentNavi) {
                parentNavi.setOptions({ headerShown: true });
            }
        };
    }, [parentNavi]);


    // Toast message
    const showToast = (message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            Alert.alert("Notification", message);
        }
    };

    if (images.length === 0) {

        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.sliderContainer}>
            <TouchableOpacity onPress={toggleSlideshow} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                    <Image source={{ uri: images[currentImage] }} style={[styles.sliderImage, { resizeMode }]} />
                </Animated.View>
            </TouchableOpacity>

            {!isAutoSlideshow && (
                <View style={styles.sliderNavigation}>
                    <TouchableOpacity onPress={goToPrevImage} style={styles.sliderNavButton}>
                        <Text style={styles.sliderNavText}>←</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToNextImage} style={styles.sliderNavButton}>
                        <Text style={styles.sliderNavText}>→</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}
