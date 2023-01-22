
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

export const MakeUserAdmin = createAsyncThunk(
    "admin/makeUserAdmin",
    async (id, {dispatch}) => {
        try {
            const { data } = await api.APImakeUserAdmin(id)
            dispatch(GetUsers())
            return data
        } catch (error) {
            
        }
    }
)

export const MakeAdminUser = createAsyncThunk(
    "admin/makeAdminUser",
    async (id, {dispatch}) => {
        try {
            const { data } = await api.APImakeAdminUser(id)
            dispatch(GetUsers())
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const Ban = createAsyncThunk(
    "admin/ban",
    async (id, {dispatch}) => {
        try {
            const { data } = await api.APIbanUser(id)
            dispatch(GetUsers())
            return data 
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const UnBan = createAsyncThunk(
    "admin/unban",
    async (id, {dispatch}) => {
        try {
            const { data } = await api.APIUnbanUser(id)
            dispatch(GetUsers())
            return data 
        } catch (error) {
            console.log(error)
            throw error.response.data || "Something went wrong"
        }
    }
)

export const EditUserInfo = createAsyncThunk(
    "admin/editUser",
    async (info, {dispatch}) => {
        try {

            const {id, username, SBadress, email} = info
            const { data } = api.APIeditUserInfo(id, username, SBadress, email)
            dispatch(GetUsers())
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const SendEmail = createAsyncThunk(
    "admin/sendEmail",
    async (info) => {
        try {
            const { id, messageTitle, message} = info
            const { data } = await api.APIsendEmail(id, messageTitle, message)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetUser = createAsyncThunk(
    "admin/getUser",
    async (id) => {
        try {
            const { data } = await api.APIgetUser(id)
            
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetUsersStats = createAsyncThunk(
    "admin/usersStats",
    async () => {
        try {
            const { data } = await api.APIgetUsersStats()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const GetOrderesStats = createAsyncThunk(
    "admin/orderesStats",
    async () => {
        try {
            const { data } = await api.APIgetOrderssStats()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetTopProduct = createAsyncThunk(
    "admin/topProduct",
    async () => {
        try {
            const { data } = await api.APIgetTopProduct()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetTopUser = createAsyncThunk(
    "admin/topUser",
    async () => {
        try {
            const { data } = await api.APIgetTopUser()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetProductSales = createAsyncThunk(
    "admin/productSales",
    async (id) => {
        try {
            const { data } = await api.APIgetProductSales(id)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)