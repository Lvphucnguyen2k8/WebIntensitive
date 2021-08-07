import { Product } from "../Models/product.js"
import { renderCard, loadCard, getProductPage, loadProductPage, myFirebase } from "../Controllers/menu.js"

const currencies = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CKD",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KWP",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MUR",
    "MVP",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "IMR",
    "NZD",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "STD",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "UYU",
    "UZS",
    "VEF",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL"
]
const weightUnits = [
    {
        name: "Pounds",
        acronym: "lb"
    },
    {
        name: "Ounce",
        acronym: "oz"
    },
    {
        name: "Kilograms",
        acronym: "Kg"
    },
    {
        name: "Hundredweight", //tạ
        acronym: "hundredweight"
    },
    {
        name: "Dozens", //tá = 12
        acronym: "dozens"
    },
    {
        name: "Hectograms",
        acronym: "hg"
    },
    {
        name: "Decagrams",
        acronym: "dag"
    },
    {
        name: "Gram",
        acronym: "g"
    },
    {
        name: "Stone", //yến
        acronym: "stone"
    }
]

let renderCurrencies = async () => {
    currencies.forEach((value, index) => {
        document.getElementById("currency").innerHTML += `
                <option value="${value}" >${value}</option>
        `
    })

    document.getElementById("currency").addEventListener("change", () => {
        let Fl_Price = document.getElementsByClassName("fluctuating-price")
        for (let i = 0; i < Fl_Price.length; i++) {
            Fl_Price[i].placeholder = document.getElementById("currency").value
        }
    })
}

let renderWeightUnits = async () => {
    weightUnits.forEach((value, index) => {
        document.getElementById("units").innerHTML += `
            <option value="${value.acronym}" >${value.name} (${value.acronym}) </option>
        `
    })

    document.getElementById("units").addEventListener("change", () => {
        let Fl_Price = document.getElementById("weight")
        Fl_Price.placeholder = document.getElementById("units").value

    })
}

//main 
let getData = async () => {
    let request = await fetch("https://api.predic8.de/shop/products/?page=1&limit=30")
    let response = await request.json()
    return response.products
}

let initProducts = async () => {
    let data = await getData()
    let card = await loadCard()

    for (let i = 0; i < 24; i++) {
        let product = initProduct(data[i])

        // myFirebase()
        // var db = firebase.firestore();

        // db.collection("Products").add({
        //     name : (await product).getName(),
        //     price : (await product).setPrice(),
        //     category : (await product).getCategory(),
        //     image : (await product).getImage(),
        //     vendor : await (await product).getVendor()
        // }).then((document) => {
        //     console.log(document.id)
        // }).catch((error) => {
        //     console.log(error.message)
        // })


        let name = (await product).getName()
        let price = (await product).setPrice()
        let category = (await product).getCategory()
        let image = (await product).getImage()
        let vendor = await (await product).getVendor()

        let newCard = card.replace("{{image}}", image).replace("{{title}}", name).replace("{{category}}", category).replace("{{price}}", price).replace("{{vendor}}", vendor)
        renderCard(newCard)
    }

}

let initProduct = async (data) => {
    //product    
    let obj = await fetchURL(data["product_url"])

    return new Product(obj["name"], obj["price"], obj["category_url"], obj["photo_url"], obj["vendor_url"])
}

let fetchURL = async (url) => {
    if (url.includes("shop")) {
        let request = await fetch("https://api.predic8.de" + url)
        let response = await request.json()
        return response
    }
    else {
        return url
    }
}

let loadClickedProduct = async (id) => {
    let data = await getData()
    let product = await data[id]
    let obj = await initProduct(product)

    let image = obj.getImage()
    let name = obj.getName()
    let category = obj.getCategory()
    let price = obj.setPrice()
    let vendor = await obj.getVendor()

    let html = await getProductPage()

    html = html.replace("{{img1.5}}", image).replace("{{img2}}", image).replace("{{img3}}", image).replace("{{img4}}", image).replace("{{img5}}", image).replace("{{img1}}", image)
        .replace("{{product-title}}", name)
        .replace("{{ratings}}", "0")
        .replace("{{sold}}", "0")
        .replace("{{price}}", price)
        .replace("{{shop-name}}", vendor)
        .replace("{{category}}", category)

    loadProductPage(html)
}
export { renderCurrencies, renderWeightUnits, initProducts, loadClickedProduct }
