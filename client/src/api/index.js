import axios from "axios"

export const APIsignIn = (email, password) => axios.post('/api/signin', {email, password})
export const APIsignUp = (username, email, password) => axios.post('/api/signup', {username, email, password})
export const APIverify = (email, code) => axios.post(`/api/verify/${email}`, {code})
export const APIsendRecoveryLink = (email) => axios.post(`/api/sendrecoverylink`, {email})
export const APIcheckRecoveryLink = (email, code) => axios.post(`/api/checklink`, {email, code})
export const APIchangepassword = (email, code, password) => axios.post(`/api/changepassword`, {email, recoveryCode:code, newPassword:password})
export const APIcheckLogin = () => axios.get("/api/signin") 
export const APIgetPopularProducts = () => axios.get("/api/products/popular")
export const APIaddNewProduct = (name, descreption, price, category, image) => axios.post("/api/products", {name, descreption, price, category, image})
export const APIgetproducts = (page, category, sort, min, max) => axios.get(`/api/products?page=${page}&category=${category}&sort=${sort}&min=${min}&max=${max}`)
export const APIgetCategories  = () => axios.get("/api/products/categories")
export const APIgetProduct = (id) => axios.get(`/api/singleproduct/${id}`)