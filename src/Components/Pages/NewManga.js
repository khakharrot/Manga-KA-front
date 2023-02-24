import React, {useState,useEffect } from 'react'
import { newManga } from '../../Redux/Actions';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';

function NewManga() {
    const dispatch = useDispatch();


    const [title, setTitle] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [picture, setPicture] = useState('');
    const [author, setAuthor] = useState('');
    const [chapters, setChapters] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [allGenres, setAllGenres] = useState([]);
    
    const navigate = useNavigate ()

    useEffect(() => {
        axios.get('/Manga-KA/genreList')
          .then(genres => setAllGenres(genres.data.list));
      },  []);
    

    console.log(selectedGenres, "ezfzf")

    const handleSubmit = () => {
        const newmangas = {title,synopsis,picture,author,chapters,Genre:selectedGenres}
        dispatch(newManga (newmangas))
      alert("Manga has been added");
      navigate('/')}
      

  return (
    <div className='genre'>
      <p className='newText'>Thank you for helping the page grow by adding new sacred texts to our library.<br/>
      I hope that you have already checked that the manga that you're going to add in not already in the holy list.<br/>
      May you bring joy to many with your new entry. </p>

      <h3>The new life stealer:</h3>

    <label>Title of the Manga:</label>
  <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
  <label>What is it about? make me dream:</label>
  <input type="text" onChange={(e)=>setSynopsis(e.target.value)}/>
  <label>Give me a good picture: (HD links pliz)</label>
  <input type="text" onChange={(e)=>setPicture(e.target.value)}/>
  <label>Name of the artist that made this art: </label>
  <input type="text" onChange={(e)=>setAuthor(e.target.value)}/>
  <label>How many chapters are out?</label>
  <input type="number" onChange={(e)=>setChapters(e.target.value)}/>
  <label>What kind of mangas is this?</label>
  <section className='genreBox'>
  {allGenres && allGenres.map(genres => (
  <div className='genreP' >
    <input
      type="checkbox"
      value={genres.name}
      onChange={(e) => {
        if (e.target.checked) {
          setSelectedGenres([...selectedGenres, genres.name]);
        } else {
          setSelectedGenres(selectedGenres.filter(g => g !== genres.name));
        }
      }}
    />
    {genres.name}
  </div>
))}
</section>
  

  <button className='genreButton' onClick={handleSubmit}>Add </button>
    </div>
  )
}

export default NewManga
