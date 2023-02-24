import axios from 'axios';

export const getUsers = () => (dispatch)=>{
    axios.get('/Manga-KA/usersList')
    .then(res=>dispatch({type:'GET_USERS',payload:res.data}))
    .catch((err)=>console.log(err))
}

export const createUser = (formData)=>(dispatch)=>{
   axios.post('/Manga-KA/SignUp',formData)
   .then(res=>dispatch({type:'NEW_USER',payload:res.data}))
   .catch((err)=>console.log(err))
}
export const loginUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post('/Manga-KA/login', formData);
    dispatch({ type: 'LOGIN_USER', payload: response.data });
    return response.data;
  } catch (err) {
    if (err.response.data === 'Bad username/password') {
      dispatch({ type: 'LOGIN_ERROR', payload: err.response.data });
    } else {
      console.log(err);
    }
    return err.response.data;
  }
};

export const logoutUser = () => (dispatch) =>{
    dispatch({type:'LOGOUT_USER'})}

export const updateUser = (id,formData)=>(dispatch)=>{
  const config={
    headers:{"authorization":localStorage.getItem("token")
}}
    axios.put(`/Manga-KA/updateUser/${id}`,formData,config)
    .then(res=>dispatch(getAuthUser()))
    .catch((err)=>console.log(err))
}
export const updateUserPassword = (_id,formData)=>(dispatch)=>{
  const config={
    headers:{"authorization":localStorage.getItem("token")
}}
   axios.put(`/Manga-KA/updatePassword/${_id}`,formData,config)
   .then(res=>dispatch({type:'UPDATE_PASSWORD',payload:res.data}))
   .catch((err)=>console.log(err))
}
export const deleteUser = (id)=> (dispatch)=>{
    axios.delete(`/Manga-KA/deleteUser/${id}`)
    .then(res=>dispatch({type:'DELETE_USER',payload:res.data}))
    .catch((err)=>console.log(err))
}

export const getMangas =()=> (dispatch)=>{
 axios.get('/Manga-KA/MangaList')
 .then(res=>dispatch({type:'GET_MANGA',payload:res.data}))
.catch((err)=>console.log(err))
}

export const getGenre =()=> (dispatch)=>{
  axios.get('/Manga-KA/genreList')
  .then(res=>dispatch({type:'GET_GENRES',payload:res.data}))
 .catch((err)=>console.log(err))
 }


export const newManga = (formData)=> (dispatch)=>{
axios.post('/Manga-KA/addManga',formData)
.then(res=>dispatch({type:'NEW_MANGA',payload:res.data}))
.catch((err)=>console.log(err))
}

export const updateManga = (id,formData)=> (dispatch)=>{
  const config={
    headers:{"authorization":localStorage.getItem("token")
}}
axios.put(`/Manga-KA/updateManga/${id}`,formData,config)
.then(res=>dispatch({type:'UPDATE_MANGA',payload:res.data}))
.catch((err)=>console.log(err))
}

export const deleteManga = (id)=> (dispatch)=>{
    axios.delete(`/Manga-KA/deleteManga/${id}`)
    .then(res=>dispatch({type:'DELETE_MANGA',payload:res.data}))
    .catch((err)=>console.log(err))
}

export const getAuthUser=()=>(dispatch)=>{
  const config={
      headers:{"authorization":localStorage.getItem("token")
  }}
axios.get("/Manga-KA/user",config)
.then((res)=>dispatch({type:'GET_AUTH_USER',payload:res.data}))
.catch((err)=>console.log(err))
}

export const searchManga = (searchTerm) => (dispatch) => {
  axios.get("/Search/:searchTerm")
    .then(res =>dispatch({type: 'SEARCH_MANGA',payload: res.data}))
    .catch(err => console.log(err));
};








