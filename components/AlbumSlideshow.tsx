import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import useScaleAnimation from '@/hooks/useAnimations';

interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [firstImageLoaded, setFirstImageLoaded] = useState(false);  // Track if the first image is set
    const { scaleAnim, animateImageChange } = useScaleAnimation();

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
            animateImageChange(() => setCurrentIndex(0)); // Set the first image immediately
        }
    }, [images, firstImageLoaded, animateImageChange]);

    useEffect(() => {
        if (firstImageLoaded) {
            const interval = setInterval(() => {
                const newIndex = Math.floor(Math.random() * images.length);
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
                        {
                            opacity: scaleAnim,
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
        resizeMode: 'cover',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default AlbumSlideshow;
