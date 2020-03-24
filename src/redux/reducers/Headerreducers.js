  
const INITIAL_STATE={
    ishome:false,
    loading:false,
    cart:0
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'BUKANHOME': 
            return {...state,ishome:false}
        case 'INIHOME':
            return {...state,ishome:true}
        case "COUNT_CART" :
            return{...state, loading:false,cart:+action.payload}
        default:
            return state
    }
}
