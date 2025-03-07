import {Children, createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (firstName: string, lastName: string, email: string, password: string, userType: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'recoleta-jwt';
const ID_KEY = "user-id";
const API_URL = 'https://recoletaapi.onrender.com/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    
    //handling state
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        //inicial case
        token: null,
        authenticated: null
    });

    //loading data
    useEffect(() => {
        const loadToken = async () => {
            
            try{
                let token;
                let id;
                if(Platform.OS === "web"){
                    token = await AsyncStorage.getItem(TOKEN_KEY);
                    id = await AsyncStorage.getItem(ID_KEY);
                }
                else{
                    token = await SecureStore.getItemAsync(TOKEN_KEY);
                    id = await SecureStore.getItemAsync(ID_KEY);
                }

                if (token) {
                    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    
                    setAuthState({
                        token: token,
                        authenticated: true
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };
        loadToken();
    }, []);

    //login
    const login = async (email: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth/login`, {email, password});

            console.log(result.data)

            setAuthState({
                token: result.data.accessToken,
                authenticated: true
            });

            axios.defaults.headers.common['authorization'] = `Bearer ${result.data.accessToken}`;

            if (Platform.OS === "web") {
                await AsyncStorage.setItem(TOKEN_KEY, result.data.accessToken);
                await AsyncStorage.setItem(ID_KEY, result.data._id);
            }
            else{
                await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);
                await SecureStore.setItemAsync(ID_KEY, result.data._id);
            }

            
        
            return result;

        } catch(e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };

    //register
    const register = async (firstName: string, lastName: string, email: string, password: string, userType: string) => {
        try{
            return await axios.post(`${API_URL}/auth/register`, {firstName, lastName, email, password, userType});
        } catch(e) {
            return {error: true, msg: (e as any).response.data.msg};
        }
    };

    //logout
    const logout = async () => {
        try {
            //delete token from storage
            if (Platform.OS === "web") {
                await AsyncStorage.removeItem(TOKEN_KEY);
                await AsyncStorage.removeItem(ID_KEY);
            }
            else{
                await SecureStore.deleteItemAsync(TOKEN_KEY);
                await SecureStore.deleteItemAsync(ID_KEY);
            }

            //update Headers
            axios.defaults.headers.common['authorization'] = '';

            //reset auth state
            setAuthState({
                token: null,
                authenticated: false
            });
        } catch (e) {
            console.error(e);
        }     
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};