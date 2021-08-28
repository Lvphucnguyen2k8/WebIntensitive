import { renderCurrencies, renderWeightUnits, initProducts, loadClickedProduct, renderCreditCards, loadCountriesList, loadAddressForm, loadPostOfficeForm, searching, searchingVendors, searchingCategory, searchingPrice } from "./database.js";
import { resetPassword, signIn, signUp } from "./authen.js"

var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');
var shop_footer = document.createElement('div');
var cartProduct = []
var cartName = []
var images = []

let myFirebase = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyB9BsaZzpeVTepnhdV6huHEnDcqwbg6X3s",
        authDomain: "fruit-shop-87c80.firebaseapp.com",
        databaseURL: "https://fruit-shop-87c80-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "fruit-shop-87c80",
        storageBucket: "fruit-shop-87c80.appspot.com",
        messagingSenderId: "460096943780",
        appId: "1:460096943780:web:bee76f7e48a6be826c1831",
        measurementId: "G-KGJEFR5EHC"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
    }
}

let initHTML = async () => {
    shop_menu.id = 'shop_menu';
    // document.body.appendChild(shop_menu);
    document.getElementById("Web-content").appendChild(shop_menu);

    shop_content.id = 'shop_content';
    // document.body.appendChild(shop_content);
    document.getElementById("Web-content").appendChild(shop_content);

    shop_footer.id = 'footer'
    document.getElementById("Web-content").appendChild(shop_footer);

    await loadMenu();
    await loadHome();
    await loadFooter();
    getMenu();
}

let getMenu = async () => {

    // document.getElementById("add-product-btn").addEventListener("click", async () => {
    //     await loadAddProductPage();
    //     showImage()
    //     showSmallImage()
    // })

    document.getElementById("home-btn").addEventListener("click", async () => {
        await loadHome();
    })
    document.getElementById("fruit-category-btn").addEventListener("click", async () => {
        await loadCategory()
    })

    document.getElementById("sign-up-btn").addEventListener("click", async () => {
        await loadSignUp();
    })

    document.getElementById("login-btn").addEventListener("click", async () => {
        await loadLogin()
    })

    document.getElementById("search-btn").addEventListener("click", async () => {
        await searchBar()
    })
    document.getElementById("support-btn").addEventListener("click", async () => {
        await loadSupportPage()
    })

}

let loadMenu = async () => {
    let response = await fetch("../Views/menu.html")
    let result = await response.text()
    shop_menu.innerHTML = result

    document.getElementById("add-product-btn").addEventListener("click", async () => {
        await loadAddProductPage()
    })
}

//home
let loadHome = async () => {
    let response = await fetch('../Views/home.html')
    let result = await response.text()
    shop_content.innerHTML = result;

    loadFilterBar()
    await initProducts()
}

