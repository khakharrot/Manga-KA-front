import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { searchManga } from '../../Redux/Actions';

const SearchBar = ({setSearchTerm}) => {

  


  const user = useSelector((state) => state.user) 



  return (
    <input type="text" style={user ? { marginLeft: "585px", marginRight: "350px" } : { marginLeft: "585px", marginRight: "585px" }} 
    
      placeholder="Search for a manga..."
      onChange={(e)=> setSearchTerm (e.target.value)}
    />
  );}

export default SearchBar;
