import axios from "axios"

export const signIn = (email, password) => axios.post('/api/signin', {email, password})
export const signUp = (username, email, password) => axios.post('/api/signup', {username, email, password})
export const verify = (email, code) => axios.post(`/api/verify/${email}`, {code})