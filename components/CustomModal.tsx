import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

// interface CustomModalProps {
//     visible: boolean; // Determines whether the modal is visible
//     onClose: () => void; // Callback for closing the modal
//     message: string; // Message to display in the modal
// }

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    options: { label: string; onPress: () => void }[];
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, options  }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={styles.optionButton}
                            onPress={option.onPress}
                        >
                            <Text style={styles.optionText}>{option.label}</Text>
                        </Pressable>
                    ))}
                    <Pressable style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 250,
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
