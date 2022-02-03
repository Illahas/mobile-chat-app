import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, NativeSyntheticEvent, StyleSheet, TextInputChangeEventData, View, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { auth } from '../firebase';

const RegisterScreen = ({navigation}: any) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login"
        });
    }, [navigation])

    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((authUser: any) => { 
                updateProfile(authUser.user, {
                    displayName: name,
                    photoURL: photoUrl
                });
            })
            .catch((error: any) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
            <Text style={styles.title}>
                Create an account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full name"
                    value={name}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                        setName(e.nativeEvent.text)
                    }}
                />
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
                    onSubmitEditing={register}
                />
                <Input 
                    placeholder="Photo url"
                    value={photoUrl}
                    onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
                        setPhotoUrl(e.nativeEvent.text)
                    }}
                    onSubmitEditing={register}
                />

                <Button 
                    containerStyle={styles.button}
                    raised
                    onPress={register} 
                    title="Register"
                />
                <Button containerStyle={styles.button} onPress={() => navigation.navigate("Login")} type="clear" title="Login" />
            </View>
            <View style={{height: 50}}/>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    title: {
        marginTop: -25,
        marginBottom: 25,
        fontSize: 40
    },
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