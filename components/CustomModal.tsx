import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    options?: { label: string; onPress: () => void }[];
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
                        options?.map((option, index) => {
                            switch (index) {
                                case 0: // Treat modalOptions[0] as a TextInput with labels
                                    return (
                                        <View key={index} style={styles.inputRow}>
                                            <Text style={styles.label}>Interval:</Text>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder={option.label}
                                                value={option.value} // Controlled value for TextInput
                                                onChangeText={option.onInputChange} // Handle text changes
                                                keyboardType="numeric" // Optional: Use numeric keyboard
                                            />
                                            <Text style={styles.label}>seconds</Text>
                                        </View>
                                    );
                                case 1: // Treat modalOptions[1] as a button
                                case 2: // Treat modalOptions[2] as a button
                                default:
                                    return (
                                        <Pressable
                                            key={index}
                                            style={styles.optionButton}
                                            onPress={option.onPress}
                                        >
                                            <Text style={styles.optionText}>{option.label}</Text>
                                        </Pressable>
                                    );
                            }
                        })
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
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
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

export default CustomModal;
