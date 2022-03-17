class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },  
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
    getSum() {
        let s = 0;
        this.goods.forEach(item => {
            s += item.price;
        })
        console.log(s);
    }
}

class ProductItem {
    constructor(product, img = "./img/D84EbJlUwAEhQrD.jpg") {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                    <h3 class="product__title">${this.title}</h3>
                    <img class="img__product" src=${this.img} alt="">
                    <p class="text__product">Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Fugiat maiores quidem impedit ducimus numquam 
                    </p> 
                    <p class="product__price">${this.price} руб</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

let list = new ProductsList();
list.render();
list.getSum();

class Basket {
    addGood() {

    }
    removeGood() {

    }
    changeGood() {

    }
    render() {

    }
}

class ElemBasket {
    render() {}
}

// const products = [
//     { id: 1, title: 'Notebook', price: 2000 },
//     { id: 2, title: 'Mouse', price: 20 },
//     { id: 3, title: 'Keyboard', price: 200 },
//     { id: 4, title: 'Gamepad', price: 50 },
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (product, img = "./img/D84EbJlUwAEhQrD.jpg") => {
//     return `<div class="product-item">
//                 <h3 class="product__title">${product.title}</h3>
//                 <img class="img__product" src=${img} alt="">
//                 <p class="text__product">Lorem ipsum dolor sit amet consectetur
//                 adipisicing elit. Fugiat maiores quidem impedit ducimus numquam 
//                 </p> 
//                 <p class="product__price">${product.price} руб</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {

//     document.querySelector('.products').innerHTML = list.
//         map(product => renderProduct(product)).join(" ");
// };
