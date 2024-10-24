import { View, Text, TextInput, SafeAreaView, Button, StyleSheet  } from 'react-native'
import { addDoc, collection, Firestore, MESSAGES, serverTimestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { firestore } from '../firebase/Config';

export default function addTask() {
    const [newTask, setNewTask] = useState('');

    const save = async () => {
        const docRef = await addDoc(collection(firestore, MESSAGES), {
            text: newTask,
            created: serverTimestamp()
        }). catch (error => console.log(error));
        setNewTask('')
        console.log('Task save') 
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.from}>
            <TextInput
                placeholder='Add new item....'
                value={newTask}
                onChangeText={text => setNewTask(text)}
                style={styles.input}
            />
            <Button title="Save" onPress={save} /> 
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8
  }, 
  from: {
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
});
