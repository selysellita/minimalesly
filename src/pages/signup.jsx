import React, {useState} from "react";
import {  MDBBtn, MDBInput, MDBAlert } from 'mdbreact';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {SignUpUser,errormessageclear} from './../redux/actions'


const SignUp = (props) => {
    const [adduser,setadduser]=useState({
        usernameadd:'',                     //harus sama ama nama input
        passwordadd:'',
        confirmpasswordadd:''
    })

    const DataOnChange=(e)=>{
        console.log(e.target)
        setadduser({...adduser,[e.target.name]:e.target.value})

    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        console.log(adduser)
        props.SignUpUser(adduser)
    }
    if(props.issignup){
        return <Redirect to='/login'/>
    }else{
        return (
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>          
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h5 text-center mb-4">Sign up</p>
                    <div className="grey-text">
                    <MDBInput 
                        label="Your Username" 
                        icon="user" 
                        onChange={DataOnChange}
                        name='usernameadd' 
                        group type="text" 
                        validate error="wrong"
                        success="right" />
                    <MDBInput 
                        label="Your password" 
                        icon="lock" 
                        onChange={DataOnChange}
                        name='passwordadd' 
                        group type="password" 
                        validate />
                    <MDBInput 
                        label="Confirm your password" 
                        name='confirmpasswordadd' 
                        icon="exclamation-triangle" 
                        onChange={DataOnChange}
                        group type="password" 
                        validate
                        error="wrong" 
                        success="right" />
                    </div>
                    <div className="text-center">
                    {
                        props.errormes?
                        <MDBAlert color="danger">
                            {props.errormes}<span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }
                    <MDBBtn rounded color="primary" type='submit' disabled={props.loading}>Sign Up</MDBBtn>
                    <MDBBtn rounded color="primary" type='submit' href='/login'>Sign In</MDBBtn>
                    </div>
                </form>
            </div>
        );

    }

};
const MapstatetoProps=(state)=>{
    return state.SignUp
}

export default connect (MapstatetoProps,{SignUpUser,errormessageclear})(SignUp);