//cart page
let loadCartPage = async () => {
    let response = await fetch("../Views/cartPage.html");
    let result = await response.text();
    shop_content.innerHTML = result;
    selectAllProduct()
    unselectAllProduct()
    renderCartCard()
    buyItems()
}
let selectAllProduct = () => {
    let selectAll = 0;
    let checkboxes = document.getElementsByClassName("checkbox")
    document.getElementById("select-all").addEventListener("click", () => {
        if (selectAll == 0) {
            selectAll = 1
        } else {
            selectAll = 0
        }
        if (selectAll == 1) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = true
            }
        } else {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false;
            }
        }
    })
}
let unselectAllProduct = () => {
    let checkboxes = document.getElementsByClassName("checkbox")
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", () => {
            if (checkboxes[i].checked == false) {
                document.getElementById("select-all").checked = false;
            }
        })
    }
}
let getCartCard = async () => {
    let response = await fetch("../Views/cartProduct.html")
    let result = await response.text()
    return result
}
let renderCartCard = async () => {
    if (cartProduct.length == 0) {
        return false
    }
    if (cartProduct != 0) {
        for (let i = 0; i < cartProduct.length; i++) {
            let card = await getCartCard()
            let obj_val = cartProduct[i]
            card = card
                .replace("{{product_img}}", obj_val.image)
                .replace("{{product_title}}", obj_val.name)
                .replace("{{nutrients}}", "no-data")
                .replace("{{description}}", "no-data")
                .replace("{{shop-name}}", obj_val.vendor)
                .replace("{{price}}", obj_val.price)
                .replace("{{id}}", obj_val.name)
                .replace("{{id2}}", obj_val.name + "2")
                .replace("{{text-content}}", obj_val.name + "TC")
                .replace("{{idrm}}", obj_val.name + "RM")

            document.getElementById("cart-cart").innerHTML += card
        }
    }
    document.getElementById("items-quantity").textContent = cartName.length
    getCartSummary()
    addOne()
    minusOne()
    removeProduct()
}
let catchCartEvent = async (name, price, category, image, vendor) => {
    document.getElementById("add-to-cart-btn").addEventListener("click", async () => {
        let user = document.getElementById("userEmail").textContent
        if (user.trim() == "bruh") {
            alert("Please sign up/login")
            return false
        }
        let card = await getCartCard()
        if (cartName.includes(name)) {
            return false
        }
        if (!cartName.includes(name)) {

            cartProduct.push({
                name: name,
                price: price,
                category: category,
                image: image,
                vendor: vendor,
                description: "no-data",
                nutrients: "no-data"
            })
            cartName.push(name)
        }
    })
}
let addOne = async () => {
    if (cartName.length == 0) {
        return false
    }
    if (cartName != 0) {
        for (let i = 0; i < cartName.length; i++) {
            document.getElementById(cartName[i]).addEventListener("click", () => {
                let quantity = document.getElementById(cartName[i] + "TC")
                if (quantity.value.includes("-")) {
                    quantity.value = 1
                    return false
                }
                quantity.value = Number(quantity.value) + 1

            })
        }
    }
}
let minusOne = async () => {
    if (cartName.length == 0) {
        return false
    }
    if (cartName != 0) {
        for (let i = 0; i < cartName.length; i++) {
            document.getElementById(cartName[i] + "2").addEventListener("click", () => {
                let quantity = document.getElementById(cartName[i] + "TC")
                if (quantity.value == 0 || quantity.value == "0") {
                    return false
                }
                if (quantity.value.includes("-")) {
                    quantity.value = 1
                    return false
                }
                quantity.value = Number(quantity.value) - 1
            })
        }
    }
}
let removeProduct = async () => {
    if (cartName.length == 0) {
        return false
    }
    if (cartName != 0) {
        for (let i = 0; i < cartName.length; i++) {
            document.getElementById(cartName[i] + "RM").addEventListener("click", async () => {
                let index = cartName.indexOf(cartName[i]);
                let newArr = []
                cartProduct = cartProduct.filter(obj => !obj.name.includes(cartName[i]))
                cartName = cartName.filter(obj => !obj.includes(cartName[i]))
                console.log(cartProduct)
                await loadCartPage()
            })
        }
    }
}
let getCartSummary = async () => {
    let sum = 0
    for (let i = 0; i < cartProduct.length; i++) {
        sum += cartProduct[i].price
    }
    if (cartName.length == 0) {
        document.getElementById("items-summary").textContent = "0$"
        return false
    }
    document.getElementById("items-summary").textContent = sum.toFixed(2) + "$"
}
let buyItems = async () => {
    document.getElementById("buy-items-btn").addEventListener("click", async () => {
        if (cartName.length == 0) {
            alert("Cart Is Empty")
            return false
        }
        let checkboxes = document.getElementsByClassName("product-checkbox")
        let checked_arr = []
        let qtt = []
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked == true) {
                checked_arr.push(cartName[i])
            }
        }
        if (checked_arr.length == 0) {
            alert("No products selected")
            return false
        }
        for (let i = 0; i < checked_arr.length; i++) {
            let val = document.getElementById(checked_arr[i] + "TC").value
            if (val == "" || val == " " || val == "0" || val == 0 || val.includes("-")) {
                alert("Invalid quantity")
                return false
            }
        }
        for (let i = 0; i < checked_arr.length; i++) {
            qtt.push(document.getElementById(checked_arr[i] + "TC").value)
        }
        await buyCPsP(checked_arr, qtt)

    })
}
let buyCPsP = async (arr, qtt) => {
    await loadPurchasePage()
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < cartProduct.length; j++) {
            if (cartProduct[j].name == arr[i]) {
                document.getElementById("items-list").innerHTML += `
                <hr>
          <div class="content" style="display:flex; flex-direction: row; margin-top: 20px;" >
                            <div style="display:flex; align-items: flex-start;">
                                <div style="display:flex; align-items: center; border: none;">
                                    <form action="" onsubmit="return false">
                                        <label class="toggle">
                                            <input class="toggle__input checkbox" type="checkbox" style="opacity: 0;">
                                            <span class="toggle__label">
                                        </label>
                                    </form>
                                    <div class="cart-product-img" style="padding: 0px;">

                                        <img src="`+ cartProduct[i].image + `" alt="" width="80" height="80" style="margin-right: 20px; padding: 0;">
                                    </div>

                                </div>

                                <div class="desc" style="text-align: left; border: none;">
                                    <h3> ` + cartProduct[i].name + `
                                    </h3>
                                    <p class="small" style="width:600px;">
                                        ` + cartProduct[i].category + `
                                    </p>

                                    <h4 class="product-price">
                                        ` + cartProduct[i].price + `<sup>$</sup>
                                    </h4>
                                    <div style="display: flex;">
                                        <p> ` + cartProduct[i].vendor + `</p>
                                    </div>
                                    <div class="quantity">
                                        <div class="punctuation-plus" id="`+ cartProduct[i].name + `">
                                            <span>+</span> 
                                        </div>
                                        <div>
                                            <input type="number" name="num" id="`+ cartProduct[i].name + "TC" + `" class="product-quantity" min="0"
                                                value="`+ qtt[i] + `">
                                        </div>
                                        <div class="punctuation-minus" style="margin-left: -120px;" id="`+ cartProduct[i].name + "2" + `">
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
        `
            }
        }
    }
    console.log(qtt)
    await addOne();
    await minusOne();
}

