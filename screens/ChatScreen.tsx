import React, { useLayoutEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, NativeSyntheticEvent, SafeAreaView, ScrollView, StyleSheet, Text, TextInputChangeEventData, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { Timestamp } from '@firebase/firestore'
import { auth, db, firestore } from '../firebase'
import { Avatar } from 'react-native-elements'

const ChatScreen = ({navigation, route}: any) => {

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<any>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.chatName
        })
    }, [navigation])

    useLayoutEffect(() => {
        const q = firestore.query(firestore.collection(db, 'chats', route.params.chatName, 'messages'), firestore.orderBy('timestamp', 'desc'));
        firestore.getDocs(q).then((querySnapshot) => {
            setMessages(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id, 
                    ...doc.data()
                }))
            )
        })

    }, [route])

    const sendMessage = () => {
        // Keyboard.dismiss();

        const message = firestore.collection(db, 'chats', route.params.chatName, 'messages')

        firestore.addDoc(message, {
            timestamp: Timestamp.now(),
            message: input,
            displayName: auth.currentUser?.displayName,
            email: auth.currentUser?.email,
            photoURL: auth.currentUser?.photoURL
        })
        .then(() => setInput(""));
    }

    return (

        <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
            {console.log('rerender1')}
            <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={-250}
                style={styles.container}
            >
                <>
                    <ScrollView>
                        {
                            messages.map(({id, displayName, photoURL, email, message}: any) => ( 
                                email === auth.currentUser?.email ? 
                                    <View style={styles.receiver}>
                                        <Text>{message}</Text>
                                    </View>
                                 : 
                                    <View style={styles.sender}>
                                        <View style={{display: "flex", flexDirection: "row", marginBottom: 10}}>
                                            <Avatar
                                            rounded
                                            source={{
                                                uri: photoURL
                                            }}
                                            />
                                            <Text style={{marginLeft: 15, marginRight: 20, fontSize: 16, color: "white"}}>{displayName}</Text>
                                        </View>
                                        <Text>{message}</Text>
                                    </View>
                                
                            ))
                        }
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            value={input}
                            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                                setInput(e.nativeEvent.text)
                            }}
                            style={styles.textInput} 
                            placeholder="Write your message" 
                        />
                        <TouchableOpacity 
                            onPress={sendMessage}
                            activeOpacity={0.5}
                        >
                            <Ionicons name="send" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "gray",
        borderRadius: 30,
    },
    sender: {
        padding: 15,
        backgroundColor: "#1d92ff",
        margin: 15,
        maxWidth: "80%",
        borderRadius: 90,
        borderBottomLeftRadius: 0,
        alignSelf: "flex-start",
        position: "relative"
    },
    receiver: {
        padding: 15,
        backgroundColor: "#c3c3c3",
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
        maxWidth: "80%",
        borderRadius: 90,
        borderBottomRightRadius: 0,
        alignSelf: "flex-end",
        position: "relative"
    }
})
