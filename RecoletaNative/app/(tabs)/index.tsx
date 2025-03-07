import { AuthProvider, useAuth } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Layout } from './_layout';

const Stack = createNativeStackNavigator();

export default function App() {
    return(
        <AuthProvider>
            <Layout></Layout>
        </AuthProvider>
    );
}