import { createSlice } from '@reduxjs/toolkit'
import * as api from '../api'
import Swal from 'sweetalert2'

const initialState = {
  loggedIn: false,
  loading: false,
  username: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    
        sign_in: async(state, action) => {
            const {email, password} = action.payload
            api.signIn(email, password)
            .then(res => {
                state = {...state, loading: false, loggedIn: true, username: res.data}
                Swal.fire(
                    "Login succeded", "", "success"
                ).then(res => {
                    if(res.isConfirmed) window.location.replace(`/`)
                })
            }).catch(err => {
                Swal.fire(err.response.data, "", "error")
            })
            
        },
        sign_up: (state, action) => {
            const {username, email, password} = action.payload
            api.signUp(username, email, password)
                .then(res => {
                    Swal.fire(
                        res.data, "", "success"
                    ).then(res => {
                        if(res.isConfirmed) window.location.replace(`/verify/${email}`)
                    })
                }).catch(err => {
                    if(err) Swal.fire(err.response.data, "", "error")
                    
                })
            
        },
        verify: (state, action) => {
        const {code, email} = action.payload
        api.verify(email, code)
            .then(res => {
                Swal.fire(
                    res.data, "", "success"
                ).then(res => {
                    if(res.isConfirmed) window.location.replace(`/signin`)
                })
            })
            .catch(err => {
                Swal.fire(err.response.data, "", "error")
            }) 

        },
    },
})


export const { sign_in, sign_up, verify } = authSlice.actions

export default authSlice.reducer