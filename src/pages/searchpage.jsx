import React, { useState,useEffect } from 'react'
import { API_URL } from '../support/ApiUrl'
import Axios from 'axios';
import Numeral from 'numeral';
import {FaCartPlus} from 'react-icons/fa';
import {Link, Redirect} from 'react-router-dom';
import {Card, CardBody, CardTitle, CardSubtitle} from 'reactstrap';


const SearchPage=(props)=>{
    console.log(props)
    console.log(props.match.params.keyword)

    const [products, setproducts]=useState({})
    const [loading, setloading]=useState(true)

    useEffect(()=>{
        Axios.get(`${API_URL}/products?_expand=category&name_like=${props.match.params.keyword}`)
        .then((res)=>{
            console.log(res.data)
            setproducts(res.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(()=>{
            setloading(false)
          })
    },[props.match.params.keyword])



const renderProduct=()=>{
        return(
            products.map((val, index)=>{
                return(
                    <div key={index} className='p-3' style={{width:'20%'}}>
                        <Card>
                            <div style={{height:300,width:'100%'}}>
                                <img src={val.image} height='100%' width='100%' alt=""/>
                                <div className='kotakhitam'>
                                    <Link to={`/productdetail/${val.id}`} className='tombolebuynow'>
                                        <button className='tomboldalam'><FaCartPlus/></button>
                                    </Link>
                                </div>  
                            </div>
                            <CardBody style={{height:150}}>
                                <CardTitle style={{fontWeight:'bold'}} className='mb-2'>{val.name}</CardTitle>
                                <CardSubtitle className='mb-2'>{'Rp.'+Numeral(val.cost).format(0.0)}</CardSubtitle>
                                <button disabled className='rounded-pill px-2 btn-primary' >{val.category.name}</button>
                            </CardBody>
                        </Card>
                    </div>
                )
            })
        )
    }

    if(loading){
        return (
            <div className="mt-5" style={{display:"flex", height:"50vh", justifyContent:"center", alignItems:"center"}}>
                Loading...
            </div>
        )
    }

    return (
            props.match.params.keyword?
            <div style={{justifyContent:"space-evenly"}} className="mt-5 py-5 px-5">
                <h2>Search Result for "{props.match.params.keyword}"</h2>
                    <div className="d-flex flex-wrap">
                        {
                            renderProduct()
                        }           
                    </div>
            </div>
            :
            <Redirect to="/allproducts"/>
       
    )
}

 
export default SearchPage;