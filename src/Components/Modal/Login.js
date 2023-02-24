import React from 'react'
import Modal from 'react-modal';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {loginUser} from '../../Redux/Actions'
import {ModalHeader,ModalBody} from 'reactstrap';


function Login() {


    const dispatch = useDispatch()

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
  
    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }

    const connect = async () =>{
      const user = {userName,password}
      const response = await dispatch(loginUser(user))
      console.log(response);
      if (response.msg === 'logged in') {
        alert('User connected');
      } else {
        alert('Invalid username/password. Please try again.');
      }
    }
   
   const handleCloseModal =()=>{
    setModal(false)
   }

  return (
    <div className='Modal-div'>
       <button onClick={toggleModal} >Login</button>
<Modal isOpen={modal}  ariaHideApp={false} onRequestClose={handleCloseModal}
           shouldCloseOnOverlayClick={true} className='Modal' >
<ModalHeader className='ModalHeader'>Login: </ModalHeader>
<ModalBody className='ModalBody'>
  <label>UserName</label>
  <input type="text" onChange={(e)=>setUserName(e.target.value)}/>
  <label>Password</label>
  <input type="password" onChange={(e)=>setPassword(e.target.value)}/>


  <button onClick={connect}>Connect</button>
  <button onClick={toggleModal}>Cancel</button>
  
</ModalBody>
</Modal>
    </div>
  )
}

export default Login
