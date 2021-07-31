import { Product } from "./product.js"

export class WomenCloth extends Product {
    constructor(name, price, image) {
        super(name, price, image)
    }
    ToPrice() {
        return super.ToPrice() * (85/100)
    }
}