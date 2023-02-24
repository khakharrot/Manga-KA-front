import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Mangalist from '../List/Mangalist'



function Home({searchTerm}) {

  const user = useSelector (state => state.user);

  return (
    <div>
      <h3 className='presentation'>Welcome fellow otaku to MANGA-K.A, a website to discover new mangas to read and enjoy or to share the ones that you've already finished for others to discover.<br/>
      I hope that you will find a new favorite in our library <br/>
      Enjoy you time in our collection of mangas.</h3>
      <h1 className='mangaslist'>The holy list:  </h1>
      <p className='add'>(Support by adding new mangas to the list pliz: <Link to={user ?  "/NewManga" : "/" }>  <button onClick={() => {
      if (!user) { 
        alert("Please log in to help us.");
      }
     }}>Support</button> </Link> )</p> 
      <Mangalist searchTerm={searchTerm} />

    </div>
  )
}

export default Home
