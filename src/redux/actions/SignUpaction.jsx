import Axios from 'axios';
import {API_URL} from './../../support/ApiUrl'


export const SignUpUser=({usernameadd,passwordadd,confirmpasswordadd})=>{
    return (dispatch)=>{
        dispatch({type:"USER_SIGNUP_START"})
        if(usernameadd===''||passwordadd===''||confirmpasswordadd===''){
            console.log('test')
            dispatch({type:"USER_SIGNUP_FAILED",payload: 'Datanya lengkapin dulu Babe!!'})
        }else{
            // Axios.get(`http://localhost:2000/users?username=${data.username}&password=${data.password}`) //ini cara lain
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:usernameadd,
                }
            })
            .then((res)=>{
                if(res.data.length){
                    dispatch({type:"USER_SIGNUP_FAILED",payload:'Username sudah dipakai.Silakan pakai username lain!'})
                }else{
                    if(passwordadd===confirmpasswordadd){
                        Axios.post(`${API_URL}/users`,{username:usernameadd,password:passwordadd,role:'user'})
                        .then((res2)=>{
                            alert('SignUp Berhasil!')
                        }).catch ((err2)=>{
                            console.log(err2)
                        })
                        dispatch({type:"USER_SIGNUP_SUCCESS"})
                    }else{
                        dispatch({type:"USER_SIGNUP_FAILED",payload:'Invalid Password'})
                    }
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:"USER_SIGNUP_FAILED",payload:err.message})

            })
        }
    }
}

export const errormessageclear=()=>{
    return {
        type:'ErrorClear'
    }
}

