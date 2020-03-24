import React, { Component } from 'react';
import {Table, Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import Axios from 'axios';
import { API_URL } from '../support/ApiUrl';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
const MySwal= withReactContent(Swal)

class ManageAdmin extends Component {
    state = { 
        products:[],
        isModalEditOpen:false,
        isModalAddOpen:false,
        indexdelete:-1,
        indexedit:0,
        categoriess:[]
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

    toggleadd=()=>{
        this.setState({isModalAddOpen:!this.state.isModalAddOpen})
    }

    toggleedit=()=>{
        this.setState({isModalEditOpen:!this.state.isModalEditOpen})

    }

    onSaveAddDataClick=()=>{
        var nameadd=this.refs.nameadd.value
        var imageadd=this.refs.imageadd.value
        var stockadd=parseInt(this.refs.stockadd.value)
        var categoryadd=parseInt(this.refs.categoryadd.value)
        var costadd=parseInt(this.refs.costadd.value)
        var descriptionadd=this.refs.descriptionadd.value
        var obj={
            name:nameadd,
            image:imageadd,
            stock:stockadd,
            categoryId:categoryadd,
            cost:costadd,
            description:descriptionadd
        }
        Axios.post(`${API_URL}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_URL}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModalAddOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })  
    }

    deleteconfirm=(index,id)=>{
        MySwal.fire({
            title: `Are you sure want to delete ${this.state.products[index].name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                Axios.delete(`${API_URL}/products/${id}`)
                .then((res)=>{
                    MySwal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((result)=>{
                        if(result.value){
                            Axios.get(`${API_URL}/products`)
                            .then((res1)=>{
                                this.setState({products:res1.data})
                            })
                        }
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
          })
    }

    onEditClick=(index)=>{
        this.setState({indexedit:index,isModalEditOpen:true})
    }

    onSaveEditDataClick=()=>{
        var nameedit=this.refs.nameedit.value
        var imageedit=this.refs.imageedit.value
        var stockedit=parseInt(this.refs.stockedit.value)
        var categoryedit=parseInt(this.refs.categoryedit.value)
        var costedit=parseInt(this.refs.costedit.value)
        var descriptionedit=this.refs.descriptionedit.value
        var obj={
            name:nameedit,
            image:imageedit,
            stock:stockedit,
            categoryId:categoryedit,
            cost:costedit,
            description:descriptionedit
        }
        var id=this.state.products[this.state.indexedit].id
        console.log(obj,id)
        Axios.put(`${API_URL}/products/${id}`,obj)
        .then((res)=>{
            console.log(res.data)
            Axios.get(`${API_URL}/products?_expand=category`)
            .then((resakhir)=>{
                this.setState({products:resakhir.data,isModalEditOpen:false})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })  
    }

    renderProducts=()=>{
        const {products}=this.state
        return products.map((val,index)=>{
            return (
                <tr key={index}>
                    <th scope="row">{index+1}</th>
                    <td>{val.name}</td>
                    <td><img src={val.image} alt={val.name} width='180' height='200px' /></td>
                    <td>{val.stock}</td>
                    <td>{val.category.name}</td>
                    <td>{val.cost}</td>
                    <td>{val.description}</td>
                    <td>
                        <button className='btn btn-warning' onClick={()=>this.onEditClick(index)}>Edit</button>
                        <button className='btn btn-danger' onClick={()=>this.deleteconfirm(index,val.id)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderCategoryToAdd=()=>{
        return this.state.categoriess.map((val,index)=>{
            return <option key={index} value={val.id}>{val.name}</option>
        })
    }

    render() { 
        const {indexedit,products}=this.state
        return (  
            this.props.User.islogin&&this.props.User.role==='admin'?
            <div className='paddingatas'>
                <Modal isOpen={this.state.isModalAddOpen} toggle={this.toggleadd}>
                    <ModalHeader toggle={this.toggleadd}>Add Product</ModalHeader>
                    <ModalBody>
                        <input type="text" ref='nameadd' placeholder='Product Name' className='form-control mt-2'/>
                        <input type="text" ref='imageadd' placeholder='Image URL' className='form-control mt-2'/>
                        <input type="number" ref='stockadd' placeholder='Product Stock' className='form-control mt-2'/>
                        <select ref='categoryadd' className='form-control mt-2'>
                            <option value="" hidden>Pilih Category</option>
                            {this.renderCategoryToAdd()}
                        </select>
                        <input type="number" ref='costadd' placeholder='Product Cost' className='form-control mt-2'/>
                        <textarea cols='20' rows='5' ref='descriptionadd' placeholder='Type the description...' className='form-control mt-2' ></textarea>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={this.onSaveAddDataClick}>Add Data</Button>
                    <Button color="secondary" onClick={this.toggleadd}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                {
                this.state.products.length?
                <Modal isOpen={this.state.isModalEditOpen} toggle={this.toggleedit}>
                    <ModalHeader toggle={this.toggleedit}>Edit Product</ModalHeader>
                    <ModalBody>
                        <input type="text" ref='nameedit' placeholder='Product Name' defaultValue={products[indexedit].name} className='form-control mt-2'/>
                        <input type="text" ref='imageedit' placeholder='Image URL' defaultValue={products[indexedit].image} className='form-control mt-2'/>
                        <input type="number" ref='stockedit' placeholder='Product Stock' defaultValue={products[indexedit].stock} className='form-control mt-2'/>
                        <select ref='categoryedit' className='form-control mt-2' defaultValue={products[indexedit].categoryId} >
                            <option value="" hidden>Pilih Category</option>
                            {this.renderCategoryToAdd()}
                        </select>
                        <input type="number" ref='costedit' placeholder='Product Cost' className='form-control mt-2' defaultValue={products[indexedit].cost} />
                        <textarea cols='20' rows='5' ref='descriptionedit'  placeholder='Type the description...' className='form-control mt-2' defaultValue={products[indexedit].description} ></textarea>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSaveEditDataClick}>Save Data</Button>
                        <Button color="secondary" onClick={this.toggleedit}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                :
                null
                }
                <button className='btn btn-primary' onClick={this.toggleadd}>Add Data</button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Stock</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProducts()}
                    </tbody>
                </Table>
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

export default connect(MapstatetoProps) (ManageAdmin);