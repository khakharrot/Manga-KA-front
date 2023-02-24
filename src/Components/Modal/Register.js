import React from 'react'
import Modal from 'react-modal';
import {useDispatch} from 'react-redux';
import {createUser} from '../../Redux/Actions'
import {useState} from 'react';
import {ModalHeader,ModalBody} from 'reactstrap';
import axios from 'axios';

function Register() {
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUsername] = useState('');
    const [picture, setPicture] = useState('');
    const [uploading, setUploading] = useState(false);

    const uploadProfileImage = (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append("image", file);
      setUploading(true);
      axios
        .post("/api/uploads", bodyFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setPicture(response.data);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    };

    const dispatch = useDispatch();


    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }
    const handleCloseModal =()=>{
      setModal(false)}

    const handleSubmit = () => {
    const newUser = {firstName,lastName,userName,email,password,picture}
    dispatch(createUser(newUser))
    setModal(!modal) 
}

  return (
    <div>
      <button onClick={toggleModal} >SignUp</button>
<Modal isOpen={modal}  ariaHideApp={false} onRequestClose={handleCloseModal}
           shouldCloseOnOverlayClick={true} className='ModalSignup'>
<ModalHeader className='ModalHeader'>SignUp: </ModalHeader>
<ModalBody className='ModalBodySignup'>
  <label>FirstName</label>
  <input type="text" onChange={(e)=>setFirstName(e.target.value)} />
  <label>LastName</label>
  <input type="text" onChange={(e)=>setLastName(e.target.value)}/>
  <label>UserName</label>
  <input type="text" onChange={(e)=>setUsername(e.target.value)}/>
  <label>Email</label>
  <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
  <label>Password</label>
  <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
  <>
                  {picture ? (
                    <img
                      src={picture}
                      width="100%"
                      style={{ margin: "8px 0" }}
                      height="150px"
                      alt="product"
                    />
                  ) : (
                    <div style={{ margin: "8px 0", color: "white" }} >
                      {!uploading ? "Upload Image For user" : "Loading ..."}
                    </div>
                  )}
                  <div
                  >
                    Select File
                    <input
                      accept="image/*"
                      type="file"

                      onChange={uploadProfileImage}
                    />
                  </div>
                </>

  <button onClick={handleSubmit}>Register</button>
  <button onClick={toggleModal}>Cancel</button>
  
</ModalBody>

</Modal>

    </div>
  )
}

export default Register
