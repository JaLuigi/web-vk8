import { View, Text, TextInput, SafeAreaView, Button, StyleSheet, ScrollView } from 'react-native';
import { addDoc, collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { firestore, MESSAGES } from '../firebase/Config';

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
            <View style={styles.header}>
                <TextInput
                    placeholder="Add new item..."
                    value={newBuy} 
                    onChangeText={(text) => setNewBuy(text)}
                    style={styles.input}
                />
                <Button title="Save" onPress={save} />
            </View>
            <ScrollView>
                {
                    newTask.map((task) => (
                        <View key={task.id} style={styles.message}>
                            <Text>{task.text}</Text>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 8
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 16,
        marginBottom: 16,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
        marginRight: 8,
    },
    message: {
        margin: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    }
});
