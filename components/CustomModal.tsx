import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet,Dimensions } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    options: { label: string; onPress: () => void }[];
    children?: React.ReactNode;
}

const screenWidth = Dimensions.get('window').width;

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, options, children }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children ? (
                        children // Render the children if provided
                    ) : (
                        options.map((option, index) => (
                            <Pressable
                                key={index}
                                style={styles.optionButton}
                                onPress={option.onPress}
                            >
                                <Text style={styles.optionText}>{option.label}</Text>
                            </Pressable>
                        ))
                    )}
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: screenWidth*0.75 ,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    optionButton: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    optionText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
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
});

export default CustomModal;
