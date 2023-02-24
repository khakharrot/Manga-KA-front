import React, {useState,useEffect } from 'react'
import UpdatePassword from '../Modal/UpdatePassword'
import {useDispatch,useSelector} from 'react-redux';
import { deleteUser, updateUser } from '../../Redux/Actions';
import axios from 'axios';

function Account() {
  
  
   const user = useSelector((state) => state.user)

  const [firstName,setFirstName] = useState(user && user.firstName)
  const [lastName,setLastName] = useState(user && user.lastName)
  const [userName,setUsername] = useState(user && user.userName)
  const [email,setEmail] = useState(user && user.email)
  const [picture, setPicture] = useState(user && user.picture)
    const [uploading, setUploading] = useState(false);
    const [users, setUsers] = useState([]);

    
    useEffect(() => {
      axios.get('/Manga-KA/usersList')
        .then(users => setUsers(users.data.list));
    },  []);
  

  const dispatch = useDispatch()
  
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

  
  const update = () => {
    const Update = {firstName,lastName,userName,email,picture}
    dispatch(updateUser (user._id,Update))
   alert('User Updated')}

   const DLL = (userId) => {
   dispatch(deleteUser (userId))
   alert('User Deleted')
   }
  
  const userList = (
    <div className='usersContainer'>
      <h2 className='usersTitle'>Users List:</h2>
      <ul className='userslist'>
        {users && users.map((uuser) => (
          <li key={users.id} className={uuser && uuser.isAuth ? 'connected' : 'disconnected'}>
            User name: {uuser.userName} <br />
            user mail: {uuser.email}
            <button onClick={() => DLL(uuser._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div className='account'>
      <>
    {user.picture ? (
    <img className='accountPic' src={picture} width="100%" style={{ margin: "8px 0" }} height="150px" alt="User"/> ) : (

    <div style={{ margin: "8px 0", color: "white" }} >
    {!uploading ? "Upload Image For user" : "Loading ..."}
    </div>)}
    <div>
      Select File
      <input accept="image/*" type="file" onChange={uploadProfileImage}/>
    </div>
    </>
      
  <label >First Name:</label>
  <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
  <label>LastName :</label>
  <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
  <label>UserName :</label>
  <input type="text" value={userName} onChange={(e)=>setUsername(e.target.value)}/>
  <label>Mail :</label>
  <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>

  {<div className='buttons'>  <button onClick={update}>Update</button>
      <UpdatePassword/> </div>}
      

  {user.isAdmin? userList : ""}



    </div>
  )
}

export default Account
