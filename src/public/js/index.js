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

socketClient.on('addProduct', (newProduct) => {
    const productList = document.getElementById('productsList');
    const newItem = document.createElement('li');
    newItem.innerHTML = `<strong>${newProduct.title}:</strong> ${newProduct.description}`;
    productList.appendChild(newItem);
});


formDel.onsubmit = (e) => {
    e.preventDefault()
    const productId = Number(idDelete.value)
    socketClient.emit('deleteProduct', productId);
    formDel.reset();
}

socketClient.on('productDeleted', (productId) => {
    const productList = document.getElementById('productsList');
    const productItem = productList.querySelector(`li[data-product-id="${productId}"]`);
    if (productItem) {
        productList.removeChild(productItem);
    }
});
