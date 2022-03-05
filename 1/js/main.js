const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product, img = "./img/D84EbJlUwAEhQrD.jpg") => {
    return `<div class="product-item">
                <h3 class="product__title">${product.title}</h3>
                <img class="img__product" src=${img} alt="">
                <p class="text__product">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat maiores quidem impedit ducimus numquam </p> 
                <p class="product__price">${product.price} руб</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    
    document.querySelector('.products').innerHTML = list.map(product => renderProduct(product)).join(" ");
};

renderPage(products);