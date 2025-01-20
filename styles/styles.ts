import { Modal, View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

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
    // modalOption: {
    //     fontSize: 16,
    //     padding: 10,
    //     textAlign: 'center',
    // },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: screenWidth * 0.85,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 10,
    },
    optionButton: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginRight: 8,
    },
    textInput2: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        fontSize: 16,
        flex: 1,
        marginRight: 8,
    },


});

export default styles;

