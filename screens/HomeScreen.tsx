import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import { ScrollView } from 'react-native-gesture-handler';
import CustomListItem from '../components/CustomListItem';
import { signOut } from 'firebase/auth';
import { auth, db, firestore } from '../firebase';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({navigation}: any) => {

    const isFocused = useIsFocused();
    const [chats, setChats] = useState<any[]>([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Home",
            headerStyle: {
                backgroundColor: "#02010e"
            },
            headerTintColor: "#d3d3d3",
            headerLeft: () => (
                <View style={{marginLeft: 30}}> 
                    <TouchableOpacity onPress={() => { 
                        signOut(auth)
                            .then(() => navigation.replace('Login'));  
                    }} activeOpacity={0.5}>
                        <Avatar
                            rounded
                            source={{
                                uri: auth?.currentUser?.photoURL || undefined
                            }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{marginRight: 30}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AddChat');
                    }} activeOpacity={0.5}>
                        <Icon name="edit" color="#d3d3d3"/>
                    </TouchableOpacity>
                </View>
            )
        });
        getChats();
    }, [])

    useEffect((): any => {
        if(isFocused) { 
            getChats();
        }
    }, [isFocused])

    const enterChat = (id: string, chatName: string) => {
        navigation.navigate('Chat', {
            id,
            chatName
        });
    }

    const getChats = async () => {
        let chats: any[] = []
        const q = firestore.query(firestore.collection(db, 'chats'));
        const querySnapshot = await firestore.getDocs(q);
        querySnapshot.forEach((doc) => chats.push({id: doc.id, data: doc.data()}));
    
        setChats(chats);
    }

    return (
        <SafeAreaView>
            <ScrollView>
                {
                    chats.map((chat) => (
                        <CustomListItem key={chat.id} id={chat.id} chatName={chat.data.name} enterChat={enterChat} />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
