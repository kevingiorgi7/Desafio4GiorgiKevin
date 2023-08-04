import express from "express";
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'

import viewsRouter from './routes/views.router.js'
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

import { Server } from 'socket.io'


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

// Handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')


// Routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/views',viewsRouter)


const PORT = 8080
const httpServer = app.listen(PORT,()=>{
    console.log(`Escuchando al puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

socketServer.on('connection',socket=>{
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on('disconnect',()=>{
        console.log(`Usuario desconectado: ${socket.id}`);
    })
})