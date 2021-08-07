export class Product {
    #name
    #price
    #category
    #image
    #vendor
    constructor(name, price, category, image, vendor) {
        this.#name = name
        this.#price = price
        this.#category = category
        this.#image = image
        this.#vendor = vendor
    }
    getName () {
        return this.#name
    }
    setPrice () {
        return this.#price
    }
    getCategory (){
        if (this.#category.includes("Fruits")) {
            return "Fruits"
        }
        if (this.#category.includes("Dried")) {
            return "Dried"
        }
        if (this.#category.includes("Fresh")) {
            return "Fresh"
        }
        if (this.#category.includes("Nuts")) {
            return "Nuts"
        }
        if (this.#category.includes("Exotic")) {
            return "Exotic"
        }
    }
    getImage = () => {
        if (this.#name == "Apple") {
            return "http://vilee.fi/eng/wp-content/uploads/2020/11/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail-1-732x549-1.jpg"
        }
        if (this.#name == "Dragon Fruit") {
            return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9mtKu-PFPHEDmesVEBTbFfzZZ_dEYfodKN7bHyi1-ccUcg9I8sHHQpUbbkumWmJDgXTM&usqp=CAU"
        }
        if (this.#name == "Cranberries") {
            return "https://www.seriouseats.com/thmb/jEPCv-Qp3SreSNFKEqHEnVPrU7M=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2014__11__cranberries-shutterstock_155418920-4753bf4ff5a34ad2ad526bc423f8cedf.jpg"
        }
        if (this.#name == "Lemon") {
            return "https://minnetonkaorchards.com/wp-content/uploads/2021/04/Health-Benefits-of-Lemons.jpg"

        }
        if (this.#name == "Mango") {
            return "https://www.itfnet.org/v1/wp-content/uploads/2020/05/pakistan.jpg"

        }
        if (this.#name == "Pears") {
            return "https://images-prod.healthline.com/hlcmsresource/images/AN_images/benefits-of-pears-1296x728-feature.jpg"
        }
        if (this.#name == "Strawberries") {
            return "https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/1432664914-strawberry-facts1.jpg"
        }
        if (this.#name == "Watnuts") {
            return "https://sc02.alicdn.com/kf/UT8AT4EXs4aXXagOFbXT/Walnuts.jpg"
        }
        return "https://api.predic8.de" + this.#image
    }
    getVendor = async () => {
        let response = await fetch("https://api.predic8.de" + this.#vendor)
        let result = await response.json()
        let value = await result["name"]
        return value
    }
}