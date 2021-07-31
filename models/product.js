export class Product{
    #name
    #price
    #image
    constructor(name, price, image) {
        this.#name = name
        this.#price = price
        this.#image = image
    }

    GetName() {
        return this.#name
    }

    GetImage() {
        return this.#image
    }

    ToPrice() {
        return this.#price
    }
}