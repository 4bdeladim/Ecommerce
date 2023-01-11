import { createSlice, isFulfilled, isRejected, isPending} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import {signIn,verify,signUp, sendRecoveryLink, checkRecoveryLink, changePassword, CheckLogin} from "./actions/auth"
import { AddNewProduct, GetPopularProducts, GetProducts } from './actions/products'


const initialState = {
  popular: [],
  products: [],
  pages: [],
  loading: false
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isFulfilled(GetPopularProducts), (state, action) => {
          state.loading = false
          state.popular = [...state.popular, action.payload]
        }
      )
      .addMatcher(
        isRejected(GetPopularProducts), (state, action) => {
          console.log(action.error)
        }
      )
      .addMatcher(
        isPending(GetPopularProducts), (state, action) => {
          state.loading = true
        }
      )

      //Get products 

      .addMatcher(
        isFulfilled(GetProducts), (state, action) => {
          state.loading = false
          state.products = action.payload.products
          state.pages = new Array(action.payload.pages).fill("").map((el, index) => index + 1)
        }
      )
      .addMatcher(
        isRejected(GetProducts), (state, action) => {
          state.loading = false
          Swal.fire({
            title:action.error,
            icon: "error",
            allowOutsideClick: false
          }).then(res => window.location.replace("/"))
        }
      )
      .addMatcher(
        isPending(GetProducts), (state, action) => {
          state.loading = true
        }
      )
  }
})

export default productsSlice.reducer