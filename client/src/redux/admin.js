import { createSlice } from "@reduxjs/toolkit"
import Swal from "sweetalert2"
import { AddNewProduct, DeleteProduct, GetUsers } from "./actions/admin"

const initialState = {
    users: [],
    products: [],
    orders: [],
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
    }
})

const {reducer, actions} = adminSlice
export const {SelectPage}  = actions
export default reducer