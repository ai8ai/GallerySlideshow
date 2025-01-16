import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as MediaLibrary from 'expo-media-library';


interface AlbumSlideshowProps {
    album: MediaLibrary.Album;
}

const AlbumSlideshow: React.FC<AlbumSlideshowProps> = ({ album }) => {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

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
            // setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            setCurrentIndex(() => Math.floor(Math.random() * images.length));
        }, 2000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [album, images.length]);

    if (loading) {
        return <ActivityIndicator style={styles.loading} size="large" color="#000" />;
    }

    return (
        <View style={styles.container}>
            {images.length > 0 && (
                <Image source={{ uri: images[currentIndex] }} style={styles.image} />
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
