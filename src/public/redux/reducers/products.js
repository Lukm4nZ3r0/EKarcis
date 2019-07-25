const initialState = {
  isLoading:false,
  productsByCategory: [],
  productById: [],
  totalPrice:0,
  cartItem:[],
  cartItemProductId:[],
  dataCheckOut: []
}
export default products = (state = initialState, action)=>{
  switch(action.type){
      case 'GET_PRODUCT_BY_ID':
      case 'GET_PRODUCT_BY_CATEGORY_PENDING':
      case 'GET_CART_ITEMS_PENDING':
      case 'ADD_TO_CART_PENDING':
          return{
              ...state,
              isLoading:true,
          }
      case 'GET_PRODUCT_BY_ID_REJECTED':
      case 'GET_PRODUCT_BY_CATEGORY_REJECTED':
      case 'GET_CART_ITEMS_REJECTED':
          console.log('cart reject')
      case 'ADD_TO_CART_REJECTED':
          return{
              ...state,
              isLoading:false,
          }
      case 'GET_PRODUCT_BY_ID_FULFILLED':
          return{
              ...state,
              isLoading:false,
              productById: action.payload.data.data
          }
      case 'GET_PRODUCT_BY_CATEGORY_FULFILLED':
          return{
              ...state,
              isLoading:false,
              productsByCategory: action.payload.data.data
          }
      case 'GET_CART_ITEMS_FULFILLED':
          console.log('cart fulfil',action.payload.data.data.products)
          return{
              ...state,
              cartItem: action.payload.data.data.products,
              dataCheckOut: [],
              isLoading:false
            //   cartItemProductId: action.payload.data.data.products._id,
            }
          
          
      case 'ADD_TO_CART_FULFILLED':
          return{
              ...state,
            //   cartItem: [...state.cartItem, ...action.payload.data]
          }
      default:
          return state
  }
}