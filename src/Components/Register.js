import { useState } from 'react'
import './Register.css'
import {auth} from './firebase-config.js'
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Register = () =>{

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () =>{
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    return(
        <div className='registerPage'>
            <h1 className='registerTitle'> Register Page </h1>
            <div className='registerForm'>
                <h5>Email</h5>
                <input onChange={(event) => setRegisterEmail(event.target.value)} placeholder='your email'></input>
                <h5>Password</h5>
                <input onChange={(event) => setRegisterPassword(event.target.value)} placeholder='your password'></input>
                <h5>Password</h5>
                <input type='password' ></input>
            </div>
            <button onClick={register}> Sign me up! </button>
        </div>
    )
}