import {USER_LOGIN_START,USER_LOGIN_SUCCESS,USER_LOGIN_FAILED} from './type'
import Axios from 'axios';
import {API_URL} from './../../support/ApiUrl'


export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){
            console.log('test')
            dispatch({type:USER_LOGIN_FAILED,payload: 'Datanya lengkapin dulu Babe!!'})
        }else{
            // Axios.get(`http://localhost:2000/users?username=${data.username}&password=${data.password}`) //ini cara lain
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){
                    localStorage.setItem('iduser', res.data[0].id)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0]})
                }else{
                    dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})

            })
        }
    }
}

export const errormessageclear=()=>{
    return {
        type:'ErrorClear'
    }
}

export const KeepLogin=(data)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data
    }
}