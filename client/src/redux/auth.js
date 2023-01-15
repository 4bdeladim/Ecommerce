import { createSlice, isFulfilled, isRejected, isPending} from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import {signIn,verify,signUp, sendRecoveryLink, checkRecoveryLink, changePassword, CheckLogin} from "./actions/auth"


const initialState = {
  loggedIn: false,
  username: null,
  loading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       
    },

    extraReducers: builder => {
        builder
        .addCase(CheckLogin.fulfilled, (state, action) => {
            state.loading = false
            state.username = action.payload
            state.loggedIn = true
            state.cart = action.payload.cart
        })
        .addCase(CheckLogin.rejected, (state, action) => {
            state.loading = false
            state.username = null
            state.loggedIn = false
        })
        .addCase(CheckLogin.pending, (state, action) => {
            state.loading = false
        })
        .addCase(signIn.fulfilled, (state, action) => {
            state.loading = false
            state.username = action.payload
            state.loggedIn = true
            window.location.replace("/")
        })
        .addCase(signIn.pending, (state, action) => {
            state.loading = true
        })
        .addCase(signIn.rejected, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        })
        .addCase(signUp.fulfilled, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.payload.message,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace(`/verify/${action.payload.email}`))
        })
        .addCase(signUp.pending, (state, action) => {
            state.loading = true
        })
        .addCase(signUp.rejected, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        })
        .addCase(verify.fulfilled, (state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace("/"))
        })
        .addCase(verify.pending, (state, action) => {
            state.loading = true
        })
        .addCase(verify.rejected, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        })
        .addCase(sendRecoveryLink.fulfilled, (state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick:false,
                icon: "success"}).then(res => window.location.replace("/"))
            })
        .addCase(sendRecoveryLink.pending, (state, action) => {
            state.loading = true
        })
        .addCase(sendRecoveryLink.rejected, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        })
        .addCase(checkRecoveryLink.fulfilled, (state, action) => {
            state.loading = false
            const {email, code} = action.payload
            window.location.replace(`/changepassword/${email}/${code}`)
        })
        .addCase(checkRecoveryLink.pending, (state, action) => {
            state.loading = true
        })
        .addCase(checkRecoveryLink.rejected, (state, action) => {
            state.loading = false
            window.location.replace("/invalidlink")
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace("/signin"))
        })
        .addCase(changePassword.pending, (state, action) => {
            state.loading = true
        })
        .addCase(changePassword.rejected, (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        })
        
    }
})


export default authSlice.reducer