//add product page
let loadAddProductPage = async () => {
    let response = await fetch("../Views/addProduct.html")
    let result = await response.text()
    shop_content.innerHTML = result

    moreOption()
    renderCurrencies()
    renderWeightUnits()
    moreImage()
    showImage()
    document.getElementById("sell-now-btn").addEventListener("click", async () => {
        checkAddProduct()
    })
}
let showImage = () => {
    myFirebase()
    document.getElementById("PD-Photo").addEventListener("change", (e) => {
        var file = e.target.files[0]
        var storage = firebase.storage().ref(e.target.files[0].name)
        var task = storage.put(file)
            .then((success) => {
                console.log("success")
                storage.put(file).snapshot.ref.getDownloadURL().then((downloadURL) => {
                    document.getElementById("main-img").innerHTML = `
                        <div class="img-bg" id="main-img">
                            <img src="${downloadURL}" height="100%" style="margin: auto;" id="big-image">
                        </div>
                    `
                    console.log(downloadURL)
                });
            }).catch((error) => {
                console.log(error)
            })

    })
}
let showSmallImage = () => {
    myFirebase()
    let img = document.getElementsByClassName("moreImg-input")
    for (let i = 0; i < img.length; i++) {
        img[i].addEventListener("change", (e) => {
            var file = e.target.files[0]
            var storage = firebase.storage().ref(e.target.files[0].name)
            var task = storage.put(file)
                .then((success) => {
                    console.log("success")
                    storage.put(file).snapshot.ref.getDownloadURL().then((downloadURL) => {
                        document.getElementsByClassName("more-img")[i].innerHTML = `
                            <img src="${downloadURL}"  style="margin: auto; max-width: 125px; max-height: 75px;" >
                        `
                    });
                }).catch((error) => {
                    console.log(error)
                })
        })
    }

}
let moreOption = () => {
    document.getElementById("fruitGroup").addEventListener("change", () => {
        let value = document.getElementById("fruitGroup").value
        if (value.includes("More")) {
            document.getElementById("moreOpt-form").style.visibility = "visible"
            document.getElementById("moreOpt-btn").addEventListener("click", addingAOption)
        }
    })
}
let addingAOption = () => {
    let value = document.getElementById("moreOption-input").value
    let newOpt = ""
    if (isEmpty(value) == true) {
        alert("The input is empty")
        return false
    } else {
        newOpt = value
        document.getElementById("fruitGroup").innerHTML += `
            <option value="${newOpt}">${newOpt}</option>

        `
    }
    value = ""
    newOpt = ""
    document.getElementById("moreOpt-form").style.visibility = "hidden"

}
let isEmpty = (value) => {
    value = value
    if (value.length == 0 || value == "") {
        return true
    }
    return "false"
}
let moreImage = async () => {
    document.getElementById("add-img").addEventListener("click", async () => {
        let target = document.getElementById("images-row")
        target.innerHTML += `
                       <div class="more-img"
                                    style="display: flex; justify-content: center; align-items:  center;">

                                </div>
                                <div>
                                    <input type="file" name="" class="moreImg-input">
                                </div>
        `
        showSmallImage()
    })
}
let checkAddProduct = async () => {
    let id_arr = ["warehouse-address", "addPD-phoneNum", "email", "productOrigin", "add-product-name", "add-product-shopname", "description", "nutrients-area", "inventory", "price1", "price2", "weight"]
    let num_id = [isIncludeAlphabet(document.getElementById("price1").value), isIncludeAlphabet(document.getElementById("price1").value), isIncludeAlphabet(document.getElementById("weight").value), isIncludeAlphabet(document.getElementById("inventory").value)]
    let phoneNum = await checkPhoneNumber("addPD-phoneNum")
    var db = firebase.firestore();

    console.log(num_id)

    // if (document.getElementById("userEmail").style.display == "none") {
    //     alert("Please sign up/ login")
    //     return false
    // }
    // for (let i = 0; i < id_arr.length; i++) {
    //     if (isNotFilled(document.getElementById(id_arr[i])) == 0) {
    //         alert("Input cannot be empty")
    //         return false
    //     }
    // }
    // if (await checkPhoneNumber("addPD-phoneNum") != "valid"){
    //     return false
    // }
    myFirebase()


    db.collection("Users").get().then(async (results) => {
        results.forEach(async (doc) => {
            let email = doc._delegate._document.data.value.mapValue.fields.email.stringValue
            if (doc._delegate._document.data.value.mapValue.fields.email.stringValue == document.getElementById("userEmail").textContent) {
                db.collection("Users").doc(doc.id).update({
                    email: email,
                    images: [document.getElementById("big-image").src]
                })
            }
        })
    })
    let name;
    // let category =
    //     let vendor =
    //     let price =
    //     let image =

}
let getURL = async (url) => {
    console.log(url)
}

//product page
let loadProductPage = async (card) => {
    // let response = await fetch("../Views/productPage.html");
    // let result = await response.text();

    shop_content.innerHTML = card;

}
let getProductPage = async () => {
    let response = await fetch("../Views/productPage.html")
    let result = await response.text()
    return result;
}
let getComment = async () => {
    let response = await fetch("../Views/comment.html")
    let result = await response.text()
    return result
}

