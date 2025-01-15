import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Text, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import AlbumSlideshow from '@/components/AlbumSlideshow';

// Define the extended Album type
interface AlbumWithCover extends MediaLibrary.Album {
    cover: string | null;
}

export default function GalleryAlbums() {
    const [albums, setAlbums] = useState<AlbumWithCover[]>([]); // Explicitly use AlbumWithCover[]
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [selectedAlbum, setSelectedAlbum] = useState<AlbumWithCover | null>(null);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                await fetchAlbums();
            } else {
                Alert.alert('Permission Denied', 'We need access to your gallery to show albums.');
            }
        };

        const fetchAlbums = async () => {
            const albumsList = await MediaLibrary.getAlbumsAsync();
            const albumsWithCovers: AlbumWithCover[] = await Promise.all(
                albumsList.map(async (album) => {
                    const assets = await MediaLibrary.getAssetsAsync({
                        album: album,
                        first: 1,
                        mediaType: MediaLibrary.MediaType.photo,
                    });
                    return {
                        ...album,
                        cover: assets.assets[0]?.uri || null, // Get first image URI or null
                    };
                })
            );
            setAlbums(albumsWithCovers); // Update state with the correct type
        };

        getPermissions();
    }, []);

    const handleAlbumPress = (album: AlbumWithCover) => {
        setSelectedAlbum(album);
    };

    const renderAlbum = ({ item }: { item: AlbumWithCover }) => (
        <TouchableOpacity style={styles.albumContainer} onPress={() => handleAlbumPress(item)}>
            <Image
                source={item.cover ? { uri: item.cover } : require('@/assets/images/placeholder.png')}
                style={styles.albumCover}
            />
            <Text style={styles.albumTitle} numberOfLines={1}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    if (selectedAlbum) {
        return <AlbumSlideshow album={selectedAlbum} />;
    }

    return (
        <View style={styles.container}>
            {permissionGranted ? (
                <FlatList
                    data={albums}
                    keyExtractor={(item) => item.id}
                    renderItem={renderAlbum}
                    numColumns={2}
                    contentContainerStyle={styles.grid}
                />
            ) : (
                <Text style={styles.permissionText}>Permission required to access media library.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 10,
    },
    grid: {
        justifyContent: 'space-between',
    },
    albumContainer: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 2,
    },
    albumCover: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    albumTitle: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    permissionText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginTop: 20,
    },
});
