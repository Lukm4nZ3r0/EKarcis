import axios from 'axios'
import URL from './URL'

export const getProductByCategory = (idCategory) =>{
    
    return{
        type: 'GET_PRODUCT_BY_CATEGORY',
        payload: axios.get(`${URL}/products/${idCategory}`)
    }
}

export const getProductById = (id) => {
  return{
    type: 'GET_PRODUCT_BY_ID',
    payload: axios.get(`${URL}/products/getById/${id}`)
  }
}

export const getAllCartItems = (id) =>{
  return{
    type: 'GET_CART_ITEMS',
    payload: axios.get(`${URL}/tmpCart/users/${id}`)
  }
}

export const addToCart = (productId,userId) =>{
  console.log('dari action', productId);
  // let a = [];
  // a.push({ field : 'products', value: [productId ] });
  console.log('sebelum input', productId);
  
  return{
    type: 'ADD_TO_CART',
    payload : axios.patch(`${URL}/tmpCart/${userId}`, productId )
  }
}

export const checkoutPembelian = ({cartItem, userId, total}) => {
  console.log(cartItem);
  
  const body = {
    products: cartItem, 
    id_user: userId, 
    total: total
  }
  return {
    type: 'CHECKOUT_PEMBELIAN',
    payload: axios.post(`${URL}/transactions/`, body)
  }
}