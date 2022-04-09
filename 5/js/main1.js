const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app', // привязка к эл-ту в html части 
    data: { // набор свойств объекта app
        userSearch: '',// то что вводится в строку поиска (input)
        showCart: false,// отвечает за показ содержимого корзины, меняется по клику на кнопку
        catalogUrl: '/catalogData.json',// API+... - путь к файлу с объектами каталога
        cartUrl: '/getBasket.json',//путь к файлу с подтверждением права доступа (1/0)
        cartItems: [], // массив для заполнения товарами корзины
        filtered: [], // массив для заполнения отфильтрованными (по userSearch input) товарами (объектами)
        imgCart: 'https://via.placeholder.com/50x100', // картинка товара корзины
        products: [],// массив для заполнения товарами (объектами) каталога из переданного через .json массива объектов (товаров)
        imgProduct: 'https://via.placeholder.com/200x150' // картинка товара каталога
    },
    methods: { // набор методов объекта класса Vue - app
        getJson(url) { // промис, перевод полученных данных из json в js
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error))
        },
        addProduct(item) { // добавление продукта в корзину
            this.getJson(`${API}/addToBasket.json`) // запрос доступа
                .then(data => {
                    if (data.result === 1) { // если доступ есть
                        let find = this.cartItems.find(el => el.id_product === item.id_product); // сравнение id товаров которые уже в корзине с добавляемым
                        if (find) { // если id совпали (найден, true)
                            find.quantity++; // +1 шт (для добавления нескольких штук одного и того же товара сразу - иначе)
                        } else {
                            const prod = Object.assign({ quantity: 1 }, item); // создание нового объекта объединением assign, добавление св-ва объекта "quantity: 1" 
                            this.cartItems.push(prod) // добавить (объект) товар в массив cartItems
                        }
                    }
                })
        },
        remove(item) { // удаление товара из корзины
            this.getJson(`${API}/addToBasket.json`) // запрос права доступа
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) { // если товара > 1, то -1
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1); // поиск и удаление товара (объекта) из массива cartItems при помощи определения его индекса.
                        }
                    }
                })
        },
        filter() { // метод поиска товара по userSearch input
            let regexp = new RegExp(this.userSearch, 'i'); // создание объекта с заданием правила (userSearch input, не зависимо от регистра ввода)
            this.filtered = this.products.filter(el => regexp.test(el.product_name)); // добавление в массив filtered объектов соответствующих условию в regexp ((userSearch input))
        }
    },
    mounted() { // промисы, 
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents) { // парсит товары корзины
                    this.cartItems.push(item); // добавляет в массив cartItems объекты
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data) {// парсит товары каталога
                    this.$data.products.push(item); // добавляет в массив products объекты ($data) - чтобы избежать обращения к локальной products (если будет), направляет к глобальной. 
                    this.$data.filtered.push(item); // добавляет в массив filtered объекты
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let item of data) {
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});

