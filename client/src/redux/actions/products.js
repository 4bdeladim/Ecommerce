import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";


export const GetPopularProducts = createAsyncThunk(
    "products/popular",
    async () => {
        try {
            const response = await api.APIgetPopularProducts()
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetProducts = createAsyncThunk(
    "products/all",
    async (info) => {
        try {
            const {page, category, sort, min, max} = info
            const response = await api.APIgetproducts(page, category, sort, min, max)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const GetProduct = createAsyncThunk(
    "products/singleproduct",
    async (info) => {
        try {
            const {id} = info
            const response = await api.APIgetProduct(id)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetCategories = createAsyncThunk(
    "products/categories",
    async () => {
        try {
            const response = await api.APIgetCategories();
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const AddNewProduct = createAsyncThunk(
    "products/add",
    async (info) => {
        try {
            const {name, descreption, price, category, image} = info 
            const response = await api.APIaddNewProduct(name, descreption, price, category)
            return response
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const GetCart = createAsyncThunk(
    "products/getcart",
    async() => {
        try {
            const {data} = await api.APIgetCart();
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const AddToCart = createAsyncThunk(
    "products/addtocart",
    async(info) => {
        try {
            const {productId, quantity, productImg} = info
            const {data} = await api.APIaddToCart(productId, quantity, productImg)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const DeleteFromCart = createAsyncThunk(
    "products/deletefromcart",
    async (info) => {
        try {
            const {productId} = info
            const {data} = await api.APIremoveFromCart(productId)
            return data
        } catch (error) {
            return error.response.data || "Something went wrong"
        }
    }
)

export const UpdateCart = createAsyncThunk(
    "products/updatecart",
    async (info) => {
        try {
            const {productId, quantity} = info
            const {data} = await api.APIupdateCart(productId, quantity)
            return data
        } catch (error) {
            throw error.response.data || "Somthing went wrong"
        }
    }
)

export const GetOrders = createAsyncThunk(
    "products/getorders",
    async (info) => {
        try {
            const { data } = await api.APIgetOrders()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const NewOrder = createAsyncThunk(
    "products/neworder",
    async (info) => {
        try {
            const { data } = await api.APInewOrder()
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)

export const CancelOrder = createAsyncThunk(
    "products/cancelorder",
    async (info) => {
        try {
            const {orderId} = info
            const { data } = await api.APIcancelOrder(orderId)
            return data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)