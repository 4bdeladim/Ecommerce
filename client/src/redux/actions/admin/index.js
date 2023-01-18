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
    async (id) => {
        try {
            console.log(id)
            const { data } = await api.APIdeleteProduct(id)
            // dispatch(GetProducts())
            return data
        } catch (error) {
            console.log(error.response.data)
            throw error.response.data || "Something went wrong"
        }
    }
) 