import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './sign-up.css'

export default function SignUp(){
  //function to create the account
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCreateAcc(){
    const auth ={
      name: name,
      username: email,
      password: password
    };

    //post request for register, alerts if inputs are wrong
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auth)
    };

    fetch('https://api-recipes.luanabuca.com/users', options)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.error===1){
          alert('One of the inputs is not correctly completed');
        }else{
          alert('You have successfuly created an account');
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <div className='sign-up'>
      <h1 id='sign-up-title' >Sign Up</h1>

      <div className='form'>
        <label htmlFor="name">Name: </label>
        <input id='name' className='input-item' type="text" onChange={(e) => {setName(e.target.value)}} placeholder='Name'/>

        <label htmlFor="email">Email: </label>
        <input id='email' className='input-item' type='email' onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' />

        <label htmlFor="password">Password: </label>
        <input id='password' className='input-item' type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />

        <button id='create-btn' type='submit' onClick={handleCreateAcc}>Create an account</button>

        <p>
          <Link to='../sign-in'>Already have an account? Click here to sign in!</Link>
        </p>
      </div>
    </div>
  )
}