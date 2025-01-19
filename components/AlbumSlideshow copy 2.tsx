import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import useScaleAnimation from '@/hooks/useAnimations';

interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    enum AnimationType {
        Fade = 'fade',
        Scale = 'scale',
        Rotate = 'rotate',
        Slide = 'slide',
        Zoom = 'zoom',  // New Zoom type
        Bounce = 'bounce',  // New Bounce type
        Flip = 'flip',  // New Flip type
        Wobble = 'wobble'  // New Wobble type
    }

    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);  // Track if the first image is set
    const { scaleAnim, animateImageChange } = useScaleAnimation();
    const [animationType, setAnimationType] = useState<AnimationType>(AnimationType.Scale);

    // Fetch images only once the component is mounted
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const assets = await MediaLibrary.getAssetsAsync({
                    album,
                    mediaType: MediaLibrary.MediaType.photo,
                });
                setImages(assets.assets.map((asset) => asset.uri));
                setLoading(false); // Set loading to false once images are fetched
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [album]);

    // Start the image change interval only after images are loaded
    useEffect(() => {
        if (images.length > 0 && !firstImageLoaded) {
            // Only trigger the first image animation after the images are loaded
            setFirstImageLoaded(true);
            const animationTypes = Object.values(AnimationType);  // Get all enum values
            const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
            setAnimationType(randomAnimation);
            animateImageChange(() => setCurrentIndex(0)); // Set the first image immediately
        }
    }, [images, firstImageLoaded, animateImageChange]);

    useEffect(() => {
        if (firstImageLoaded) {
            const interval = setInterval(() => {
                const newIndex = Math.floor(Math.random() * images.length);
                const animationTypes = Object.values(AnimationType);  // Get all enum values
                const randomAnimation = animationTypes[Math.floor(Math.random() * animationTypes.length)];
                setAnimationType(randomAnimation);
                animateImageChange(() => setCurrentIndex(newIndex));
            }, 5000); // Change image every 5 seconds

            return () => clearInterval(interval);
        }
    }, [firstImageLoaded, images, animateImageChange]);

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
                        animationType === AnimationType.Fade
                            ? { opacity: scaleAnim } // Fade
                            : animationType === AnimationType.Scale
                                ? { transform: [{ scale: scaleAnim }] } // Scale
                                : animationType === AnimationType.Rotate
                                    ? {
                                        transform: [
                                            {
                                                rotate: scaleAnim.interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: ['0deg', '30deg']
                                                })
                                            }
                                        ] // Rotate
                                    }
                                    : animationType === AnimationType.Slide
                                        ? {
                                            transform: [
                                                {
                                                    translateX: scaleAnim.interpolate({
                                                        inputRange: [0, 1],
                                                        outputRange: [-150, 0]  // Example slide from left to right
                                                    })
                                                }
                                            ]
                                        } // Slide
                                        : animationType === AnimationType.Zoom
                                            ? {
                                                opacity: scaleAnim,
                                                transform: [{ scale: scaleAnim.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) }]  // Zoom in/out
                                            }
                                            : animationType === AnimationType.Bounce
                                                ? {
                                                    transform: [{ scale: scaleAnim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 1] }) }] // Bounce
                                                }
                                                : animationType === AnimationType.Flip
                                                    ? {
                                                        transform: [
                                                            {
                                                                rotateY: scaleAnim.interpolate({
                                                                    inputRange: [0, 1],
                                                                    outputRange: ['0deg', '180deg'] // Flip effect
                                                                })
                                                            }
                                                        ]
                                                    }
                                                    : animationType === AnimationType.Wobble
                                                        ? {
                                                            transform: [
                                                                {
                                                                    translateX: scaleAnim.interpolate({
                                                                        inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                                                        outputRange: [0, -15, 15, -15, 15, 0]  // Shake effect
                                                                    })
                                                                }
                                                            ]
                                                        }
                                                        : null,  // Default to null if no match
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
        resizeMode: 'cover',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default AlbumSlideshow;
