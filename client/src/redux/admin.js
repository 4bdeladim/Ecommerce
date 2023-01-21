import { createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import { AddCategory, AddNewProduct, DeleteProduct, DeleteUser, GetProduct, GetUsers, UpdateProduct } from "./actions/admin"

const initialState = {
    users: [],
    orders: [],
    product: {},
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
            
            
    }
})

const {reducer, actions} = adminSlice
export const {SelectPage}  = actions
export default reducer