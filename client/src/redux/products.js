import { createSlice, isFulfilled, isRejected, isPending} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AddNewProduct, GetCategories, GetPopularProducts, GetProduct, GetProducts } from './actions/products'


const initialState = {
  popular: [],
  products: [],
  product: {},
  pages: [],
  categories: [],
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

      //Product
      .addMatcher(
        isFulfilled(GetProduct), (state, action) => {
          state.loading = false
          state.product = action.payload
        }
      )
      .addMatcher(
        isRejected(GetProduct), (state, action) => {
          state.loading = false
          // window.location.replace("/notfound")
        }
      )
      .addMatcher(
        isPending(GetProduct), (state, action) => {
          state.loading = true
        }
      )

      //Categories
      .addMatcher(
        isPending(GetCategories), (state, action) => {
          state.loading = true
        }
      )
      .addMatcher(
        isFulfilled(GetCategories), (state, action) => {
          state.loading = false
          state.categories = action.payload
        }
      )
  }
})

export default productsSlice.reducer