import { Product } from "../Models/product.js"
import { renderCard, loadCard, getProductPage, loadProductPage, myFirebase, clickProduct, loadHome, getPurchasePage, replaceFunc, catchCartEvent } from "../Controllers/menu.js"

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
const id_array = [
    "1gGy9L0b9uNbWz1K3JdD",
    "88aJf9oCfqK73joZ3lrL",
    "CCyPvpz84yYFNY5dJExz",
    "FwFJnEDncBdlgwhEOQqp",
    "GtzXyPA3nXyRsHBzIZXi",
    "LHL50yiMiOtBJ4jfkTcm",
    "NP9lz8HK2hmt0WuIqyEo",
    "PqB4ksKxfSr1xXhhqplC",
    "RFUu0wjyZ48eNWb10qrV",
    "VB2hYN98pN6O4cQh9Hy3",
    "WDATrYDV6zp6dy87BTIf",
    "X367wZfyk9nNZ3Q3cw3t",
    "YiXzSdLVNvgLOyDdch6W",
    "htAA8wGvMM9NkDXigqtc",
    "in3ohVErT0qCD84dq5cE",
    "j8eoc0NpTs8jr98qEtu0",
    "k3E5t6tTolJFPLvNAfoe",
    "lSpkLFIxQHe5evptC3kD",
    "nRZ6aLOFemRAsMSPKkgX",
    "sZpEDrEDChwBixraMo5i",
    "x3RvJVxidsWD3coOs66Q",
    "xXMR2L19jtpEWopTX16G",
    "xzlD0t1j4mnATUsnv32r",
    "yEvj0c8jOfrdfamtLvFJ",
]
const creditCards = [
    {
        id: "cc-visa",
        class: "fab fa-cc-visa",
        name: "Visa",
    },
    {
        id: "cc-stripe",
        class: "fab fa-cc-stripe",
        name: "Stripe",
    },
    {
        id: "cc-paypal",
        class: "fab fa-cc-paypal",
        name: "Paypal",
    },
    {
        id: "cc-mastercard",
        class: "fab fa-cc-mastercard",
        name: "Mastercard",
    },
    {
        id: "cc-JCB",
        class: "fab fa-cc-jcb",
        name: "JCB",
    },
    {
        id: "cc-discover",
        class: "fab fa-cc-discover",
        name: "Discover",
    },
    {
        id: "cc-diners-club",
        class: "fab fa-cc-diners-club",
        name: "Diners Club"
    },
    {
        id: "cc-apple-pay",
        class: "fab fa-apple-pay",
        name: "Apple Pay"
    },
    {
        id: "cc-amex",
        class: "fab fa-cc-amex",
        name: "American Express"
    },
    {
        id: "cc-amazon-pay",
        class: "fab fa-amazon-pay",
        name: "Amazon Pay"
    }
]
const countriesList = [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Barbados', code: 'BB' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Belize', code: 'BZ' },
    { name: 'Benin', code: 'BJ' },
    { name: 'Bermuda', code: 'BM' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Bolivia', code: 'BO' },
    { name: 'Bosnia and Herzegovina', code: 'BA' },
    { name: 'Botswana', code: 'BW' },
    { name: 'Bouvet Island', code: 'BV' },
    { name: 'Brazil', code: 'BR' },
    { name: 'British Indian Ocean Territory', code: 'IO' },
    { name: 'Brunei Darussalam', code: 'BN' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Burkina Faso', code: 'BF' },
    { name: 'Burundi', code: 'BI' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Cameroon', code: 'CM' },
    { name: 'Canada', code: 'CA' },
    { name: 'Cape Verde', code: 'CV' },
    { name: 'Cayman Islands', code: 'KY' },
    { name: 'Central African Republic', code: 'CF' },
    { name: 'Chad', code: 'TD' },
    { name: 'Chile', code: 'CL' },
    { name: 'China', code: 'CN' },
    { name: 'Christmas Island', code: 'CX' },
    { name: 'Cocos (Keeling) Islands', code: 'CC' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Comoros', code: 'KM' },
    { name: 'Congo', code: 'CG' },
    { name: 'Congo, The Democratic Republic of the', code: 'CD' },
    { name: 'Cook Islands', code: 'CK' },
    { name: 'Costa Rica', code: 'CR' },
    { name: 'Cote D\'Ivoire', code: 'CI' },
    { name: 'Croatia', code: 'HR' },
    { name: 'Cuba', code: 'CU' },
    { name: 'Cyprus', code: 'CY' },
    { name: 'Czech Republic', code: 'CZ' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Djibouti', code: 'DJ' },
    { name: 'Dominica', code: 'DM' },
    { name: 'Dominican Republic', code: 'DO' },
    { name: 'Ecuador', code: 'EC' },
    { name: 'Egypt', code: 'EG' },
    { name: 'El Salvador', code: 'SV' },
    { name: 'Equatorial Guinea', code: 'GQ' },
    { name: 'Eritrea', code: 'ER' },
    { name: 'Estonia', code: 'EE' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Falkland Islands (Malvinas)', code: 'FK' },
    { name: 'Faroe Islands', code: 'FO' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Finland', code: 'FI' },
    { name: 'France', code: 'FR' },
    { name: 'French Guiana', code: 'GF' },
    { name: 'French Polynesia', code: 'PF' },
    { name: 'French Southern Territories', code: 'TF' },
    { name: 'Gabon', code: 'GA' },
    { name: 'Gambia', code: 'GM' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Germany', code: 'DE' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Gibraltar', code: 'GI' },
    { name: 'Greece', code: 'GR' },
    { name: 'Greenland', code: 'GL' },
    { name: 'Grenada', code: 'GD' },
    { name: 'Guadeloupe', code: 'GP' },
    { name: 'Guam', code: 'GU' },
    { name: 'Guatemala', code: 'GT' },
    { name: 'Guernsey', code: 'GG' },
    { name: 'Guinea', code: 'GN' },
    { name: 'Guinea-Bissau', code: 'GW' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Haiti', code: 'HT' },
    { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
    { name: 'Holy See (Vatican City State)', code: 'VA' },
    { name: 'Honduras', code: 'HN' },
    { name: 'Hong Kong', code: 'HK' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Iceland', code: 'IS' },
    { name: 'India', code: 'IN' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Iran, Islamic Republic Of', code: 'IR' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Isle of Man', code: 'IM' },
    { name: 'Israel', code: 'IL' },
    { name: 'Italy', code: 'IT' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Japan', code: 'JP' },
    { name: 'Jersey', code: 'JE' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Kazakhstan', code: 'KZ' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Kiribati', code: 'KI' },
    { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
    { name: 'Korea, Republic of', code: 'KR' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Kyrgyzstan', code: 'KG' },
    { name: 'Lao People\'S Democratic Republic', code: 'LA' },
    { name: 'Latvia', code: 'LV' },
    { name: 'Lebanon', code: 'LB' },
    { name: 'Lesotho', code: 'LS' },
    { name: 'Liberia', code: 'LR' },
    { name: 'Libyan Arab Jamahiriya', code: 'LY' },
    { name: 'Liechtenstein', code: 'LI' },
    { name: 'Lithuania', code: 'LT' },
    { name: 'Luxembourg', code: 'LU' },
    { name: 'Macao', code: 'MO' },
    { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
    { name: 'Madagascar', code: 'MG' },
    { name: 'Malawi', code: 'MW' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Mali', code: 'ML' },
    { name: 'Malta', code: 'MT' },
    { name: 'Marshall Islands', code: 'MH' },
    { name: 'Martinique', code: 'MQ' },
    { name: 'Mauritania', code: 'MR' },
    { name: 'Mauritius', code: 'MU' },
    { name: 'Mayotte', code: 'YT' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Micronesia, Federated States of', code: 'FM' },
    { name: 'Moldova, Republic of', code: 'MD' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Mongolia', code: 'MN' },
    { name: 'Montserrat', code: 'MS' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Mozambique', code: 'MZ' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Nauru', code: 'NR' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Netherlands Antilles', code: 'AN' },
    { name: 'New Caledonia', code: 'NC' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Nicaragua', code: 'NI' },
    { name: 'Niger', code: 'NE' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Niue', code: 'NU' },
    { name: 'Norfolk Island', code: 'NF' },
    { name: 'Northern Mariana Islands', code: 'MP' },
    { name: 'Norway', code: 'NO' },
    { name: 'Oman', code: 'OM' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Palau', code: 'PW' },
    { name: 'Palestinian Territory, Occupied', code: 'PS' },
    { name: 'Panama', code: 'PA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Paraguay', code: 'PY' },
    { name: 'Peru', code: 'PE' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Pitcairn', code: 'PN' },
    { name: 'Poland', code: 'PL' },
    { name: 'Portugal', code: 'PT' },
    { name: 'Puerto Rico', code: 'PR' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Reunion', code: 'RE' },
    { name: 'Romania', code: 'RO' },
    { name: 'Russian Federation', code: 'RU' },
    { name: 'RWANDA', code: 'RW' },
    { name: 'Saint Helena', code: 'SH' },
    { name: 'Saint Kitts and Nevis', code: 'KN' },
    { name: 'Saint Lucia', code: 'LC' },
    { name: 'Saint Pierre and Miquelon', code: 'PM' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC' },
    { name: 'Samoa', code: 'WS' },
    { name: 'San Marino', code: 'SM' },
    { name: 'Sao Tome and Principe', code: 'ST' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Senegal', code: 'SN' },
    { name: 'Serbia and Montenegro', code: 'CS' },
    { name: 'Seychelles', code: 'SC' },
    { name: 'Sierra Leone', code: 'SL' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Slovakia', code: 'SK' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Solomon Islands', code: 'SB' },
    { name: 'Somalia', code: 'SO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
    { name: 'Spain', code: 'ES' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Suriname', code: 'SR' },
    { name: 'Svalbard and Jan Mayen', code: 'SJ' },
    { name: 'Swaziland', code: 'SZ' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Syrian Arab Republic', code: 'SY' },
    { name: 'Taiwan, Province of China', code: 'TW' },
    { name: 'Tajikistan', code: 'TJ' },
    { name: 'Tanzania, United Republic of', code: 'TZ' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Timor-Leste', code: 'TL' },
    { name: 'Togo', code: 'TG' },
    { name: 'Tokelau', code: 'TK' },
    { name: 'Tonga', code: 'TO' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Tunisia', code: 'TN' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Turkmenistan', code: 'TM' },
    { name: 'Turks and Caicos Islands', code: 'TC' },
    { name: 'Tuvalu', code: 'TV' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'United Arab Emirates', code: 'AE' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' },
    { name: 'United States Minor Outlying Islands', code: 'UM' },
    { name: 'Uruguay', code: 'UY' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Vanuatu', code: 'VU' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Viet Nam', code: 'VN' },
    { name: 'Virgin Islands, British', code: 'VG' },
    { name: 'Virgin Islands, U.S.', code: 'VI' },
    { name: 'Wallis and Futuna', code: 'WF' },
    { name: 'Western Sahara', code: 'EH' },
    { name: 'Yemen', code: 'YE' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' }
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
const postOfficeAddress = [
    "State",
    "City/ Province",
    "District",
    "Street",
    "Zip/ Postal Code",

]
const countryThatHasStates = [
    "India",
    "USA",
    "Brazil",
    "Nigeria",
    "Mexico",
    "Ethiopia",
    "Germany",
    "Myanmar",
    "Australia",
    "South Sudan",
    "Micronesia",
    "Palau",
    "America"
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
let initProducts = async () => {
    var product_obj = []
    let card = await loadCard()
    myFirebase()
    var db = firebase.firestore();

    db.collection("Products").get().then(async (results) => {
        // console.log(results)
        results.forEach(async (doc, index) => {
            // console.log(doc.id)
            let field = doc._delegate._document.data.value.mapValue.fields
            let product = initProduct(field)

            let name = (await product).getName()
            let price = (await product).setPrice()
            let category = (await product).getCategory()
            let image = (await product).getImage()
            let vendor = await (await product).getVendor()

            let newCard = card.replace("{{image}}", image).replace("{{title}}", name).replace("{{category}}", category).replace("{{price}}", price).replace("{{vendor}}", vendor).replace("{{id}}", doc.id)
            await renderCard(newCard)

            catchEvent()



        })
    })



    // for (let i = 0; i < 24; i++) {
    //     let product = initProduct(data[i])

    //     // DO NOT OPEN
    //     // db.collection("Products").add({
    //     //     name : (await product).getName(),
    //     //     price : (await product).setPrice(),
    //     //     category : (await product).getCategory(),
    //     //     image : (await product).getImage(),
    //     //     vendor : await (await product).getVendor()
    //     // }).then((document) => {
    //     //     console.log(document.id)
    //     // }).catch((error) => {
    //     //     console.log(error.message)
    //     // })

}

let initProduct = async (data) => {
    let name = data.name.stringValue
    let price = data.price.doubleValue
    let category = data.category.stringValue
    let image = data.image.stringValue
    let vendor = data.vendor.stringValue
    let id = data.id.stringValue

    return new Product(name, price, category, image, vendor, id)
}

let loadClickedProduct = async (id) => {

    var db = firebase.firestore();

    db.collection("Products").get().then(async (results) => {
        results.forEach(async (product) => {
            let product_obj = initProduct(product._delegate._document.data.value.mapValue.fields)
            var stringId = id.toString()
            let product_id = (await product_obj).getID()
            if (await product_id == stringId) {
                let name = (await product_obj).getName()
                let price = (await product_obj).setPrice()
                let category = (await product_obj).getCategory()
                let image = (await product_obj).getImage()
                let vendor = await (await product_obj).getVendor()

                console.log(name, price, category, image, vendor)

                let html = await getProductPage()

                html = html.replace("{{img1.5}}", image).replace("{{img2}}", image).replace("{{img3}}", image).replace("{{img4}}", image).replace("{{img5}}", image).replace("{{img1}}", image)
                    .replace("{{product-title}}", name)
                    .replace("{{ratings}}", "0")
                    .replace("{{sold}}", "0")
                    .replace("{{price}}", price)
                    .replace("{{shop-name}}", vendor)
                    .replace("{{category}}", category)

                
                await loadProductPage(html)
                document.getElementById("buy-now-btn").addEventListener("click", async () => {
                    let user = document.getElementById("userEmail").textContent
                    if (user.trim() == "bruh") {
                        alert("Please sign up/login")
                        return false
                    }
                    await replaceFunc(image, name, category, price, vendor)
                })
                catchCartEvent(name, price, category,image,   vendor)
            }

        })

    })


}



//just ignore the errors
let catchEvent = async () => {
    for (let i = 0; i < id_array.length; i++) {
        document.getElementById(id_array[i]).addEventListener("click", async () => {
            loadClickedProduct(i)
        })
    }
}

let renderCreditCards = async () => {
    for (let i = 0; i < creditCards.length; i++) {
        document.getElementById("card-list").innerHTML += `
                        <div class="card-name">
                            <input type="radio" name="credit-card" id="${creditCards[i].id}" class="credit-cards"
                                style="width: 15px; height: 15px">
                            <span class="card-title">${creditCards[i].name}</span>
                            <i class="${creditCards[i].class}"></i>
                        </div>
        `
    }
}

let loadCountriesList = (id) => {
    document.getElementById(id).innerHTML = `
        <option value="USA">USA (default)</option>

    `
    for (let i = 0; i < countriesList.length; i++) {
        document.getElementById(id).innerHTML += `
            <option value="${countriesList[i].name}">${countriesList[i].name}</option>
        `
    }
}

let loadAddressForm = () => {
    document.getElementById("form-address").innerHTML = ''
    document.getElementById("post-office-countries").innerHTML = ''
    document.getElementById("post-office-form").style.display = "none"

    var beginNum = 1;
    let countryValue = document.getElementById("countries").value
    console.log(countryValue)
    for (let i = 0; i < countryThatHasStates.length; i++) {
        if (countryValue == countryThatHasStates[i]) {
            beginNum = 0
        }
    }
    do {
        let val = address[beginNum]
        document.getElementById("form-address").innerHTML += `
                    <div class="form__group field">
                        <input type="input" class="form__field" placeholder="${val.name}" id="${val.name}" />
                        <label for="" class="form__label">${val.name}</label>
                    </div>
        `
        beginNum += 1
    } while (beginNum < address.length)


}

let loadPostOfficeForm = () => {
    document.getElementById("post-office-form").style.display = "block"

    document.getElementById("post-office-address").innerHTML = ''
    document.getElementById("countries").innerHTML = ''
    var beginNum = 1;
    let countryValue = document.getElementById("post-office-countries").value
    for (let i = 0; i < countryThatHasStates.length; i++) {
        if (countryValue == countryThatHasStates[i]) {
            beginNum = 0
        }
    }
    do {
        console.log(postOfficeAddress[0])
        let val = postOfficeAddress[beginNum]
        document.getElementById("post-office-address").innerHTML += `
                    <div class="form__group field">
                        <input type="input" class="form__field" placeholder="${val}" id="${val}" />
                        <label for="" class="form__label">${val}</label>
                    </div>
        `
        beginNum += 1
    } while (beginNum < postOfficeAddress.length)

}


/////search bar
let searching = async (value) => {
    document.getElementsByClassName("products-container")[0].innerHTML = ""
    let db = await getFireBase()
    let arr = 0;

    db.collection("Products").get().then(async (results) => {
        document.getElementsByClassName("products-container")[0].innerHTML = ""
        // console.log(results)
        results.forEach(async (doc, index) => {
            document.getElementsByClassName("products-container")[0].innerHTML = ""

            let field = doc._delegate._document.data.value.mapValue.fields
            let product = initProduct(field)

            let name = (await product).getName()
            let price = (await product).setPrice()
            let category = (await product).getCategory()
            let image = (await product).getImage()
            let vendor = await (await product).getVendor()

            if (name.toLowerCase().includes(value.toLowerCase())) {
                await renderNewCard(name, price, category, image, vendor, doc)
                arr += 1
            }

        })
    })
    
}

let searchingVendors = async (vendorsArray) => {
    for (let i = 0; i < vendorsArray.length; i++) {
        let db = await getFireBase()


        db.collection("Products").get().then(async (results) => {

            // console.log(results)
            results.forEach(async (doc, index) => {

                // console.log(doc.id)
                let field = doc._delegate._document.data.value.mapValue.fields
                let product = initProduct(field)

                let name = (await product).getName()
                let price = (await product).setPrice()
                let category = (await product).getCategory()
                let image = (await product).getImage()
                let vendor = await (await product).getVendor()

                if (vendor.toLowerCase() == vendorsArray[i].toLowerCase()) {
                    await renderNewCard(name, price, category, image, vendor, doc)
                }

            })
        })
    }
}

let searchingCategory = async (value) => {
    document.getElementsByClassName("products-container")[0].innerHTML = ""

    for (let i = 0; i < value.length; i++) {
        let db = await getFireBase()
        document.getElementsByClassName("products-container")[0].innerHTML = ""


        db.collection("Products").get().then(async (results) => {
            document.getElementsByClassName("products-container")[0].innerHTML = ""

            // console.log(results)
            results.forEach(async (doc, index) => {

                // console.log(doc.id)
                let field = doc._delegate._document.data.value.mapValue.fields
                let product = initProduct(field)

                let name = (await product).getName()
                let price = (await product).setPrice()
                let category = (await product).getCategory()
                let image = (await product).getImage()
                let vendor = await (await product).getVendor()

                if (category.toLowerCase() == value[i].toLowerCase()) {
                    await renderNewCard(name, price, category, image, vendor, doc)

                }

            })
        })
    }
}

let searchingPrice = async (price1, price2) => {
    let db = await getFireBase()

    db.collection("Products").get().then(async (results) => {

        // console.log(results)
        results.forEach(async (doc, index) => {

            // console.log(doc.id)
            let field = doc._delegate._document.data.value.mapValue.fields
            let product = initProduct(field)

            let name = (await product).getName()
            let price = (await product).setPrice()
            let category = (await product).getCategory()
            let image = (await product).getImage()
            let vendor = await (await product).getVendor()

            if (price >= price1 && price <= price2) {
                await renderNewCard(name, price, category, image, vendor, doc)
            }
            console.log(price)

        })
    })

}

let renderNewCard = async (name, price, category, image, vendor, doc) => {
    let card = await loadCard()
    let newCard = card.replace("{{image}}", image).replace("{{title}}", name).replace("{{category}}", category).replace("{{price}}", price).replace("{{vendor}}", vendor).replace("{{id}}", doc.id)
    let cards = document.getElementsByClassName("product-card")
    await renderCard(newCard)
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", async () => {
            let title = cards[i].getAttribute("id")
            console.log(title)
            document.getElementById(title).addEventListener("click", async () => {
                loadClickedProduct(id_array.indexOf(title))
            })
        })
    }
}

let getFireBase = async () => {
    document.getElementsByClassName("products-container")[0].innerHTML = ""
    var db = firebase.firestore();
    myFirebase()

    return db
}

export { renderCurrencies, renderWeightUnits, initProducts, loadClickedProduct, renderCreditCards, loadCountriesList, loadAddressForm, loadPostOfficeForm, searching, searchingVendors, searchingCategory, searchingPrice }