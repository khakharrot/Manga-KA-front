import React, { useEffect } from 'react'
import Modal from 'react-modal';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {updateManga} from '../../Redux/Actions'
import {ModalHeader,ModalBody} from 'reactstrap';
import { useNavigate, useParams  } from 'react-router-dom';
import axios from 'axios';

function UpdateManga() {

    const [manga, setManga] = useState("");
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [picture, setPicture] = useState("")
  const [author, setAuthor] = useState("")
  const [chapters, setChapters] = useState("")

    const { id } = useParams()
    useEffect(() => {
        const fetchManga = async () => {
          const response = await axios.get(`Manga-KA/${id}`);
          setManga(response.data);
        };
        fetchManga();
      }, [id]);

      useEffect(() => {
        setTitle(manga.title)
        setSynopsis(manga.synopsis)
        setPicture(manga.picture)
        setAuthor(manga.author)
        setChapters(manga.chapters)
      }, [manga]);



    const [modal, setModal] = useState(false)

    const dispatch = useDispatch()

    const toggleModal = () => {
        setModal(!modal)
    }
    const handleCloseModal =()=>{
        setModal(false)}

        const Submit = () => {
            const updatedManga = {title,synopsis,picture,author,chapters}
            dispatch(updateManga(manga._id,updatedManga));
            setModal(!modal)
            alert('Manga Updated') 
         navigate ("/")}


  return (
    <div>
      <button onClick={toggleModal} >Update manga </button>
<Modal isOpen={modal}  ariaHideApp={false} onRequestClose={handleCloseModal}
           shouldCloseOnOverlayClick={true} className='Modalupdatemanga'>
<ModalHeader className='ModalHeader'>Update the manga:</ModalHeader>
<ModalBody className='ModalBody'>
  <label>Update the title:</label>
  <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
  <label>Update the synopsis:</label>
  <input type="text" value={synopsis} onChange={(e)=>setSynopsis(e.target.value)} />
  <label>Update the picture (always HD):</label>
  <input type="text" value={picture} onChange={(e)=>setPicture(e.target.value)} />
  <label>Update the author:</label>
  <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} />
  <label>Update the number of chapters: (it shall be updated weekly)</label>
  <input type="number" value={chapters} onChange={(e)=>setChapters(e.target.value)} />

  <button onClick={Submit}>Update</button>
  <button onClick={toggleModal}>Cancel</button>
  
</ModalBody>

</Modal>
    </div>
  )
}

export default UpdateManga


