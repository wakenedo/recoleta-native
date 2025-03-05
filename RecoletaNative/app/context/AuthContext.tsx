import {Children, createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
    authState?: {token: string | null; authenticated: boolean | null};
    onRegister?: (firstName: string, lastName: string, email: string, password: string, userType: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'reoleta-jwt';
export const API_URL = 'https://recoletaapi.onrender.com/api';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({Children}: any) => {
    
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
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        };
        loadToken();
    }, []);

    //login
    const login = async (email: string, password: string) => {
        try{
            const result = await axios.post(`${API_URL}/auth/login`, {email, password});

            setAuthState({
                token: result.data.accessToken,
                authenticated: true
            });

            axios.defaults.headers.common['authorization'] = `Bearer ${result.data.accessToken}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.accessToken);

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
        //delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        //update Headers
        axios.defaults.headers.common['authorization'] = '';

        //reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{Children}</AuthContext.Provider>;
};