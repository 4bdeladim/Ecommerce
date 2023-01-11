import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api";


export const GetPopularProducts = createAsyncThunk(
    "products/popular",
    async (info, thunkAPI) => {
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
    async (info, thunkAPI) => {
        try {
            const {page, category, sort, min, max} = info
            const response = await api.APIgetproducts(page, category, sort, min, max)
            return response.data
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)
export const AddNewProduct = createAsyncThunk(
    "products/add",
    async (info, thunkAPI) => {
        try {
            const {name, descreption, price, category, image} = info 
            const response = await api.APIaddNewProduct(name, descreption, price, category)
            return response
        } catch (error) {
            throw error.response.data || "Something went wrong"
        }
    }
)