import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';

function SignupScreen() {

    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const authCtx = useContext(AuthContent);

    async function signupHandler({email,password}){
        setIsAuthenticating(true);
        try{
            const token = await createUser(email,password);
            authCtx.authenticate(token);
        }
        catch(error){
            Alert.alert("Authentication fail","Could not register your user");
        }
        
        setIsAuthenticating(false);
    }

    if (isAuthenticating){
        return <LoadingOverlay/>
    }

    return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;