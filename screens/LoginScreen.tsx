import React, { useEffect } from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, TouchableOpacity, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const LoginScreen = ({navigation}: any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, [])  

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => alert(error));
    }

    return (
        <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
            <TouchableOpacity activeOpacity={0.8}>
                <Image source={require("../static/logo.png")}
                    style={{marginBottom: 50, width: 150, height: 150}}/>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email"
                    value={email}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                        setEmail(e.nativeEvent.text)
                    }}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                        setPassword(e.nativeEvent.text)
                    }}
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="clear" title="Register" />
            <View style={{height: 50}}/>
        </KeyboardAvoidingView>
    )   
}

export default LoginScreen

const styles = StyleSheet.create({
    inputContainer: {
        width: 300
    },
    button: {
        minWidth: 300,
        marginTop: 20,
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        height: "100%",
    }
});