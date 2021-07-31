import { Product } from "./product.js"

export class MenCloth extends Product {
    constructor(name, price, image) {
        super(name, price, image)
    }
    ToPrice() {
        return super.ToPrice() * 0.9
    }
}