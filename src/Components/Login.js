import './Login.css'
import { useState } from 'react'
import {auth} from './firebase-config.js'
import { signInWithEmailAndPassword } from "firebase/auth";

export const Login = () =>{

    const [loginEmail, setSignInEmail] = useState("");
    const [loginPassword, setSignInPassword] = useState("");
    const [loginError, setSignInError] = useState("");

    const signIn = async () =>{
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            setSignInError(error.massage)
        }
    }
    return(
        <div className='loginPage'>
            <h1 className='loginTitle'> Login Page </h1>
            <div className='loginForm'>
                <h5>Email</h5>
                <input onChange={(event) => setSignInEmail(event.target.value)} placeholder='your email'></input>
                <h5>Password</h5>
                <input onChange={(event) => setSignInPassword(event.target.value)} placeholder='your password'></input>
                <p className='errorText' > {loginError} </p>
            </div>
            <button onClick={signIn}> Log me in! </button>
        </div>
    )
}