import { createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import { AddCategory, AddNewProduct, Ban, DeleteProduct, DeleteUser, EditUserInfo, GetOrderesStats, GetProduct, GetProductSales, GetTopProduct, GetTopUser, GetUser, GetUsers, GetUsersStats, SendEmail, UnBan, UpdateProduct } from "./actions/admin"

const initialState = {
    users: [],
    user: {},
    orders: [],
    product: {},
    stats: {
        users:{
            dailyUsers: 0,
            finalList: []
        },
        orderes:{
            finalList: [],
            dialyorders: 0,
            
        },
        topProduct: null,
        topUser: {
            topUser:null,
            price: 0
        },
        productSales: {
            dialyorders: 0,
            finalList: [],
            productName: null,
            id: null
        }
    },
    selectedPage: "Users"
}


export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        SelectPage(state, action){
            state.selectedPage = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(GetUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
            .addCase(GetUsers.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon: "error"
                })
            })
            .addCase(DeleteProduct.fulfilled, (state , action) => {
                Swal.fire({
                    title: "Product deleted",
                    icon: "success"
                })
            })
            .addCase(DeleteProduct.rejected, (state, action) => {
                Swal.fire({
                    title:action.error,
                    icon: "error"
                })
            })
            .addCase(AddNewProduct.fulfilled, (state, action) => {
                Swal.fire({
                    title:action.payload,
                    icon:"success"
                })
            })
            .addCase(AddNewProduct.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(DeleteUser.fulfilled, (state, action) => {
                Swal.fire({
                    title:action.payload,
                    icon:"success"
                })
            })
            .addCase(DeleteUser.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(AddCategory.fulfilled, (state, action) => {
                Swal.fire({
                    title:action.payload,
                    icon:"success"
                })
            })
            .addCase(AddCategory.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetProduct.pending, (state, action) => {
                state.product = {}
            })
            .addCase(GetProduct.fulfilled, (state, action) => {
                state.product = action.payload
            })
            .addCase(GetProduct.rejected, (state, action) => {
                state.product = {}
            })
           
            .addCase(UpdateProduct.fulfilled, (state, action) => {
                Swal.fire({
                    title: action.payload,
                    icon: "success"
                })
            })
            .addCase(UpdateProduct.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon: "error"
                })
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.user = action.payload
            })
            .addCase(GetUser.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon: "error"
                })
            })
            .addCase(EditUserInfo.fulfilled, (state, action) => {
                Swal.fire({
                    title: action.payload,
                    icon:"success"
                })
            })
            .addCase(EditUserInfo.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(Ban.fulfilled, (state, action) => {
                Swal.fire({
                    title: action.payload,
                    icon:"success"
                })
            })
            .addCase(Ban.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(UnBan.fulfilled, (state, action) => {
                Swal.fire({
                    title: action.payload,
                    icon:"success"
                })
            })
            .addCase(UnBan.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(SendEmail.fulfilled, (state, action) => {
                Swal.fire({
                    title: action.payload,
                    icon:"success"
                })
            })
            .addCase(SendEmail.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetUsersStats.fulfilled, (state, action) => {
                console.log(action.payload)
                state.stats.users = action.payload
                
            })
            .addCase(GetUsersStats.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetOrderesStats.fulfilled, (state, action) => {
                state.stats.orderes = action.payload
            })
            .addCase(GetOrderesStats.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetProductSales.fulfilled, (state, action) => {
                state.stats.productSales = action.payload
            })
            .addCase(GetProductSales.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetTopProduct.fulfilled, (state, action) => {
                state.stats.topProduct = action.payload
            })
            .addCase(GetTopProduct.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            .addCase(GetTopUser.fulfilled, (state, action) => {
                state.stats.topUser = action.payload
            })
            .addCase(GetTopUser.rejected, (state, action) => {
                Swal.fire({
                    title: action.error,
                    icon:"error"
                })
            })
            



            
            
    }
})

const {reducer, actions} = adminSlice
export const {SelectPage}  = actions
export default reducer