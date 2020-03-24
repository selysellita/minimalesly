import React, { Component } from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';
import {API_URL} from './../support/ApiUrl'
import {Table, Button} from 'reactstrap'
import {IconCart} from './../redux/actions'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Redirect, Link } from 'react-router-dom';
const MySwal = withReactContent(Swal)

class Cart extends Component {
    state = { 
        isicart:[]
    }

    componentDidMount(){
        this.getdata()
    }

    getdata=()=>{
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${this.props.User.id}&status=oncart`)
        .then((res)=>{
            console.log(res)
            var newarrforprod=[]            
            res.data[0].transactiondetails.forEach(element => {
               newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`)) 
            });
            console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                console.log(res2)
                res2.forEach((val,index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data
                })
                console.log(res.data[0].transactiondetails)
                this.setState({isicart:res.data[0].transactiondetails})
                console.log(this.state.isicart)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

   
    renderisidata=()=>{
        return this.state.isicart.map((val,index)=>{
            
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{val.dataprod.name}</td>
                    <td ><img src={val.dataprod.image} height='200' alt=""/></td>
                    <td > &nbsp; {val.qty} &nbsp; </td>
                    <td><button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button></td>
                </tr>
            )
        })
    }
    deleteconfirm=(index,id)=>{
        
        MySwal.fire({
            title: `Are you sure wanna delete ${this.state.isicart[index].dataprod.name} ?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Axios.delete(`${API_URL}/transactiondetails/${id}`)
              .then((res)=>{
                  MySwal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  ).then((result)=>{
                      if(result.value){
                        this.getdata()
                        this.props.IconCart(this.props.User.id)
                        
                      }

                  })
              }).catch((err)=>{
                  console.log(err)
              }) 
            }
          })
    }

    render() { 
        return ( 
            this.props.User.islogin? 
            <div className='paddingatas'>
                <Table striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            this.renderisidata()
                        }
                        
                    </tbody>
                </Table>
                <div className='d-flex justify-content-center align-items-center'>
                <Link to='/checkout'>
                    <Button color="primary" size="lg" >Checkout</Button>
                </Link>
                </div>
            </div>
            :
            <Redirect to='/notfound'/>
        );
    }
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth

    }
}
export default connect(MapstatetoProps, {IconCart}) (Cart);