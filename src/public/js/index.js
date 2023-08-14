const socketClient = io()

const title = document.getElementById('title')
const description = document.getElementById('description')
const code = document.getElementById('code')
const price = document.getElementById('price')
const stock = document.getElementById('stock')
const category = document.getElementById('category')
const formAdd = document.getElementById('addProductForm')
const formDel = document.getElementById('deleteProductForm')
const idDelete = document.getElementById('productId')

/* import ProductManager from "../ProductManager.js";
const manager = new ProductManager("Products.json"); */


formAdd.onsubmit = (e) => {
    e.preventDefault()
    const newProduct = {
        title: `${title.value}`,
        description: `${description.value}`,
        code: `${code.value}`,
        price: `${price.value}`,
        status: true,
        stock: `${stock.value}`,
        category: `${category.value}`
    }
    socketClient.emit('addProduct', newProduct);
    formAdd.reset();
}

socketClient.on('productAdded', async (productAdded) => {
    const productList = document.getElementById('productsList');
    const newItem = document.createElement('li');
    newItem.innerHTML = `ID:${productAdded.id} - <strong>${productAdded.title}:</strong> ${productAdded.description}`;
    productList.appendChild(newItem);
/*     const products = await manager.getProducts()
    socketServer.emit('products', products) */
});


formDel.onsubmit = (e) => {
    e.preventDefault()
    const productId = Number(idDelete.value)
    socketClient.emit('deleteProduct', productId);
    formDel.reset();
}

socketClient.on('productDeleted', (productDeleted) => {
    const productList = document.getElementById('productsList');
    const productItem = productList.querySelector(`li[data-product-id="${productDeleted.id}"]`);
    if (productItem) {
        productList.removeChild(productItem);
    }
});

/* socketClient.on('productsUpdated', productsUpdated => {
    const productList = document.getElementById('productsList');
    productsUpdated.map(p => {
        const newItem = document.createElement('li');
        newItem.innerHTML = `ID:${p.id} - <strong>${p.title}:</strong> ${p.description}`;
        productList.appendChild(newItem)})
});
 */