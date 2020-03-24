import React, { useEffect, useState } from 'react';
import Login from './pages/login';
import SignUp from './pages/signup';
import './App.css';
import Header from './component/header'
import {Footer} from './component/footer'
import {Switch, Route} from 'react-router-dom'
import Home from './pages/home'
import Axios from 'axios';
import { API_URL } from './support/ApiUrl';
import { KeepLogin } from './redux/actions';
import { connect } from 'react-redux';
import ManageAdmin from './pages/manageadmin';
import Notfound from './pages/notfound/notfound';
import Productdetail from './pages/productdetail';
import Cart from './pages/cart'
import ChangePassword from './pages/changepassword'
import AllProducts from './pages/allproducts';
import SearchPage from './pages/searchpage';
import Checkout from './pages/checkout';


function App({KeepLogin}) {

  const [Loading,setLoading]=useState(true)

  useEffect(()=>{
    var id=localStorage.getItem('iduser')
    if(id){
      Axios.get (`${API_URL}/users/${id}`)
      .then (res=>{
        KeepLogin (res.data)
      }).catch((err)=>{
        console.log(err)
      }).finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[])
  if(Loading){
    return <div>loading...</div>
  }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={SignUp}/>
        <Route path='/changepassword' exact component={ChangePassword}/>
        <Route path='/manageadmin' exact component={ManageAdmin}/>
        <Route path='/allproducts' exact component={AllProducts}/>
        <Route path='/checkout' exact component={Checkout}/>
        <Route path='/productdetail/:idprod' exact component={Productdetail}/>
        <Route path='/cart' exact component={Cart}/>
        <Route path='/searchpage/:keyword' exact component={SearchPage}/>
        <Route path='/*' component={Notfound}/>
      </Switch>
      <Footer/>
    </div>
  );
}



export default connect(null,{KeepLogin}) (App);
