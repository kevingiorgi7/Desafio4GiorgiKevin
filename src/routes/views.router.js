import { Router } from "express";

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("Products.json");

const router = Router()

const products = await manager.getProducts()


router.get('/',(req,res)=>{
    res.render('home',{products: products})
})

router.get('/realtimeproducts',(req,res)=>{
    res.render('home',{products: products})
})


export default router