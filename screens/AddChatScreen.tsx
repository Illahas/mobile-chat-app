import React, { useLayoutEffect, useState } from 'react'
import { NativeSyntheticEvent, StyleSheet, Text, TextInputChangeEventData, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { db, firestore } from '../firebase';

const AddChatScreen = ({navigation}: any) => {

    const [chatName, setChatName] = useState("");

    const createChat = async () => {
        await firestore.setDoc(firestore.doc(db,'chats', chatName), {
            name: chatName
        })
        .then(() => navigation.goBack())
        .catch((error) => alert(error));
    }

    return (
        <View>
            <Input 
                placeholder="Enter a chat name"
                value={chatName}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => setChatName(e.nativeEvent.text)}
                onSubmitEditing={createChat}
            />

            <Button title="Create" onPress={() => createChat()} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({})
