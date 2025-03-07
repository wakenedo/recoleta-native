import {View, Text, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'recoleta-jwt';
const ID_KEY = "user-id";
const API_URL = 'https://recoletaapi.onrender.com/api';

const Home = () => {

    const [user, setUser] = useState<{ firstName: string; lastName: string; userType: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {

        const fetchCredentials = async () => {
            const storedToken = Platform.OS === "web"
                ? await AsyncStorage.getItem(TOKEN_KEY)
                : await SecureStore.getItemAsync(TOKEN_KEY);
            
            const storedId = Platform.OS === "web"
                ? await AsyncStorage.getItem(ID_KEY)
                : await SecureStore.getItemAsync(ID_KEY);
            
            setToken(storedToken);
            setId(storedId);
        };

        fetchCredentials();
    }, []);

    useEffect(() => {
        const LoadUser = async () => {
            if (!token || !id) return; // Aguarda os valores serem carregados

            try {
                const result = await axios.get(`${API_URL}/users/find/${id}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setUser(result.data);
            } catch (e: any) {
                alert(e.message);
            }
        };

        LoadUser();
    }, [token, id]); // Executa quando `token` e `id` forem atualizados

    return (
        <View>
            <Text>Home</Text>
            {user && <Text>{`${user.firstName} ${user.lastName} ${user.userType}`}</Text>}
        </View>
    );              
};

export default Home;