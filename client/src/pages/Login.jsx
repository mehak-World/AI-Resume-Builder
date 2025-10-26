import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { RedirectToSignIn } from '@clerk/clerk-react'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const {isSignedIn} = useUser();
    const navigate = useNavigate();

    if(!isSignedIn){
          return <RedirectToSignIn />;
    }

    navigate("/");

  
}

export default Login
