import {Get_USERS,SEARCH_MANGA,GET_AUTH_USER,GET_GENRES,NEW_USER,LOGIN_USER,UPDATE_USER,LOGIN_ERROR,DELETE_USER,NEW_MANGA,UPDATE_MANGA,DELETE_MANGA,GET_MANGA,LOGOUT_USER} from '../Redux/actionTypes'

const initState ={
    users:[],
    token: localStorage.getItem('token'),
    user:null,
    isAuth:false,
    msg:null,
    mangas:null,
    search:null,
    error: null,
    loading:true,
    genre:null,
    searchTerm:null,
    password:null
}

export const Reducers = (state = initState, {type,payload}) => {
switch (type) {

    case Get_USERS:
        return {
    users:payload.users,
    msg:payload.msg,
        }
 case NEW_USER:
    case LOGIN_USER:
    localStorage.setItem('token',payload.token)
    
 return {...state,
    user:payload.user,
    isAuth:true,
    msg:payload.msg}

case LOGOUT_USER:
    localStorage.removeItem("token")
    return {...state,
        isAuth:false,
        user:null,
        msg:null}

case LOGIN_ERROR:
    return {...state,
    error: payload.error}

    case DELETE_USER:
        return {...state,
            users: state.users.filter(user => user._id !== payload._id)
        };
            
case UPDATE_USER:
    return {...state,
    user:payload.user,
    msg:payload.msg}

case NEW_MANGA:
    return {...state,
    mangas:payload.mangas,
    msg:payload.msg}
     
    case GET_MANGA:
        return {
          ...state,
          mangas: payload.list,
          loading: false
        }
    case GET_GENRES:
        return {
        ...state,
        loading: false,
        genre:payload.genre}
    case GET_AUTH_USER:
        return{
        ...state,
        isAuth:true,
        user:payload.user
                }

    case SEARCH_MANGA:
        return {
        ...state,
        mangas: payload.list.filter((el) => el.title.toLowerCase().includes(payload.searchTerm.toLowerCase().trim())),
}
  
 case UPDATE_MANGA:
    return {...state,
        mangas:payload.mangas,
        msg:payload.msg}

    default :return state
 }
}
