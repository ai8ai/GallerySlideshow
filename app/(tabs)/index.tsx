import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function GalleryAlbums() {
    const [albums, setAlbums] = useState<MediaLibrary.Album[]>([]);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                setPermissionGranted(true);
                fetchAlbums();
            } else {
                Alert.alert('Permission Denied', 'We need access to your gallery to show albums.');
            }
        };

        getPermissions();
    }, []);

    const fetchAlbums = async () => {
        const albumsList = await MediaLibrary.getAlbumsAsync();
        setAlbums(albumsList);
    };

    const handleAlbumPress = async (album: MediaLibrary.Album) => {
        const assets = await MediaLibrary.getAssetsAsync({
            album: album,
            mediaType: 'photo',
        });
        console.log('Assets in Album:', assets.assets);
        Alert.alert('Album Selected', `You selected "${album.title}"`);
    };

    if (!permissionGranted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Requesting permissions...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={albums}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.albumContainer}
                        onPress={() => handleAlbumPress(item)}
                    >
                        <Text style={styles.albumText}>{item.title}</Text>
                        <Text style={styles.albumText}>Photos: {item.assetCount}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No albums found in your gallery.</Text>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {        flex: 1,        backgroundColor: '#25292e',        alignItems: 'center',        justifyContent: 'center',        padding: 20,    },
    albumContainer: {        padding: 15,        marginBottom: 10,        backgroundColor: '#3b3f47',        borderRadius: 10,        width: '100%',    },
    albumText: {        color: '#fff',        fontSize: 16,    },
    emptyText: {        color: '#bbb',        fontSize: 16,        marginTop: 20,    },
    permissionText: {        color: '#fff',        fontSize: 18,        textAlign: 'center',    },
});