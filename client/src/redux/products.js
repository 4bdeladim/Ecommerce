import { createSlice} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { AddNewProduct, AddToCart, CancelOrder, Checkout, DeleteFromCart, GetCart, GetCategories, GetOrders, GetPopularProducts, GetProduct, GetProducts, NewOrder, UpdateCart} from './actions/products'



const initialState = {
  popular: [],
  products: [],
  product: {},
  pages: [],
  cart: [],
  categories: [],
  localCart: [],
  orders: [],
  loading: false,
  cartLoading: false
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    SetLocalCart(state, action) {
      state.localCart = JSON.parse(localStorage.getItem("cart")) || []
    },
    AddToCartNotLoggedIn(state, action) {
      const productsStored = localStorage.getItem("cart")
      const {productId, quantity, productImg} = action.payload
      const newProductsStored = JSON.parse(productsStored) || []
      newProductsStored.push({productId, quantity, productImg})
      localStorage.setItem("cart", JSON.stringify(newProductsStored))
      state.localCart = JSON.parse(localStorage.getItem("cart"))
    },
    DeleteFromCartNotLoggedIn(state, action) {
      const productsStored = localStorage.getItem("cart")
      const {productId} = action.payload
      const newProducts = JSON.parse(productsStored).filter(e => e.productId !== productId)
      localStorage.setItem("cart", JSON.stringify(newProducts))
      state.localCart = JSON.parse(localStorage.getItem("cart"))
    },
    UpdateFromCartNotLoggedIn(state, action) {
      const {productId, quantity} = action.payload
      console.log(quantity)
      const productsStored = localStorage.getItem("cart")
      const newProductsStored = JSON.parse(productsStored).map(e => {
        if(e.productId === productId) return {
          productId,
          quantity,
          productImg: e.productImg
        }
        return e
      })
      localStorage.setItem("cart", JSON.stringify(newProductsStored))
      state.localCart = JSON.parse(localStorage.getItem("cart"))
    }
  },
  extraReducers: builder => {
      builder
      .addCase(GetPopularProducts.fulfilled, (state, action) => {
          state.loading = false
          state.popular = [...state.popular, action.payload]
      })
      .addCase(GetPopularProducts.pending, (state, action) => {
          state.loading = true
      })
      .addCase(GetProducts.fulfilled, (state, action) => {
          state.loading = false
          state.products = action.payload.products
          state.pages = new Array(action.payload.pages).fill("").map((el, index) => index + 1)
      })
      .addCase(GetProducts.pending, (state, action) => {
          state.loading = true
      })
      .addCase(GetProduct.fulfilled, (state, action) => {
          state.loading = false
          state.product = action.payload
      })
      .addCase(GetProduct.pending, (state, action) => {
          state.loading = true
      })
      .addCase(GetCategories.fulfilled, (state, action) => {
          state.loading = false
          state.categories = action.payload
      })
      .addCase(GetCategories.pending, (state, action) => {
          state.loading = true
      })
      .addCase(GetCart.fulfilled, (state, action) => {
          state.cartLoading = false
          state.cart = action.payload
      })
      .addCase(GetCart.rejected, (state, action) => {
          state.cartLoading = false
      })
      .addCase(GetCart.pending, (state, action) => {
          state.cartLoading = true
      })
      .addCase(DeleteFromCart.fulfilled, (state, action) => {
          state.cartLoading = false
          state.cart = action.payload
      })
      .addCase(DeleteFromCart.rejected, (state, action) => {
          state.cartLoading = false
          Swal.fire({
              title: "Item has not been deleted",
              icon: 'error',
              allowOutsideClick: false
          })
      })
      .addCase(DeleteFromCart.pending, (state, action) => {
          state.cartLoading = true
      })
      .addCase(UpdateCart.fulfilled, (state, action) => {
          state.cart = action.payload
          state.cartLoading = false
      })
      .addCase(UpdateCart.rejected, (state, action) => {
          state.cartLoading = false
      })
      .addCase(UpdateCart.pending, (state, action) => {
          state.cartLoading = true
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
          state.cart = action.payload
          state.cartLoading = false
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.cartLoading = false
        Swal.fire({
            title: action.error,
            icon: "error",
            allowOutsideClick: false,
        })
      })
      .addCase(GetOrders.fulfilled, (state, action) => {
          state.loading = false
          state.orders = action.payload
      })
      .addCase(GetOrders.rejected, (state, action) => {
          state.loading = false
      })
      .addCase(GetOrders.pending, (state, action) => {
          state.loading = true
      })
      .addCase(NewOrder.fulfilled, (state, action) => {
          state.loading = false
          state.orders = action.payload
          window.location.replace("/account")
      })
      .addCase(NewOrder.rejected, (state, action) => {
          state.loading = false
      })
      .addCase(NewOrder.pending, (state, action) => {
          state.loading = true
      })
      .addCase(CancelOrder.fulfilled, (state, action) => {
          state.loading = false
          state.orders = action.payload
      })
      .addCase(CancelOrder.rejected, (state, action) => {
          state.loading = false
      })
      .addCase(CancelOrder.pending, (state, action) => {
          state.loading = true
      })
      .addCase(Checkout.fulfilled, (state, action) => {
          state.loading = false
          window.location.replace(action.payload.url)
      })
      .addCase(Checkout.rejected, (state, action) => {
          state.loading = false
      })
      .addCase(Checkout.pending, (state, action) => {
          state.loading = true
      })
  }
})


const {reducer, actions} = productsSlice
export const {SetLocalCart, AddToCartNotLoggedIn, UpdateFromCartNotLoggedIn, DeleteFromCartNotLoggedIn} = actions

export default reducer