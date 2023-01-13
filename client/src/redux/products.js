import { createSlice, isFulfilled, isRejected, isPending} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AddNewProduct, AddToCart, CancelOrder, DeleteFromCart, GetCart, GetCategories, GetOrders, GetPopularProducts, GetProduct, GetProducts, NewOrder, UpdateCart } from './actions/products'



const initialState = {
  popular: [],
  products: [],
  product: {},
  pages: [],
  cart: [],
  categories: [],
  orders: [],
  loading: false,
  cartLoading: false
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {
    [GetPopularProducts.fulfilled]: (state, action) => {
      state.loading = false
      state.popular = [...state.popular, action.payload]
    },
    [GetPopularProducts.pending]: (state, action) => {
      state.loading = true
    },

    [GetProducts.fulfilled]:(state, action) => {
      state.loading = false
      state.products = action.payload.products
      state.pages = new Array(action.payload.pages).fill("").map((el, index) => index + 1)
    },
    [GetProducts.pending]:  (state, action) => {
      state.loading = true
    },
    [GetProduct.fulfilled]: (state, action) => {
      state.loading = false
      state.product = action.payload
    },
    [GetProduct.pending]: (state, action) => {
      state.loading = true
    },
    [GetCategories.fulfilled]: (state, action) => {
      state.loading = false
      state.categories = action.payload
    },
    [GetCategories.pending]: (state, action) => {
      state.loading = true
    },
    [GetCart.fulfilled]: (state, action) => {
      state.cartLoading = false
      state.cart = action.payload
    },
    [GetCart.rejected]: (state, action) => {
      state.cartLoading = false
      state.cart = JSON.parse(localStorage.getItem("cart"))
    },
    [GetCart.pending]: (state, action) => {
      state.cartLoading = true
    },
    [DeleteFromCart.fulfilled]: (state, action) => {
      state.cartLoading = false
      state.cart = action.payload
    },
    [DeleteFromCart.rejected]: (state, action) => {
      state.cartLoading = false
      Swal.fire({
        title:"Item has not been deleted",
        icon: 'error',
        allowOutsideClick: false
      })
    },
    [DeleteFromCart.pending]: (state, action) => {
      state.cartLoading = true
    },
    [UpdateCart.fulfilled]: (state, action) => {
      state.cart = action.payload
      state.cartLoading = false
    },
    [UpdateCart.rejected]: (state, action) => {
      state.cartLoading = false
    },
    [UpdateCart.pending]: (state, action) => {
      state.cartLoading = true
    },
    [AddToCart.fulfilled]: (state, action) => {
      state.cart = action.payload
      state.cartLoading = false
    },
    [AddToCart.rejected]: (state, action) => {
      state.cartLoading = false
      Swal.fire({
        title: action.error,
        icon: "error",
        allowOutsideClick: false,
      })
    },
    [GetOrders.fulfilled]: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    [GetOrders.rejected]: (state, action) => {
      state.loading = false
    },
    [GetOrders.pending]: (state, action) => {
      state.loading = true
    },
    [NewOrder.fulfilled]: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    [NewOrder.rejected]: (state, action) => {
      state.loading = false
    },
    [NewOrder.pending]: (state, action) => {
      state.loading = true
    },
    [CancelOrder.fulfilled]: (state, action) => {
      state.loading = false
      state.orders = action.payload
    },
    [CancelOrder.rejected]: (state, action) => {
      state.loading = false
    },
    [CancelOrder.pending]: (state, action) => {
      state.loading = true
    }
  }
})

export default productsSlice.reducer