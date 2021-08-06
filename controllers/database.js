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
        acronym : "stone"
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
export { renderCurrencies, renderWeightUnits }