//category page
let loadCategory = async () => {
    let response = await fetch("../Views/categoryPage.html")
    let result = await response.text()
    shop_content.innerHTML = result

    document.getElementById("fruits-category-btn").addEventListener("click", async () => {
        await loadHome()
        searchingCategory(["Fruits"])
    })
    document.getElementById("nuts-category-btn").addEventListener("click", async () => {
        await loadHome()
        searchingCategory(["Nuts"])
    })
    document.getElementById("exotic-category-btn").addEventListener("click", async () => {
        await loadHome()
        searchingCategory(["Exotic"])
    })
    document.getElementById("fresh-category-btn").addEventListener("click", async () => {
        await loadHome()
        searchingCategory(["fresh"])
    })
    document.getElementById("dried-category-btn").addEventListener("click", async () => {
        await loadHome()
        searchingCategory(["dried"])
    })
}
let renderComment = (comment) => {
    document.getElementById("comment-content").innerHTML += card
}

//sign up and login 

let loadSignUp = async () => {
    let response = await fetch("../Views/signup.html")
    let result = await response.text()
    shop_content.innerHTML = result
    Registering()
}

let Registering = async () => {
    document.getElementById("btnSignup").addEventListener("click", async () => {
        signUp()
        loadHome()
    })
}

let loadLogin = async () => {
    document.getElementById("login-btn").addEventListener("click", async () => {
        let response = await fetch("../Views/login.html")
        let result = await response.text()
        shop_content.innerHTML = result;
        Login()
        catchForgotPassword()
    })
}

let Login = async () => {
    document.getElementById("btnLogin").addEventListener("click", async () => {
        signIn()
        loadHome()
    })
}

let catchForgotPassword = async () => {
    document.getElementById("Fg-password-btn").addEventListener("click", async () => {
        loadForgotPassword()
    })
}

let loadForgotPassword = async () => {
    let response = await fetch("../Views/forgotpassword.html")
    let result = await response.text()
    shop_content.innerHTML = result;

    getPassword()
}

let getPassword = async () => {
    document.getElementById("reset-password-btn").addEventListener('click', async () => {
        resetPassword()
    })
}

let loadProfile = async function () {
    let response = await fetch("./views/profile.html");
    let result = await response.text()
    shop_content.innerHTML = result;

    document.getElementById("reset-password-btn").addEventListener('click', async () => {
        loadForgotPassword()
    })
}

let catchProfileEvent = (a) => {
    document.getElementById("userEmail").addEventListener('click', async () => {
        await loadProfile();
        document.getElementById("profileEmail").textContent = "Email: " + a.user.bc.email
    })
}
// let loadLogOut = async () => {
//     let response = await fetch("../views/profile.html")
//     let result = await response.text()
//     shop_content.innerHTML = result;

//     catchLogOutEvent()
// }

// let catchLogOutEvent = async () => {
//     document.getElementById("log-out-btn").addEventListener('click', async () => {
//         logOut()
//     })
// }

//home
let loadCard = async () => {
    let request = await fetch("../Views/card.html")
    let response = await request.text();
    return response
}

let renderCard = async (card) => {
    document.getElementsByClassName("products-container")[0].innerHTML += card
}

let loadFilterBar = async () => {
    let request = await fetch("../Views/filter.html")
    let response = await request.text()
    document.getElementById("filter-bar").innerHTML = response

    searchVendors()
    searchCategory()
    searchPrice()
}

let loadFooter = async () => {
    let request = await fetch("../Views/footer.html")
    let response = await request.text()
    shop_footer.innerHTML = response
}

let clickProduct = async () => {
    await initProducts()
    let cards = document.getElementsByClassName("card-content")
    document.getElementById("1gGy9L0b9uNbWz1K3JdD").addEventListener("click", loadShit(1))
    console.log(document.getElementById("1gGy9L0b9uNbWz1K3JdD"))
}
let loadShit = (id) => {
    console.log("ahihi")
}

//purchase page
// cc = credit card
let loadPurchasePage = async () => {
    let request = await fetch('../Views/buy.html')
    let value = await request.text()
    shop_content.innerHTML = value;

    await showCC()
    hideCC()
    loadForm()
    buy()

}
let showCC = async () => {
    let target = document.getElementById("pay-by-credit-card")
    target.addEventListener("click", () => {
        if (target.checked == true) {
            document.getElementById("card-list").style.display = "block"
            renderCreditCards()

            return true
        }
        if (target.checked == false) {
            document.getElementById("card-list").style.display = "none"

            return false
        }
    })
}
let hideCC = () => {
    let target = document.getElementById("pay-on-delivery")
    target.addEventListener("click", () => {
        if (target.checked == true) {
            document.getElementById("card-list").style.display = "none"
            return true
        }
    })

}
let loadForm = async () => {
    document.getElementById("private-home").addEventListener("click", () => {
        document.getElementById("form-address").innerHTML = ""
        document.getElementById("post-office-address").innerHTML = ""

        let radio = document.getElementById("private-home").checked
        if (radio == true) {
            document.getElementById("real-address-form").style.display = "block"
            loadCountriesList("countries")
            loadAddressForm()
            document.getElementById("countries").addEventListener("change", () => {
                loadAddressForm()
            })
        }
    })
    document.getElementById("post-office").addEventListener("click", () => {
        document.getElementById("real-address-form").style.display = "none"
        document.getElementById("form-address").innerHTML = ""
        document.getElementById("post-office-address").innerHTML = ""
        let radio = document.getElementById("post-office").checked
        if (radio == true) {
            document.getElementById("post-office-form").style.display = "block"
            loadCountriesList('post-office-countries')
            loadPostOfficeForm()
            document.getElementById("post-office-countries").addEventListener("change", () => {
                loadPostOfficeForm()
            })
        }
    })
    if (cartName.length == 0) {
        await addOne();
        await minusOne();
    }
}

