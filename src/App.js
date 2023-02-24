import './App.css';
import Navbar from "./Components/Pages/Navbar"
import {Routes, Route,Link } from "react-router-dom"
import Home from "./Components/Pages/Home"
import React, { useEffect, useState } from 'react'
import Account from "./Components/Pages/Account"
import { getAuthUser } from './Redux/Actions';
import { useDispatch } from 'react-redux';
import NewManga from './Components/Pages/NewManga';
import MangaPage from './Components/Pages/MangaPage';
import Footer from './Components/Footer';


function App() {
   
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  useEffect(()=> dispatch(getAuthUser() ),[])
  
  return (
    <div className="App">
      <Link to='/' className='linkLogo'>
      <img className='Logo' src={process.env.PUBLIC_URL + '/Logo.jpg'} alt='Logo'/>
      </Link>
    <Navbar setSearchTerm= {setSearchTerm} />
    
    <Routes>
    <Route path="/" element={<Home searchTerm={searchTerm} />} />
    <Route path="/Myaccount" element={<Account/>} />
    <Route path="/NewManga" element={<NewManga/>} />
    <Route path='/:id' element={<MangaPage /> } />
    </Routes>
    <Footer/>
    
    </div>
  );
}

export default App;
