import {API_URL} from './../../support/ApiUrl'
import Axios from 'axios'

export const IniHome=()=>{
    console.log('inihome')
    return{
        type:'INIHOME'
    }
}
export const BukanHome=()=>{
    return{
        type:'BUKANHOME'
    }
}

export const IconCart=(id)=>{
    console.log(id)
    return (dispatch)=>{
        // dispatch ({type:"CART_START"})
        Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${id}&status=oncart`)
        .then((res)=>{
            // axios.get hasilnya objek, axios.all hasilnya array
            var newarrforprod=[]
            res.data[0].transactiondetails.forEach(element =>{
                newarrforprod.push(Axios.get(`${API_URL}/products/${element.productId}`))
            })
            console.log(newarrforprod)
            Axios.all(newarrforprod)
            .then((res2)=>{
                console.log(res2)
                res2.forEach((val, index)=>{
                    res.data[0].transactiondetails[index].dataprod=val.data //buat masukin data ke objeknya
                })
                // console.log(res.data[0].transactiondetails)
                // this.setState({isicart:res.data[0].transactiondetails})
                let total=0
                res.data[0].transactiondetails.forEach((val)=>{
                    total+=val.qty
                })
                dispatch({type:"COUNT_CART",payload: total})
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
}