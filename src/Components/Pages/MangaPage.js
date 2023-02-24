import React from 'react'
import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux';
import { deleteManga } from '../../Redux/Actions';
import UpdateManga from '../Modal/UpdateManga';

function MangaPage() {
  const dispatch = useDispatch();

    const [manga, setManga] = useState("");
    const navigate = useNavigate();

    const { id } = useParams()
    useEffect(() => {
        const fetchManga = async () => {
          const response = await axios.get(`Manga-KA/${id}`);
          setManga(response.data);
        };
        fetchManga();
      }, [id]);

      const user = useSelector((state) => state.user) 

      const handleDelete = () => {
        dispatch(deleteManga(id));
        navigate("/")}
  
        const genres = manga && manga.Genre.join(', ')

  const adminButtons = (
    <div className='buttons'>
      <UpdateManga/>
    <button onClick={handleDelete}>Delete</button>
    </div>
  )
  console.log(manga.Genre,"azer")
  return (
    <div className='mangaPage'>
      <h1 className='mangaPageTitle'>{manga.title}</h1>
      <img src={manga.picture} alt={manga.title} className='mangaPagePicture' />
      <p className='mangaPageP'>Description of this fine piece of art (may contain spoilers,read with care):  {manga.synopsis}</p>
      <p className='mangaPageP'>The artist of this art: {manga.author}</p>
      <p className='mangaPageP'>Number of chapters out so far: {manga.chapters} </p>
      <p className='mangaGenre'>The genres: {genres} </p>
      

      {user && user.isAdmin? adminButtons : ""}

      


    </div>
  )
}


export default MangaPage
