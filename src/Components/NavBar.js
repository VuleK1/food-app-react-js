import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './NavBar.css'
import { db, auth } from './firebase-config'
import{
    onAuthStateChanged,
    signOut,
    updateCurrentUser,
  } from "firebase/auth"



export const NavBar = () => {


    const logout = async () => {
        await signOut(auth)
    }
    const [user, setUser ] = useState({});
      
        onAuthStateChanged(auth, (CurrentUser) => {
          setUser(CurrentUser);
        });
        
    return(
        <div className='navbar'>
            
            
            {user?(<div> <NavLink to="/" > HOME </NavLink> User: {user.email} <button onClick={() => logout()} >Logout </button> </div>) : ( 
                <div>
            <NavLink to="/" > HOME </NavLink> <NavLink to="/login" > LOGIN </NavLink> <NavLink to="/register"> SING UP </NavLink> </div>) }
        
        </div>
    )
}