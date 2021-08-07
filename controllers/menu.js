import { renderCurrencies, renderWeightUnits, initProducts, loadClickedProduct } from "./database.js";
import { resetPassword, signIn, signUp } from "./authen.js"

var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');
var shop_footer = document.createElement('div');

let myFirebase = () => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyDe3p8_DRJT-PZ1R9FH9hNvso9EU6gedno",
        authDomain: "selling-fruit.firebaseapp.com",
        projectId: "selling-fruit",
        storageBucket: "selling-fruit.appspot.com",
        messagingSenderId: "990490158508",
        appId: "1:990490158508:web:de1be9be2fade2e6414609",
        measurementId: "G-RBG9QM9M8B"
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
    document.getElementById("cart-page-btn").addEventListener("click", async () => {
        await loadCartPage()
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

}

let loadMenu = async () => {
    let response = await fetch("../Views/menu.html")
    let result = await response.text()
    shop_menu.innerHTML = result
}

//home
let loadHome = async () => {
    let response = await fetch('../Views/home.html')
    let result = await response.text()
    shop_content.innerHTML = result;

    // document.getElementById("product-page-btn").addEventListener("click", loadProductPage)
    await loadFilterBar()
    await initProducts()
    await clickProduct()
}

//cart page
let loadCartPage = async () => {
    let response = await fetch("../Views/cartPage.html");
    let result = await response.text();
    shop_content.innerHTML = result;
    continueShopping()
    selectAllProduct()
    unselectAllProduct()
    addMore()
    minusMore()
}
let continueShopping = () => {
    document.getElementById("continue-shopping-btn").addEventListener("click", () => {
        getMenu();
    })
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
let addMore = () => {
    let plus = document.getElementsByClassName("punctuation-plus")
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", () => {
            addOne(i)
        })
    }
}
let addOne = (index) => {
    let qtt = document.getElementsByClassName("product-quantity")
    let value = qtt[index].value
    if (value.length == 0 || value.includes("-")) {
        qtt[index].value = 1

        return false
    }
    qtt[index].value = Number(qtt[index].value) + 1

}
let minusMore = () => {
    let plus = document.getElementsByClassName("punctuation-minus")
    for (let i = 0; i < plus.length; i++) {
        plus[i].addEventListener("click", () => {
            minusOne(i)
        })
    }
}
let minusOne = (index) => {
    let qtt = document.getElementsByClassName("product-quantity")
    let value = qtt[index].value
    if (value.length == 0 || value.includes("-")) {
        qtt[index].value = 1

        return false
    }
    value = Number(value)
    if (value == 0 || value == 1) {
        qtt[index].value = 1
        return false
    }

    qtt[index].value = Number(qtt[index].value) - 1
}
let getCartCard = async () => {
    let response = await fetch("../Views/cartProduct.html")
    let result = await response.text()
    return result
}
let renderCartCard = (card) => {
    document.getElementById("user-cart").innerHTML += card
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
                            <img src="${downloadURL}" height="100%" style="margin: auto;">
                        </div>
                    `
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
    value = value.trim()
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

//product page
let loadProductPage = async (card) => {
    // let response = await fetch("../Views/productPage.html");
    // let result = await response.text();
    shop_content.innerHTML =card;
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
}

let loadFooter = async () => {
    let request = await fetch("../Views/footer.html")
    let response = await request.text()
    shop_footer.innerHTML = response
}

let clickProduct = async () => {
    let cards = document.getElementsByClassName("product-card")
    for (let i = 0; i < cards.length; i++){
        cards[i].addEventListener("click", async () => {
            loadClickedProduct(i)
        })
    }
}

export { initHTML, getMenu, catchProfileEvent, loadProfile, loadCard, renderCard, getProductPage, loadProductPage, myFirebase }