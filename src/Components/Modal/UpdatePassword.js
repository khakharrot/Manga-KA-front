import React from 'react'
import Modal from 'react-modal';
import {useDispatch,useSelector} from 'react-redux';
import {useState} from 'react';
import {updateUserPassword} from '../../Redux/Actions'
import {ModalHeader,ModalBody} from 'reactstrap';

function UpdatePassword() {


    const user = useSelector((state) => state.user) 
    
    const [checkPass,setCheckPass] = useState('')
    const [newPassword,setNewPassword] = useState("")

    const [modal, setModal] = useState(false)

    const dispatch = useDispatch()

    const toggleModal = () => {
        setModal(!modal)
    }
    const handleCloseModal =()=>{
      setModal(false)}

    const Submit = () => {
        const Update = {checkPass,newPassword}
        dispatch(updateUserPassword(user._id,Update));
        setModal(!modal)
        alert('Password Updated')
    }

  return (
    <div>
      <button onClick={toggleModal} >Change password </button>
<Modal isOpen={modal}  ariaHideApp={false} onRequestClose={handleCloseModal}
           shouldCloseOnOverlayClick={true} className='Modal'>
<ModalHeader className='ModalHeader'>Update password:</ModalHeader>
<ModalBody className='ModalBody'>
  <label>Current Password</label>
  <input type="password" onChange={(e)=>setCheckPass(e.target.value)} />
  <label>New Password</label>
  <input type="password" onChange={(e)=>setNewPassword(e.target.value)} />
 
  <button onClick={Submit}>Update</button>
  <button onClick={toggleModal}>Cancel</button>
  
</ModalBody>

</Modal>
      
    </div>
  )
}

export default UpdatePassword
