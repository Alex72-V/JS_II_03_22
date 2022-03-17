class Param {
    constructor(element) {
        this.name = element.value;
        this.price = +element.dataset['price'];
        this.calories = +element.dataset['calories'];
    }
}
class Burger {
    constructor(size, add, topping) {
        this.size = new Param(this._select(size));
        this.add = new Param(this._select(add));
        this.toppings = this._getToppings(topping);
    }

    _getToppings(name) {
        let result = [];
        this._selectAll(name).forEach(el => {
            let obj = new Param(el); // el - это каждый input
            result.push(obj);
        });
        return result;
    }

    _select(name) {
        return document.querySelector(`input[name = ${name}]:checked`);//(`input[name = ${name}]:checked`) - все отмеченные чек-боксы
    }

    _selectAll(name) {
        return [...document.querySelectorAll(`input[name = ${name}]:checked`)];//(`input[name = ${name}]:checked`) - все отмеченные чек-боксы; и распаковываем все элементы в массиве ((... внутри []))!!! чтобы получился полноценный массив а не коллекция элементов.
    }

    _sumPrice() {
        let result = this.size.price + this.add.price;
        this.toppings.forEach(el => result += el.price);
        return result;
    }

    _sumCalories() {
        let result = this.size.calories + this.add.calories;
        this.toppings.forEach(el => result += el.calories);
        return result;
    }

    showSum(price, calories) {
        document.querySelector(price).textContent = this._sumPrice();
        document.querySelector(calories).textContent = this._sumCalories();
    }
    
}