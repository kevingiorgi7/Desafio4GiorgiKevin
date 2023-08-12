import { Router } from "express";

import ProductManager from "../ProductManager.js";
const manager = new ProductManager("Products.json");

const router = Router()

router.get('/', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        res.render('home',{products: products})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
    
})

router.get('/realtimeproducts', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        res.render('realTimeProducts',{products: products})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
    
})


export default router