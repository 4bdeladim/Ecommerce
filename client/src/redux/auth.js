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

    extraReducers: {
        [CheckLogin.fulfilled]: (state, action) => {
            state.loading = false
            state.username = action.payload
            state.loggedIn = true
           
        },
        [CheckLogin.rejected]: (state, action) => {
            state.loading = false
            state.username = action.payload
            state.loggedIn = false
        },
        [CheckLogin.pending]: (state, action) => {
            state.loading = false
        },
        [signIn.fulfilled]: (state, action) => {
            state.loading = false
            state.username = action.payload
            state.loggedIn = true
            window.location.replace("/")
        },
        [signIn.pending]: (state, action) => {
            state.loading = true
        },
        [signIn.rejected]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        },
        [signUp.fulfilled]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.payload.message,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace(`/verify/${action.payload.email}`))
        },
        [signUp.pending]: (state, action) => {
            state.loading = true
        },
        [signUp.rejected]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        },
        [verify.fulfilled]: (state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace("/"))
        },
        [verify.pending]: (state, action) => {
            state.loading = true
        },
        [verify.rejected]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        },
        [sendRecoveryLink.fulfilled]: (state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace("/"))
        },
        [sendRecoveryLink.pending]:(state, action) => {
            state.loading = true
        },
        [sendRecoveryLink.rejected]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        },
        [checkRecoveryLink.fulfilled]:(state, action) => {
            state.loading = false
            const {email, code} = action.payload
            window.location.replace(`/changepassword/${email}/${code}`)
        },
        [checkRecoveryLink.pending]: (state, action) => {
            state.loading = true
        },
        [checkRecoveryLink.rejected]:(state, action) => {
            state.loading = false
            window.location.replace("/invalidlink")
        },
        [changePassword.fulfilled]:(state, action) => {
            Swal.fire({
                title: action.payload,
                allowOutsideClick: false,
                icon: 'success'
            }).then(res => window.location.replace("/signin"))
        },
        [changePassword.pending]: (state, action) => {
            state.loading = true
        },
        [changePassword.rejected]: (state, action) => {
            state.loading = false
            Swal.fire({
                title: action.error.message,
                allowOutsideClick: false,
                icon: 'error'
            })
        }
        

    }
})


export default authSlice.reducer