let buy = async () => {
    let btn = document.getElementById("buy-now-btn")
    btn.addEventListener("click", async () => {
        let err = []
        let arr = await checkingRightSide()
        if (await checkingLeftSide() == false) {
            return false
        }
        if (arr.includes(undefined || arr.includes(0))) {
            alert("OOPS! Something's wrong")
            return false
        }
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] != 1) {
                err.push(1)
            }
        }
        let date = document.getElementById("expiration-date").value
        if (date == "" || date == " " || date.length == 0) {
            alert("OOPS! Something's wrong")
            return false
        }
        console.log(date)
        console.log(arr)
        if (err.length == 0) {
            loadHome()
            alert("SUCCESSFUL PURCHASE")
        }
        console.log(err)
    })
}

/////////////////////////////////////
let checkingRightSide = async () => {
    let pts = []
    pts.push(await checkPaymentMethod())
    pts.push(await checkAddress())
    pts.push(await checkQuantity())
    return pts
}
//////////////////////////////////
let checkAddress = async () => {
    let private_house = document.getElementById("private-home").checked
    let post_office = document.getElementById("post-office").checked
    if (private_house == true) {
        let pts = 0
        pts += await checkPrivateHouse()
        if (pts == 1) {
            return 1
        }
    }
    if (post_office == true) {
        let pts = 0
        pts += await checkPostOffice()
        if (pts == 1) {
            return 1
        }
    }
    if (private_house == false && post_office == false) {
        alert("Must choose one of the addresses")
        return 0
    }
}

let checkPrivateHouse = async () => {
    let select = document.getElementById("countries").value
    let beginNum = 1
    const countryThatHasStates = [
        "India",
        "USA",
        "America",
        "Brazil",
        "Nigeria",
        "Mexico",
        "Ethiopia",
        "Germany",
        "Myanmar",
        "Australia",
        "South Sudan",
        "Micronesia",
        "Palau"
    ]
    const address = [

        {
            name: "State",
        },
        {
            name: "City/Province"
        },
        {
            name: "District"
        },
        {
            name: "Ward"
        },
        {
            name: "Street name"
        },
        {
            name: "House_number"
        }
    ]
    let err = []
    for (let i = 0; i < countryThatHasStates.length; i++) {
        if (select == countryThatHasStates[i]) {
            beginNum = 0
        }
    }
    for (let i = beginNum; i < address.length; i++) {
        let val = document.getElementById(address[i].name).value
        err.push(isEmpty(val))
    }
    if (err.includes(true)) {
        alert("Private home address: \n - Input cannot be empty")
        return 0
    }
    let checkArr = () => {
        return "false"
    }
    if (err.every(checkArr)) {
        return 1
    }
}

let checkPostOffice = async () => {
    let select = document.getElementById("countries").value
    let beginNum = 1
    const countryThatHasStates = [
        "India",
        "USA",
        "America",
        "Brazil",
        "Nigeria",
        "Mexico",
        "Ethiopia",
        "Germany",
        "Myanmar",
        "Australia",
        "South Sudan",
        "Micronesia",
        "Palau"
    ]
    const postOfficeAddress = [
        "State",
        "City/ Province",
        "District",
        "Street",
        "Zip/ Postal Code",

    ]
    let err = []
    for (let i = 0; i < countryThatHasStates.length; i++) {
        if (select == countryThatHasStates[i]) {
            beginNum = 0
        }
    }
    for (let i = beginNum; i < postOfficeAddress.length; i++) {
        let val = document.getElementById(postOfficeAddress[i]).value
        err.push(isEmpty(val))
    }
    if (err.includes(true)) {
        alert("Post Office Address: \n - Input cannot be empty")
        return 0
    }
    let checkArr = () => {
        return "false"
    }
    if (err.every(checkArr)) {
        return 1
    }
}
let checkQuantity = async () => {
    let qtt = document.getElementsByClassName("product-quantity")[0]
    if (qtt.value == 0 || qtt.value.includes("-")) {
        alert("Quantity cannot be negative and 0")
        return 0
    }
    if (qtt.value != 0 && !qtt.value.includes("-")) {
        return 1
    }
    console.log(qtt)
}
//////////////////////////////////
let checkPaymentMethod = async () => {
    let cc = document.getElementById("pay-by-credit-card").checked
    let od = document.getElementById("pay-on-delivery").checked
    if (cc == false && od == false) {
        alert("must choose one of two payment methods")
        return 0
    } else if (cc == true) {
        let pts = 0
        let cc = await checkCC()
        return cc
    }
    if (od == true) {
        return 1
    }
}

