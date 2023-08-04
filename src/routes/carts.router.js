import {Router} from "express";
import CartsManager from "../CartsManager.js";
const router = Router()
const manager = new CartsManager("Carts.json");

// GET
router.get('/', async (req,res)=>{
    try {
        const carts = await manager.getCarts()
        res.status(200).json({ message: 'Carts', carts})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

router.get('/:cid', async (req,res)=>{
    const {cid} = req.params
    try {
        const cart = await manager.getCartsByID(+cid)
        res.status(200).json({ message: 'Cart', cart: cart})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

// POST
router.post('/',async(req,res)=>{
    try {
        const createCart = await manager.createCart()
        res.status(200).json({message: 'Cart', cart: createCart})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})

router.post('/:cid/products/:pid',async(req,res)=>{
    const {cid,pid} = req.params
    try {
        const addProduct = await manager.addProduct(+cid,pid)
        res.status(200).json({message:'Producto agregado',product: addProduct})
    } catch (error) {
        throw res.status(500).json({ error }) 
    }
})


// DELETE 
//Borrar un carrito
router.delete('/:cid', async (req,res)=>{
    const { cid } = req.params
    try {
        const cartDeleted = await manager.deleteCart(+cid)
        res.status(200).json({ message: 'Cart deleted', product: cartDeleted })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})
// Borrar un producto de un carrito
router.delete('/:cid/products/:pid', async (req,res)=>{
    const {cid,pid} = req.params
    try {
        const productDeleted = await manager.deleteProductCart(+cid,pid)
        res.status(200).json({ message: 'Product deleted', product: productDeleted })
    } catch (error) {
        throw res.status(500).json({ error })
    }
})


export default router