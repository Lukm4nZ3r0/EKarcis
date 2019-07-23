import axios from 'axios'
import URL from './URL'

export const login = (dataLogin) => {
    return{
        type: 'POST_USER',
        payload: axios.post(`${URL}/users/login`,
            { email: dataLogin.email,
              password: dataLogin.password
        })
    }
}
export const autoLogin = () =>{
    return{
        type: 'LOGIN_WITH_ASYNCSTORAGE',
        payload: true
    }
}
export const setUserDataWithAsyncStorage = () =>{
    return{
        type: 'SETUP_USERDATA_WITH_ASYNCSTORAGE',
        payload: true
    }
}
export const register = (data) => {
    return{
        type: 'POST_REGISTER',
        payload: axios.post(`${URL}/users/register`,
            { 
                email: data.email,
                password: data.password,
                name: data.name,
                gender: data.gender,
                phone: data.phone,
                birthDate: data.birthDate,
                role: data.role
            })
    }
}
export const getAllCategories = () => {
    return{
        type: 'GET_CATEGORIES',
        payload: axios.get(`${URL}/categories`)
    }
}
export const getWishList = (id) => {
    return{
        type: 'GET_WISHLIST',
        payload: axios.get(`${URL}/wishlist/${id}`)
    }
}
export const addWishList = (id,wishlist) => {
    return{
        type: 'ADD_WISHLIST',
        payload: axios.patch(`${URL}/wishlist/${id}`,
        [
            {"field": "productId", "value": wishlist}
        ])
    }
}
export const getProductByCategory = (idCategory) =>{
    return{
        type: 'GET_PRODUCT_BY_CATEGORY',
        payload: axios.get(`${URL}/products/${idCategory}`)
    }
}

export const postProduct = (data) => {

    const { name, price, location, pCategory, stock, pSID, condition, productWeight, countryOfOrigin, warranty, image } = data;
    let upload = new FormData();
    console.log('bisa di state 1', upload);
    // upload.set('name', name);
    upload.append('name', name);
    upload.append('price', price);
    upload.append('location', location);
    upload.append('pCategory', pCategory);
    upload.append('stock', stock);
    upload.append('pSID', pSID);
    upload.append('condition', condition);
    upload.append('productWeight', productWeight);
    upload.append('countryOfOrigin', countryOfOrigin);
    upload.append('warranty', warranty);
    upload.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: 'image/jpg'
    });
    
    return {
        type: 'POST_NEW_PRODUCT',
        payload: axios.post(`${URL}/products/`, upload)

    }
}

export const profile = (id) => {
    return{
        type: 'GET_PROFILE',
        payload: axios.get(`${URL}/users/${id}`)

    }
}

export const logout = () =>{
    return {
        type: 'LOGOUT',
        payload: false
    }
}

export const editAlamat = (data, id) => {
    console.log(data);
 
    return {
        type: 'PATCH_EDIT_ALAMAT',
        payload: axios.patch(`${URL}/users/${id}`, {alamat: data})
    }

}