let checkCC = async () => {
    let pts = 0
    pts += await checkCCT()
    pts += await checkCCI()
    pts += dateCompare()
    if (pts == 3) {
        return 1
    }
}

let checkCCT = async () => {
    let CCs = document.getElementsByClassName("credit-cards")
    let arr = [];
    for (let i = 0; i < CCs.length; i++) {
        arr.push(CCs[i].checked)
    }
    if (arr.includes(true)) {
        return 1
    } else {
        alert("Must choose a credit card")
        return false
    }
}

let checkCCI = async () => {
    let input_arr = ["card-number", "name-on-card"]
    let pts = 0
    let cardNum = document.getElementById("card-number").value

    for (let i = 0; i < input_arr.length; i++) {
        let ck = isNotFilled(document.getElementById(input_arr[i]))
        pts += ck
    }
    pts += isIncludeAlphabet(cardNum)
    if (cardNum.length == 16) {
        pts += 1
    }

    if (document.getElementById("name-on-card").value.length > 4) {
        pts += 1
    }

    if (pts == 5) {
        return 1
    } else {
        alert("- Input cant be empty \n - Card numbers cant include alphabetic characters, special characters and must have 16 digits  \n  - Must be longer than 5 characters ")
        return false
    }

}

let dateCompare = () => {
    return isNotFilled(document.getElementById("expiration-date").value)
}

/////////////////////////////////////
let checkingLeftSide = async () => {
    let first_name = await checkFirstName()
    let last_name = await checkLastName()
    let phone_number = await checkPhoneNumber("buy-phoneNum")
    let checkArray = () => {
        return "valid"
    }
    let arr = [first_name, last_name, phone_number]
    if (arr.includes(false)) {
        return false
    }
    if (arr.every(checkArray)) {
        return true
    }
}
let checkFirstName = async () => {
    let name = document.getElementById("first-name").value
    let points = 0
    points += isNotFilled(name)
    points += isIncludeInvalidChars(name)
    points += isLongerThan(name, 100)
    if (points == 3) {
        return "valid"
    }
    if (points != 3) {
        alert("First name must: \n - Shorter than 100 characters \n - Not includes special characters \n - Not empty")
        return false
    }

}
let checkLastName = async () => {
    let name = document.getElementById("last-name").value
    let points = 0
    points += isNotFilled(name)
    points += isIncludeInvalidChars(name)
    points += isLongerThan(name, 100)
    if (points == 3) {
        return "valid"
    }
    if (points != 3) {
        alert("Last name must: \n - Shorter than 100 characters \n - Not includes special characters \n - Not empty")
        return false
    }
}
let checkPhoneNumber = async (id) => {
    let phone = document.getElementById(id).value
    phone = phone.trim()
    let points = 0
    points += isNotFilled(phone)
    points += isIncludeAlphabet(phone)
    if (phone.length > 9) {
        points += 1
    }

    if (phone.length < 12) {
        points += 1
    }
    if (points == 4) {
        return "valid"
    } if (points != 4) {
        alert("Phone number must: \n - Not empty \n - Longer than 9 digits \n - Shorter than 12 digits \n - Not include special characters and alphabet letters ")
        return false
    }
}


///////////////////////////////////////
let isNotFilled = (input) => {
    if (input.value == "" || input.value == " " || input.length == 0) {
        return 0
    } else {
        return 1
    }
}
let isIncludeInvalidChars = (input) => {
    let invalid = "~!@#$%^&*()`_+-={}|[]\;:'<>?,./1234567890" + '"'
    let err = []
    invalid = invalid.split('')
    for (let i = 0; i < invalid.length; i++) {
        if (input.includes(invalid[i])) {
            err.push(invalid[i])
        }
    }
    if (err.length == 0) {
        return 1
    }
    if (err.length != 0) {
        return 0
    }
}
let isIncludeAlphabet = (input) => {
    let invalid = "!@#$%^&*`{}|[]()-\=_+;:'<>?,./qwertyuiopasdfghjklzxcvbnm" + '"'
    let err = []
    for (let i = 0; i < invalid.length; i++) {
        if (input.includes(invalid[i])) {
            err.push(invalid[i])
        }
    }
    console.log(err)
    if (err.length != 0) {
        return 0
    } else if (err.length == 0) {
        return 1
    }
}

let isLongerThan = (input, number) => {
    let length = input.length
    if (length > number) {
        return 0
    } else {
        return 1
    }
}

