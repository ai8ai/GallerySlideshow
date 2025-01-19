import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import { fadeAnimation } from '@/components/animations';

interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const fadeAnim = new Animated.Value(1);
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const rotateAnimRef = useRef(new Animated.Value(0)).current;
    const slideAnimRef = useRef(new Animated.Value(0)).current;

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


        const interval = setInterval(() => {
            const newIndex = Math.floor(Math.random() * images.length);
            const randomAnimation = Math.random() > 0.5 ? 'fade' : 'scale';

            if (randomAnimation === 'fade') {
                Animated.timing(fadeAnim, {
                    toValue: 0.5, // Fade out the current image
                    duration: 1500, // Smooth fade-out duration
                    useNativeDriver: true,
                }).start(() => {
                    setCurrentIndex(newIndex); // Update the image
                    Animated.timing(fadeAnim, {
                        toValue: 1, // Fade in the new image
                        duration: 3500, // Smooth fade-in duration
                        useNativeDriver: true,
                    }).start();
                });
            } else {
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.05,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]).start(() => {
                    setCurrentIndex(newIndex);
                });
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [album, images.length]);

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#000" />;
    }

    return (
        <View style={styles.container}>
            {images.length > 0 && (
                <Animated.Image
                    source={{ uri: images[currentIndex] }}
                    style={[
                        styles.image,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },


    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', //contain
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default AlbumSlideshow;
