import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api";
import { GetProducts } from "../products";


export const GetUsers = createAsyncThunk(
    "admin/getusers",
    async () => {
        try {
            const { data } = await api.APIgetUsers()
            return data
        } catch (error) {
            return error.response.data || "Something went wrong"
        }
    }
)

export const DeleteProduct = createAsyncThunk(
    "admin/deleteProducts", 
    async (info, {dispatch}) => {
        try {
            const {id} = info
            const { data } = await api.APIdeleteProduct(id)
            dispatch(GetProducts(info.data))
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
) 

export const AddNewProduct = createAsyncThunk(
    "admin/addProduct",
    async (info, {dispatch}) => {
        try {
            const {name, description, price, category, image, amountInInventory} = info
            const { data } = await api.APIaddNewProduct(name, description, price, category, image, amountInInventory)
            dispatch(GetProducts(info.data))
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)