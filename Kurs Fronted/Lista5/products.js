let products = [];

class product {
    /**
     * 
     * @param {string} cname 
     * @param {number} camount 
     * @param {Date} cdate 
     * @param {boolean} cstatus 
     */
    constructor(cname, camount, cdate, cstatus) {
        this.id = Math.floor(Math.random() * 512);
        this.name = cname;
        this.amount = camount;
        this.date = new Date(Date.parse(cdate));
        this.status = cstatus;
        this.price = 0;
    }
};

//Dodaje testowy produkt, żeby na jego przykładzie pokazywać działanie funkcji
let test = new product("test", "10", "2022-12-31", true);
test.id = 42;
products.push(test);

/**
 * Add new product to list of products.
 * @param {string} name
 * @param {string} amount
 * @param {string} date
 * Date format: YYYY-MM-DD
 * @param {boolean} status
 * @returns {number}
 */
function addProduct(name, amount, date, status) {
    let temp = new product(name, parseInt(amount), date, status);
    products.push(temp);
    return temp.id;
}

console.log(addProduct("maslo", "5", "2023-09-02", true));
console.log(products[0]);
console.log(products[1]);

/**
 * Remove product by id 
 * @param {number} id 
 */
function remProduct(id) {
    products.forEach(element => {
        if (element.id === id) {
            let x = products.indexOf(element);
            console.log(x);
            products.splice(x, 1);
        }
    });
}

remProduct(42);
console.log(products);

/**
 * Edit products parameters by id
 * @param {number} id 
 * @param {string} name 
 * @param {string} amount 
 * @param {string} date 
 * @param {boolean} status 
 */
function editProduct(id, name, amount, date, status) {
    remProduct(id);
    addProduct(name, amount, date, status);
}

/**
 * Swap 2 elements of array
 * @param {Object} arr - Array
 * @param {number} indexA 
 * @param {number} indexB 
 */
function swapArrayElements(arr, indexA, indexB) {
    let temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
};

/**
 * Move up/down element
 * @param {number} pos 
 * @param {boolean} direction 
 * true = move up, 
 * false = move down
 */
function swapProduct(pos, direction) {
    let max = -1;
    let pos2, pos3;
    products.forEach(element => {
        max++;
    });//for
    if(pos+1 > max) {
        pos2 = max;
    } else {
        pos2 = pos+1;
    }

    if (pos-1 < 0) {
        pos3 = 0;
    } else {
        pos3 = pos-1;
    }

    if (direction) {
        swapArrayElements(products, pos, pos2);        
    } else {
        swapArrayElements(products, pos, pos3);
    }
}

console.log(addProduct("maslo", "5", "2023-09-02", false));
console.log(addProduct("mleko", "10", "2022-11-21", false));
console.log(products[0]);
console.log(products[1]);
swapProduct(0, true);
console.log(products[0]);
console.log(products[1]);

/**
 * Print all products wchich have bought today.
 * @return {Array}
 */
function todayProducts() {//getDateString()
    let productsToday = [];
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let currDate = String(day)+month+year;
    products.forEach(element =>{
        let elemDate = String(element.date.getDate())+element.date.getMonth()+element.date.getFullYear();
        if(currDate == elemDate) {
            console.log(element);
            productsToday.push(element);
        }
    });
    return productsToday;
}

todayProducts();
/**
 * 
 * @param {number} id 
 * @param {number} price 
 */
function sellProduct(id, price) {
    products.forEach(element => {
        if (element.id == id) {
            element.price = price;
            element.status = true;
        }
    });
}
/**
 * Sumuje dzisiejsze zakupy.
 * @returns {number}
 */
function sumPricesToday() {//reduce
    let tdyProducts = todayProducts();
    let sum = 0;
    tdyProducts.forEach(element => {
        if(element.status == true) {
            sum =+ Number(element.price);
        }
    });
    return sum;
}

let test2 = new product("test2", "10", "2022-11-21", false);
test2.id = 43;
products.push(test2);

sellProduct(43, 50);
console.log(sumPricesToday());

/**
 * Zwraca listę sformatowanych elementów
 * @param {Array} ids 
 * @param {Function} f 
 * @returns {Array}
 */
function formatProducts(ids, f) {//includes, filter
    let tempArray = [];
    products.forEach(element => {
        ids.forEach(id => {
            if (element.id === id) {
                tempArray.push(element);
            }
        });
    });
    return tempArray.map(f);
}

function exchange(elem) {
    return elem.price *= 4.3;
}

