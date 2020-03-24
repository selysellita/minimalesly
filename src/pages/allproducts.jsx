import React, { Component } from 'react';
import { API_URL } from '../support/ApiUrl';
import { Redirect } from 'react-router-dom';
import {FaArrowAltCircleRight,} from 'react-icons/fa';
import {Table, Button} from 'reactstrap'
import Axios from 'axios';
import Numeral from 'numeral';
import {FaCartPlus} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {
    Card, CardBody,
    CardTitle, CardSubtitle
  } from 'reactstrap';

class AllProducts extends Component {
    state = { 
        keyword:'',
        products:[],
        issearch:false,
        isfilter:false
    }

    componentDidMount(){
        Axios.get(`${API_URL}/products?_expand=category`)
        .then((res)=>{
            Axios.get(`${API_URL}/categories`)
            .then((categories)=>{
                this.setState({products:res.data,categoriess:categories.data})
            })
            
        }).catch((err)=>{
            console.log(err)
        })
    }

 
    renderProducts=()=>{
        return this.state.products.map((val,index)=>{
            // if()
            return (
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
    }

    onchangesearch=()=>{
        
        var inputName=this.name.value
        var hasilFilter=this.state.products.filter((produk)=>{
            return (
                produk.name.toLowerCase().includes(inputName.toLowerCase())                
            )
        })
        
        this.setState({products:hasilFilter})
        console.log(this.state.products)
        console.log(this.state.categoriess)
    }
       

    onClickCategory= e =>{
        var kategori=e.target.value
        var hasilFilter=this.state.categoriess.filter((val)=>{
            return (
                val.name.toLowerCase().includes(kategori.toLowerCase())                
            )
        })
        this.setState({categoriess:hasilFilter}) 
        console.log(this.state.categoriess)   
    }

    render() { 
        return ( 
            <div className='paddingatas'>
                <div className='padding atas d-flex md-4'>
                    <input onChange={this.onchangesearch} ref={(input)=>{this.name=input}} placeholder='Cari Produk'/>
                </div>
                <div>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='all'>All Categories</Button>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='outers'>Outers</Button>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='bottoms'>Bottoms</Button>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='tops'>Tops</Button>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='pants'>Pants</Button>
                    <Button onClick={(e) => this.onClickCategory(e,'value')} outline color="primary" value='skirts'>Skirts</Button>
                    </div>
                <div className='px-2 pt-3'>
                    <div style={{alignItems:'center', justifyContent:'center'}}><h3>Our Products <FaArrowAltCircleRight/></h3></div>
                    <div className="d-flex flex-wrap">
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
         );
    }
}
 
export default AllProducts;