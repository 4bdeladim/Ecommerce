import { createSlice, isFulfilled, isRejected, isPending} from '@reduxjs/toolkit'
import * as api from '../api'
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
    extraReducers: (builder) => {
        builder
            //Check if user logged in
            .addMatcher(
                isFulfilled(CheckLogin), (state, action) => {
                    state.loading = false
                    state.username = action.payload
                    state.loggedIn = true
                } 
            )
            .addMatcher(
                isRejected(CheckLogin), (state, action) => {
                    state.loading = false
                    state.username = action.payload
                    state.loggedIn = true
                } 
            )
            .addMatcher(
                isPending(CheckLogin), (state, action) => {
                    state.loading = false
                } 
            )

            //Sign in 
            .addMatcher(
                isFulfilled(signIn), (state, action) => {
                    state.loading = false
                    state.username = action.payload
                    state.loggedIn = true
                    window.location.replace("/")
                }
            )
            .addMatcher(
                isRejected(signIn), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.error.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    })
                }
            )
            .addMatcher(
                isPending(signIn), (state, action) => {
                    state.loading = true
                    console.log("RUN")
                }
            )
            //Sign up reducers
            .addMatcher(
                isFulfilled(signUp), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.payload.message,
                        allowOutsideClick: false,
                        icon: 'success'
                    }).then(res => window.location.replace(`/verify/${action.payload.email}`))
                }
            )
            .addMatcher(
                isRejected(signUp), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.error.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    })
                }
            )
            .addMatcher(
                isPending(signUp), (state, action) => {
                    state.loading = true
                }
            )
            //Verification reducers
            .addMatcher(
                isFulfilled(verify), (state, action) => {
                    Swal.fire({
                        title: action.payload,
                        allowOutsideClick: false,
                        icon: 'success'
                    }).then(res => window.location.replace("/"))
                }
            )
            .addMatcher(
                isRejected(verify), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.error.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    })
                }
            )
            .addMatcher(
                isPending(verify), (state, action) => {
                    state.loading = true
                }
            )
            //Send recovering link
            .addMatcher(
                isFulfilled(sendRecoveryLink), (state, action) => {
                    Swal.fire({
                        title: action.payload,
                        allowOutsideClick: false,
                        icon: 'success'
                    }).then(res => window.location.replace("/"))
                }
            )
            .addMatcher(
                isRejected(sendRecoveryLink), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.error.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    })
                }
            )
            .addMatcher(
                isPending(sendRecoveryLink), (state, action) => {
                    state.loading = true
                }
            )

            //Check recovering link
            .addMatcher(
                isFulfilled(checkRecoveryLink), (state, action) => {
                    state.loading = false
                    const {email, code} = action.payload
                    window.location.replace(`/changepassword/${email}/${code}`)
                }
            )
            .addMatcher(
                isRejected(checkRecoveryLink), (state, action) => {
                    state.loading = false
                    window.location.replace("/invalidlink")
                }
            )
            .addMatcher(
                isPending(checkRecoveryLink), (state, action) => {
                    state.loading = true
                }
            )

            //Change password
            .addMatcher(
                isFulfilled(changePassword), (state, action) => {
                    Swal.fire({
                        title: action.payload,
                        allowOutsideClick: false,
                        icon: 'success'
                    }).then(res => window.location.replace("/signin"))
                }
            )
            .addMatcher(
                isRejected(changePassword), (state, action) => {
                    state.loading = false
                    Swal.fire({
                        title: action.error.message,
                        allowOutsideClick: false,
                        icon: 'error'
                    })
                }
            )
            .addMatcher(
                isPending(changePassword), (state, action) => {
                    state.loading = true
                }
            )
            
    }
})


export default authSlice.reducer