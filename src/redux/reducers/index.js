import {combineReducers} from 'redux'
import Authreducers from './Authreducers'
import Headerreducers from './Headerreducers'
import SignUpReducers from './SignUpReducers'


export default combineReducers({
    Auth:Authreducers,
    Header:Headerreducers,
    SignUp:SignUpReducers,
   
})