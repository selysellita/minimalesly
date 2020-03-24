import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import Axios from 'axios'
import {API_URL} from './../support/ApiUrl'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ChangePassword extends Component {
    state = { 
        username:'',
        inputpassword:'',
        password:'',
        newpassword:'',
        newpasswordconfirm:''
    }
    
    componentDidMount(){
        Axios.get(`${API_URL}/users/${this.props.User.id}`)
        .then((res)=>{
            console.log(res)
            // this.setState({username:res.data.username,password:res.data.password})
        }).catch((err)=>{
            console.log(err)
        })
    }

    DataOnChange=(e)=>{       
        console.log(e.target)
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state.inputpassword.value)
    }

    onFormSubmit=(e)=>{
        e.preventDefault()        
    }

    onBtnChangePasswordClick=({username,inputpassword,newpassword,newpasswordconfirm})=>{
        var username=this.state.username.value 
        var inputpassword=this.state.inputpassword.value
        var newpassword=this.state.newpassword.value        
        var newpasswordconfirm=this.state.newpasswordconfirm.value
        // var obj={
        //     username:username,
        //     password:newpassword}
        var id=this.props.User.id

            if(username===''||inputpassword===''||newpassword===''||newpasswordconfirm===''){
                alert('Data tidak boleh kosong!')
            }else {
                if((username===this.props.User.username) && (inputpassword===this.props.User.password) && (newpassword===newpasswordconfirm)){  
                    // Axios.get(`${API_URL}/users/${id}`)
                    // .then((res)=>{
                    //     console.log(res)            
                    //     // console.log(obj,id)
                        Axios.patch(`${API_URL}/users/${id}`,{password:newpassword})
                        .then((res2)=>{
                            console.log(res2.data)
                            alert('Password changed! Please Sign In Again')
                            localStorage.clear()
                        }).catch((err2)=>{
                            console.log(err2)
                        })
                    // }).catch((err)=>{
                    //     console.log(err)
                    // })        
                }else{
                    alert('Data User tidak sesuai!')    
                }
            }
    }

    render() { 
        return ( 
            this.props.User.islogin?
            <div className="paddingatas " >
                <div className='d-flex justify-content-center align-items-center'>
                <MDBContainer>
                    <MDBRow center>
                        <MDBCol md="5">
                        <MDBCard>
                            <MDBCardBody>
                            <form onSubmit={this.onFormSubmit}>
                                <p className="h4 text-center py-4">Change Password</p>
                                <div className="grey-text">
                                <MDBInput
                                    name="username"
                                    label="Your Username"
                                    onChange= {this.DataOnChange}
                                    icon="user"
                                    group
                                    type="text"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    name="inputpassword"
                                    label="Your Password"
                                    // value={this.state.password}
                                    onChange= {this.DataOnChange}
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    error="wrong"
                                    success="right"
                                />
                                <MDBInput
                                    name="newpassword"
                                    label="Enter New Password"
                                    // value={this.state.newpassword}
                                    onChange= {this.DataOnChange}
                                    icon="lock"
                                    group
                                    type="password"
                                    validate
                                    error="wrong"
                                />
                                <MDBInput
                                    name="newpasswordconfirm"
                                    label="Confirm Your New Password"
                                    // value={this.state.newpasswordconfirm}
                                    onChange= {this.DataOnChange}
                                    icon="exclamation-triangle"
                                    group
                                    type="password"
                                    validate
                                />
                                </div>
                                <div className="text-center py-4 mt-3">
                                <MDBBtn color="cyan"  onClick={this.onBtnChangePasswordClick}>
                                    Change Password
                                </MDBBtn>
                                <MDBBtn color="cyan" href='/'>
                                    Cancel
                                </MDBBtn>
                                </div>
                            </form>
                            </MDBCardBody>
                        </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
            </div>
            :
            <Redirect to='/notfound'/>
         );
    }
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
    }
}
export default connect (MapstatetoProps) (ChangePassword);