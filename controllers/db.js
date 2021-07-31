// import { Fruit } from "../models/fruit.js"
import { Product } from "../models/product.js"
import { loadCard, renderCard } from "../controllers/menu.js"
const CATOGORY_MEN = "men's clothing"
const CATOGORY_WOMEN = "women's clothing"

let loadData = async function() {
    let response = await fetch("https://fakestoreapi.com/products");
    let result = await response.json()
    return result
}

let initProducts = async function() {
    let data = await loadData()
    let products = data.map(initProduct) // Chuyển từ json sang product, danh sách sản phẩm (mảng) 
    console.log(products)
    let card = await loadCard()
    console.log(card)
    for (let i = 0; i < products.length; i++) {
        let name = products[i].GetName().slice(0,20)

        let image = products[i].GetImage()

        let product = card.replace("{#title}", name).replace("{#image}", image)
        document.getElementById("lstCard").innerHTML += product

    }
}

let initProduct = function(data) {
    // if (data["category"].localeCompare(CATOGORY_FRUIT) == 0) {
    //     return new MenCloth(data["title"], data["price"], data["image"])
    // }

    return new Product(data["title"], data["price"], data["image"])
}

export {initProducts}