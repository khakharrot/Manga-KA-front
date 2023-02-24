import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMangas } from '../../Redux/Actions';

const Mangalist = ({searchTerm}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const mangas = useSelector(state => state.mangas);
  const user = useSelector(state => state.user);
  
  const search = mangas &&  mangas.filter( (manga)=> manga.title.toLowerCase().includes(searchTerm.toLowerCase().trim()))

  useEffect(() => {
    dispatch(getMangas());
    setLoading(false);               
  }, [dispatch])

 

  return (
    <div className='mangaList'>
      {search && search.map(manga => (
        <div key={manga._id} className='MangaCard'>
          <Link to={user ? `/${manga._id}` : "/"} onClick={() => {
      if (!user) {
        alert("Please log in to access this content.");
      }
     }}>
          <img className='mangaImg' src={manga.picture} alt={manga.title} />
          <h3 className='mangaTitle'>{manga.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Mangalist;