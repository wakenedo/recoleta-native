import {View, Text, TextInput, Button} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userType, setUserType] = useState('');
    const {onLogin, onRegister} = useAuth();

    const login = async () => {
        const result = await onLogin!(email, password);
        if (result && result.error) {
            alert(result.msg);
        }
    };

    const register = async () => {
        const result = await onRegister!(firstName, lastName, email, password, userType);
        if (result && result.error) {
            alert(result.msg);
        } else {
            login();
        }
    };

    return (
        <View>
            <TextInput placeholder='Email' onChangeText={(text: string) => setEmail(text)} value={email} />
            <TextInput placeholder='Password' secureTextEntry={true} onChangeText={(text: string) => setPassword(text)} value={password} />
            <Button onPress={login} title='Sign in' />
            <Button onPress={register} title='Create Account' />
        </View>
    );
};

export default Login;