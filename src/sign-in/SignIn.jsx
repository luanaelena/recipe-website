import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './sign-in.css'

export default function SignIn(){
  //function to get into your account
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin(){
    const auth = {
      username: username,
      password: password
    };
    
    //post request for login, checks username and pass and gets token
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auth)
    };

    fetch('https://api-recipes.luanabuca.com/auth/login', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.error===1){
          alert ('Wrong username or password');
        }else{
          //alert('You are in');
          localStorage.setItem('token',data.jwt);
          window.location.replace('/my-account');
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className='sign-in'>
      <h1 id='sign-in-title'>Sign In</h1>

      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id='username' className='input-item' onChange={(e) => {setUsername(e.target.value)}} placeholder='Username' />
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id='password' className='input-item' onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />
      </div>

      <div>
        <input type="button" id='sign-in-btn' onClick={handleLogin} value={'Login'} />
      </div>

      <p>
        <Link to='../sign-up'>Don't have an account yet? Click here to create one!</Link>
      </p>
    </div>
  )
}

