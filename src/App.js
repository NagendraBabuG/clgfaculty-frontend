import React from 'react';
import {Routes, Route, Router} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { handleGoogleSignIn } from './utils/firebase';
import { signOutUser } from './utils/firebase';
import SignInButton from './components/auth';
import FacultyUpdateForm from './components/form';
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'
const App = () => {


  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false); // Initialize with false
  const navigate = useNavigate()
  useEffect(() => {
    // Check the session storage flag when the component mounts
    const userSignedIn = sessionStorage.getItem('user') != null;
    setIsSignedIn(userSignedIn);
  }, []);
    // Effect to check session storage for user token
    useEffect(() => {
      const storedUser = sessionStorage.getItem('user');
      console.log(storedUser, 'storedUser')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser).data;
        setUser(parsedUser);
        console.log(user)
        //window.location.reload()
      }
    }, []);
  
  const handleSignOut = ()=>{
    setUser(null);
    setIsSignedIn(false)
    signOutUser();
  }


  return (
  <div className="container">
      
    <div className="header">
      <div className='left'>
      <h1>IIITDM Kurnool Faculty</h1>
      </div>
      <div className='right'>

      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <SignInButton></SignInButton>
      )}
      </div>
    </div>
    <div className="content">
      {user ? (
        <div>
          {/*<p>Welcome, {user.name}</p>
          */}
          {/* ... (rest of your content) */}
          <FacultyUpdateForm user={user}></FacultyUpdateForm>
        </div>
      ) : (
        <p>Please sign in.</p>
      )}
    </div>
  </div>
  );
}

export default App;
