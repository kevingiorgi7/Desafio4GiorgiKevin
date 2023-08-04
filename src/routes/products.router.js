import {Router} from "express";
import ProductManager from "../ProductManager.js";
const router = Router()
const manager = new ProductManager("Products.json");

// GET 
router.get('/', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        const {limit} = req.query   // IDEM: let limit = Number(req.query.limit);
        let productsLimited = limit? products.slice(0,+limit) : products;
        res.status(200).json({ message: 'Products', productsLimited})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

router.get('/:pid', async (req,res)=>{
    const { pid } = req.params // IDEM: const id = req.params.pid
    try {
        const product = await manager.getProductsById(+pid) 
        res.status(200).json({ message: 'Product', product: product })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})

// POST
router.post('/' , async (req,res)=>{
    console.log(req.body);
    try {
        const newProduct = await manager.addProducts(req.body)
        res.status(200).json({ message: 'Product created', product: newProduct })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})

// PUT
router.put('/:pid', async (req,res)=>{
    const { pid } = req.params
    console.log(req.body);
    try {
        const productUpdated = await manager.updateProduct(+pid,req.body)
        res.status(200).json({ message: 'Product updated', product: productUpdated })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})

// DELETE
router.delete('/:pid', async (req,res)=>{
    const { pid } = req.params
    try {
        const productDeleted = await manager.deleteProduct(+pid)
        res.status(200).json({ message: 'Product deleted', product: productDeleted })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})


export default router