/////////////////////////
let getPurchasePage = async () => {
    let response = await fetch("../Views/buy.html")
    let result = await response.text()
    return result
}
let replaceFunc = async (img, title, price, vendor, category) => {
    // let html = await getPurchasePage()
    // html.replace("{{img}}", img)
    //     .replace("{{title}}", title)
    //     .replace("{{category}}", category)
    //     .replace("{{price}}", price)
    //     .replace("{{shop-name}}", vendor)
    shop_content.innerHTML = `
                    <div class="add-product-container buy-product-container ">
    <link rel="stylesheet" href="../SCSS/addProductPage.css" scoped>
    <link rel="stylesheet" href="../SCSS/buy.css">
    <div class="container">
        <div class="contact-wrap w-100 p-md-5 p-4">
            <div id="form-message-warning" class="mb-4">
                <h2 style="color: black;">Choose a payment method</h2>
            </div>
            <form method="POST" id="buy-product" name="buy-product" class="buy-product" onsubmit="return false">
                <div class="row">
                    <div>
                        <div class="payment-menthod">
                            <div>
                                <input type="radio" name="paymentMethod" value="credit-card" id="pay-by-credit-card">
                                <label for="" class="paymentMethod">
                                    Pay by credit card
                                </label>
                            </div>
                            <div>
                                <div id="card-list" style="display: none;">
                                    <div>
                                        <div class="form__group field">
                                            <input type="input" class="form__field" placeholder="Card number"
                                                name="card-number" id="card-number" />
                                            <label for="" class="form__label">Card number</label>
                                        </div>

                                        <div class="form__group field">
                                            <input type="input" class="form__field" placeholder="Name on card"
                                                name="name-on-card" id="name-on-card" />
                                            <label for="" class="form__label">Name on card</label>
                                        </div>

                                        <div class="form__group field">
                                            <label for=""> Expiration Date</label>
                                            <input type="date" id="expiration-date" name="expiration-date">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span>-----------------------------------</span>
                        <div class="payment-menthod">
                            <input type="radio" name="paymentMethod" value="delivery" id="pay-on-delivery">
                            <label for="" class="paymentMethod">
                                Payment on delivery
                            </label>
                        </div>
                    </div>
                    <div>
                        <div id="form-message-warning" class="mb-4">
                            <h2 style="color: black;">Address</h2>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <input type="radio" value="private home address" id="private-home" name="address">
                                    <label for="" class="paymentMethod">Private home address</label>
                                </div>
                                <span>-----------------------------------</span>
                                <div>
                                    <input type="radio" value="post-office" id="post-office" name="address">
                                    <label for="" class="paymentMethod">Post Office</label>
                                </div>
                            </div>

                            <div id="real-address-form" style="display : none;">
                                <label for="" class="select">Your country (or territory)</label>*:</label>
                                <select id="countries">
                                    <option value="USA" selected>USA (default)</option>
                                </select>
                                <div id="form-address">

                                </div>
                            </div>
                            <div id="post-office-form" style="display : none;">
                                <label for="" class="select">Your country (or territory)</label>*:</label>
                                <select id="post-office-countries">
                                    <option value="USA" selected>USA (default)</option>
                                </select>
                                <div id="post-office-address">

                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="form-message-warning" class="mb-4">
                        <h2 style="color: black;">Quantity</h2>
                    </div>
                    <div>
                        <div class="content" style="display:flex; flex-direction: row;" id="user-cart">
                            <!-- adding product here -->
                            <!-- Open the code if you want to see the page interface -->
                            <!-- THIS IS AN EXAMPLE -->
                            <div style="display:flex; align-items: flex-start;">
                                <div style="display:flex; align-items: center; border: none;">
                                    <form action="" onsubmit="return false">
                                        <label class="toggle">
                                            <input class="toggle__input checkbox" type="checkbox" style="opacity: 0;">
                                            <span class="toggle__label">
                                        </label>
                                    </form>
                                    <div class="cart-product-img" style="padding: 0px;">

                                        <img src="${img}" alt="" width="80" height="80" style="margin-right: 20px; padding: 0;">
                                    </div>

                                </div>

                                <div class="desc" style="text-align: left; border: none;">
                                    <h3> ${title}
                                    </h3>
                                    <p class="small" style="width:600px;">
                                        ${category}
                                    </p>

                                    <h4 class="product-price">
                                        ${price}<sup>$</sup>
                                    </h4>
                                    <div style="display: flex;">
                                        <p>${vendor} </p>
                                    </div>
                                    <div class="quantity">
                                        <div class="punctuation-plus" id="${title}">
                                            <span>+</span>
                                        </div>
                                        <div>
                                            <input type="number" name="num"  id="${title + "TC"}" class="product-quantity" min="0"
                                                value="1">
                                        </div>
                                        <div class="punctuation-minus" style="margin-left: -120px;"  id="${title + "2"}">
                                            <span>-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div class="form-group">
                            <div class="btn btn-primary" id="buy-now-btn" style="margin-top: 20px;">Buy
                                now</div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div style="display:flex; width: 600px;">
            <div class="info-wrap p-md-5 " style="padding: 50px; background-color: #007bff; ">
                <h3>Purchase Page</h3>
                <div class="dbox" style="margin-top:40px; display:flex;">
                    <div class="icon center">
                        <span class="fas fa-signature"></span>
                    </div>
                    <div class="text">
                        <p><span>First name:</span>
                            <input type="text" class="g-input" name="name" id="first-name" placeholder="First Name"
                                style="background-color: transparent; border:none; border-bottom: 1px solid white; color:white; outline: none;">
                        </p>
                    </div>
                </div>
                <div class="dbox " style="margin-top:40px; display:flex;">
                    <div class="icon center">
                        <span class="fas fa-signature"></span>
                    </div>
                    <div class="text ">
                        <p><span>Last name:</span> <input type="text" class="g-input" name="name" id="last-name"
                                placeholder="Last name"
                                style="background-color: transparent; border:none; border-bottom: 1px solid white; color:white; outline: none;">
                        </p>
                    </div>
                </div>
                <div class="dbox  " style="margin-top:40px; display:flex;">
                    <div class="icon center">
                        <span class="fa fa-phone"></span>
                    </div>
                    <div class="text">
                        <p><span>Phone number:</span> <a>
                                <input type="text" class="g-input" name="" id="buy-phoneNum" placeholder="phone"
                                    style="background-color: transparent; border:none; border-bottom: 1px solid white; color:white; outline: none;">
                            </a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                    `
    await loadForm()
    showCC()
    hideCC()
    
    buy()

    document.getElementById(title).addEventListener("click", () => {
        let quantity = document.getElementById(title + "TC")
        if (quantity.value.includes("-")) {
            quantity.value = 1
            return false
        }
        quantity.value = Number(quantity.value) + 1



    })

    document.getElementById(title + "2").addEventListener("click", () => {
        let quantity = document.getElementById(title + "TC")
        if (quantity.value == 0 || quantity.value == "0") {
            return false
        }
        if (quantity.value.includes("-")) {
            quantity.value = 1
            return false
        }
        quantity.value = Number(quantity.value) - 1
    })
}

