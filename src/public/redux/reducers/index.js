import {combineReducers} from 'redux'
import user from './user'
import products from './products'

const appReducer = combineReducers({
    user,
    products
})

export default appReducer