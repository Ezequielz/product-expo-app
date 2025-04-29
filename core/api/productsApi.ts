

//TODO conectar mediante envs vars Android

import axios from "axios";



const productsApi = axios.create({
    baseURL: 'localhost:3000/api',
})


//TODO interceptores

export {  productsApi };