//////////////////////
//search 
let searchBar = async () => {
    await loadHome()
    document.getElementsByClassName("products-container")[0].innerHTML = ""

    let val = document.getElementById("main-search-bar").value
    searching(val)
}

//filter 
let searchVendors = async () => {
    let checkboxes = document.getElementsByClassName("fruits_vendor")
    let arr = [];
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", async () => {
            arr = []
            for (let b = 0; b < checkboxes.length; b++) {
                if (checkboxes[b].checked == true) {
                    arr.push(checkboxes[b].value)
                }
            }
            searchingVendors(arr)
            if (arr.length == 0) {
                await initProducts()
            }
        })
    }
}

let searchCategory = async => {
    let checkboxes = document.getElementsByClassName("categories-category")
    let arr = []
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click", async () => {
            arr = []
            for (let b = 0; b < checkboxes.length; b++) {
                if (checkboxes[b].checked == true) {
                    arr.push(checkboxes[b].value)
                }
            }
            console.log(arr)
            searchingCategory(arr)
            if (arr.length == 0) {
                await initProducts()
            }
        })
    }
}

let searchPrice = async () => {
    document.getElementById("apply").addEventListener("click", async () => {
        let price1 = document.getElementById("price1")
        let price2 = document.getElementById("price2")
        if (isNotFilled(price1) == 0 || isNotFilled(price2) == 0) {
            alert("Input cannot be empty")
            return false
        }
        price1 = price1.value
        price2 = price2.value
        if (price1.includes("-") || price2.includes("-")) {
            alert("Input value cannot be negative")
            return false
        }

        let val1 = Number(price1) / 100
        let val2 = Number(price2) / 100
        console.log(val1, val2)
        await searchingPrice(val1, val2)
    })
}

///SUPPORT
let loadSupportList1 = async function () {
    let response = await fetch("./Views/support_list1.html");
    let result = await response.text()
    shop_content.innerHTML = result;
}

let loadSupportList2 = async function () {
    let response = await fetch("./Views/support_list2.html");
    let result = await response.text()
    shop_content.innerHTML = result;
}

let loadSupportList3 = async function () {
    let response = await fetch("./Views/support_list3.html");
    let result = await response.text()
    shop_content.innerHTML = result;
}

let loadSupportList4 = async function () {
    let response = await fetch("./Views/support_list4.html");
    let result = await response.text()
    shop_content.innerHTML = result;
}

let loadSupportList5 = async function () {
    let response = await fetch("./Views/support_list5.html");
    let result = await response.text()
    shop_content.innerHTML = result;
}

let loadSupportPage = async function () {
    let response = await fetch("./Views/support.html");
    let result = await response.text()
    shop_content.innerHTML = result;

    document.getElementById("support_list1").addEventListener('click', async () => {
        loadSupportList1()
    })

    document.getElementById("support_list2").addEventListener('click', async () => {
        loadSupportList2()
    })

    document.getElementById("support_list3").addEventListener('click', async () => {
        loadSupportList3()
    })

    document.getElementById("support_list4").addEventListener('click', async () => {
        loadSupportList4()
    })

    document.getElementById("support_list5").addEventListener('click', async () => {
        loadSupportList5()
    })
}


export { initHTML, getMenu, catchProfileEvent, loadProfile, loadCard, renderCard, getProductPage, loadProductPage, myFirebase, clickProduct, loadHome, getPurchasePage, replaceFunc, catchCartEvent, loadCartPage }