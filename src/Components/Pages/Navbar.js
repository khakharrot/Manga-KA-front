import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Login from "../Modal/Login"
import Register from "../Modal/Register"
import {logoutUser} from '../../Redux/Actions'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom'
import SearchBar from '../Search/SearchManga'

function Navbar({setSearchTerm}) {

  const user = useSelector((state) => state.user) 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const logout = () => {
    dispatch(logoutUser())
    navigate('/')
    
  }

  const userLink = (
    <header className='headerUser'>
 <h3>Welcome {user && user.userName}:</h3>
  <Link to="/Myaccount">
  <p className='accountBTN'>My account</p>
  </Link>
  <button onClick={logout}>Logout</button>
  
  </header> 
  )
  const guestLink = (
    <header className='headerGuest'>
  <Login/>
  <Register/>
  </header> 
  )
  

  return (
    <div className='navbar'>
        <SearchBar setSearchTerm= {setSearchTerm} />
        {user?userLink:guestLink}
        
    </div>
  )
}

export default Navbar
