import './App.css';
import HomePage from './home-page/HomePage';
import Navbar from './navbar/Navbar';
import RecipePage from './recipe-page/RecipePage';
import SignIn from './sign-in/SignIn';
import SignUp from './sign-up/SignUp';
import MyAccount from './my-account/MyAccount';
import AddForm from './add-from/AddForm';
import Logout from './logout/Logout';
import EditForm from './edit-form/EditForm';

import React from 'react';
import {Route, Routes, BrowserRouter as Router, BrowserRouter} from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
          <Navbar />

          <Routes>
           <Route path='/' exact element={<HomePage />} />
           <Route path='/recipe' element={<RecipePage/>} />
           <Route path='/sign-in' element={<SignIn/>} />
           <Route path='/sign-up' element={<SignUp/>} />
           <Route path='/my-account' element={<MyAccount/>} />
           <Route path='/add-form' element={<AddForm/>} />
           <Route path='/logout' element={<Logout/>}/>
           <Route path='/edit-form' element={<EditForm/>}/>
          </Routes>
      </BrowserRouter>
  );
}