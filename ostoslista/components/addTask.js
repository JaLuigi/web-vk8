import { View, Text, TextInput, SafeAreaView, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { addDoc, collection, onSnapshot, query, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore, MESSAGES } from '../firebase/Config';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddTask() {
    const [newTask, setNewTask] = useState([]);
    const [newBuy, setNewBuy] = useState('');

    const save = async () => {
        try {
            const docRef = await addDoc(collection(firestore, MESSAGES), {
                text: newBuy,
                created: serverTimestamp()
            });
            setNewBuy('');
            console.log('Task saved', docRef.id);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await deleteDoc(doc(firestore, MESSAGES, id));
            console.log('Task deleted', id);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const q = query(collection(firestore, MESSAGES));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tempMessages = [];
            querySnapshot.forEach((doc) => {
                tempMessages.push({ ...doc.data(), id: doc.id });
            });
            setNewTask(tempMessages);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>OstosLista</Text>
            <View style={styles.header}>
                <TextInput
                    placeholder="Add new item..."
                    value={newBuy}
                    onChangeText={(text) => setNewBuy(text)}
                    style={styles.input}
                />
                <Button title="Save" onPress={save} />
            </View>
            <ScrollView style={styles.scroll}>
                {newTask.map((task) => (
                    <View key={task.id} style={styles.message}>
                        <Text style={styles.messageText}>{task.text}</Text>
                        <TouchableOpacity onPress={() => deleteItem(task.id)}>
                            <Icon name="delete" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
        marginRight: 8,
    },
    scroll: {
        width: '100%',
    },
    message: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 4,
    },
    messageText: {
        flex: 1,
    },
});
