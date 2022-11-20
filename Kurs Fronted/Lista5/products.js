var products = [];

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
        this.date = new Date(Date.parse(cdate));;
        this.status = cstatus;
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
        if (element.id == id) {
            let x = products.indexOf(element);
            console.log(x);
            products.splice(x, 1);
        }
    });
}

remProduct(42);
console.log(products);