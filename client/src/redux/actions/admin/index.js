import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api";
import { GetCategories, GetProducts } from "../products";


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


export const DeleteUser = createAsyncThunk(
    "admin/deleteUser",
    async (id, {dispatch}) => {
        try {
            const { data } = await api.APIDeleteUser(id)
            dispatch(GetUsers())
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const AddCategory = createAsyncThunk(
    "admin/addCategory",
    async (name, {dispatch}) => {
        try {
            const { data } = await api.APIaddNewCategory(name)
            dispatch(GetCategories())
            return data
        } catch (error) {
           
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetProduct = createAsyncThunk(
    "admin/getProduct", 
    async (id) => {
        try {
            const { data } = await api.APIadminGetProduct(id)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const UpdateProduct = createAsyncThunk(
    "admin/updateProduct",
    async (info, {dispatch}) => {
        try {
            const { _id , name, description, price, category, image, amountInInventory, filters} = info
            const { data } = await api.APIupdateProduct(_id, name, description, price, category, image, amountInInventory)
            dispatch(GetProducts(filters))
            return data
        } catch (error) {
            
            throw error.response.data || "Something went wrong"
        }
    }
)