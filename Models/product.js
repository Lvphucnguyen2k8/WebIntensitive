export class Product {
    #name
    #price
    #category
    #image
    #vendor
    #id
    constructor(name, price, category, image, vendor, id) {
        this.#name = name
        this.#price = price
        this.#category = category
        this.#image = image
        this.#vendor = vendor
        this.#id = id
    }
    getName () {
        return this.#name
    }
    setPrice () {
        return this.#price
    }
    getCategory (){
        return this.#category
    }
    getImage = () => {
        if (this.#name == "Wildberries") {
            return "https://ua.all.biz/img/ua/catalog/14718381.jpeg"
        }
        return this.#image
    }
    getVendor = async () => {
        return this.#vendor
    }
    getID = async () => {
        return this.#id
    }
}