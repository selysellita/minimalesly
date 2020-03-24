import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, 
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBNavLink, MDBIcon
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import {BukanHome,IniHome,IconCart} from './../redux/actions'
import {Link} from 'react-router-dom';

 


class Header extends Component {
state = {
  isOpen: false,
  keyword:''
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

signOutBtnOnClick=()=>{
  localStorage.clear()
}

onKeyChange = (e) => {
  this.setState({keyword:e.target.value})
  console.log(this.state.keyword)
}

onSearchClick=()=>{
  this.refs.keyword.value=""

}

render() {
  return (
      <MDBNavbar color="black" transparent={this.props.Header.ishome} scrolling className='bordernav' dark fixed='top' expand="md">        
          <MDBNavbarBrand href='/'>
            <strong className={'white-text'}>Minimales</strong>
          </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>          
              <form className="form-inline" style={{width:'500px'}}  >
                
                   <input name="keyword" ref="keyword" className="form-control form-control-sm ml-1" style={{width:"90%"}} onChange={this.onKeyChange} type="text" placeholder="Search Product" aria-label="Search" id="search-input"  /> 
                
                <div  className='ml-1'>
                <Link to={`/searchpage/${this.state.keyword}`} onClick={this.onSearchClick}>
                <MDBIcon type='submit' icon="search" style={{fontSize:20,color:'white'}} />
                </Link>
                </div>
              </form>   
          </MDBNavbarNav>
          <MDBNavbarNav right>
              <MDBNavItem active>
                {
                  this.props.User.islogin?
                  null
                  :
                  <MDBNavLink to='/login'>
                      Sign In
                  </MDBNavLink>
                }
                {
                  this.props.User.role==='admin'?
                  <MDBNavLink to='/manageadmin'>
                  Manage Admin
                  </MDBNavLink>
                  :
                  null
                }
              </MDBNavItem>
              <MDBNavItem>
                {
                  this.props.User.islogin&&this.props.User.role==='user'?
                  <MDBNavLink to='/cart' style={{color:'white',fontSize:20}}>
                    {this.props.Header.cart}<FiShoppingCart style={{fontSize:20}} />
                    {console.log(this.props.Header.cart)}
                  </MDBNavLink>
                  :
                  null
                } 

              </MDBNavItem>
              <MDBNavItem >                
                {
                  this.props.User.username?
                  <MDBDropdown >
                      <MDBDropdownToggle nav className='warnanav'>
                          <FaUserCircle/> Hello {this.props.User.username}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className='dropdown1' >
                          <MDBDropdownItem href="/changepassword">Change Password</MDBDropdownItem>
                          <MDBDropdownItem href="/" onClick={this.signOutBtnOnClick}>Sign Out</MDBDropdownItem>
                          {/* <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                      </MDBDropdownMenu>
                  </MDBDropdown>
                  :
                  null
                }
              </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

const MapstatetoProps=(state)=>{
  return{
      User:state.Auth,
      Header:state.Header,
      // Header:state.Header.ishome,
      
      
  }
}

export default connect(MapstatetoProps,{IniHome,BukanHome,IconCart}) (Header);