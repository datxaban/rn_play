
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { useState, useContext } from 'react';
import {Alert} from "react-native";
import { AuthContext } from '../store/auth-context';
import AuthContent from '../components/Auth/AuthContent';

function LoginScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const authCtx = useContext(AuthContext);

    async function loginHandler({email,password}){
        setIsAuthenticating(true);
        try{
            const token = await login(email,password);
            authCtx.authenticate(token);
        }
        catch(error){
            Alert.alert("Authentication failed!","Could not log you in");
            setIsAuthenticating(false);
        }
        
        
    }

    if (isAuthenticating){
        return <LoadingOverlay message="Trying to login"/>
    }

    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;