import { catchProfileEvent, loadProfile, getAlertBox, loadAlertBox } from "./menu.js"

let installFirebase = () => {
    var firebaseConfig2 = {
        apiKey: "AIzaSyCLggN7iKUtKda3I0gJk2ymFJf7SuQXmK4",
        authDomain: "shop-533cf.firebaseapp.com",
        projectId: "shop-533cf",
        storageBucket: "shop-533cf.appspot.com",
        messagingSenderId: "289856439213",
        appId: "1:289856439213:web:e7f182a128bc1ff4ca5724",
        measurementId: "G-SK14Z3TFKD"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig2);
        firebase.analytics();
    }


}

let signUp = function () {
    installFirebase()
    let email = document.getElementById("signUpEmail").value
    let password = document.getElementById("loginPassword").value

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            //var user = userCredential.user;
            // ...
            showUser()
            document.getElementById("userEmail").textContent = userCredential.user.bc.email
            catchProfileEvent(userCredential)
            var db = firebase.firestore();
            db.collection("Users").add({
                email: userCredential.user.bc.email,
                Registration_Date: new Date(),
                images: [],
                permission: "user"

            }).then(async (document) => {
                let box = await getAlertBox();
                box = box.replace("{{message}}", "You have registered successfully")
                loadAlertBox(box)

            }).catch((error) => {
                console.log(error.message)
            })
        })
        .catch((error) => {
            //var errorCode = error.code;
            //var errorMessage = error.message;
            // ..
            alert(error.message)
        })
    
}

let signIn = function () {
    installFirebase()
    let email = document.getElementById('loginEmail').value
    let password = document.getElementById('loginPassword').value

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            showUser()
            document.getElementById("userEmail").textContent = userCredential.user.bc.email
            catchProfileEvent(userCredential)
            let box = await getAlertBox();
            box = box.replace("{{message}}", "You have login successfully")
            loadAlertBox(box)
            
        })
        .catch((error) => {
            alert(error.message)
            console.log(firebase.auth().currentUser);
            return false;
        })
}

let resetPassword = function () {
    installFirebase()
    let email = document.getElementById('email-to-reset').value

    firebase.auth().sendPasswordResetEmail(email)
        .then((success) => {
            alert("Success")
       document.getElementById("log-out-btn").addEventListener('click', async () => {
        catchLogOutEvent()
    })     })
        .catch((error) => {
            alert(error.message)
        })

}

let showUser = async () => {
    installFirebase()

    document.getElementById("sign-up-btn").style.display = "none"
    document.getElementById("login-btn").style.display = "none"
    let user = document.getElementById("userEmail").style.display = "block"
}


let logOut = function () {
    installFirebase()

    firebase.auth().signOut()
        .then(async (success) => {
            document.getElementById("login-btn").style.display = "block"
            document.getElementById("sign-up-btn").style.display = "block"
            document.getElementById("userEmail").style.display = "none"

            let box = await getAlertBox();
            box = box.replace("{{message}}", "You have logged out successfully")
            loadAlertBox(box)
        })
        .catch((error) => {
            alert(error.message)
        })
}

export { signUp, signIn, resetPassword, logOut }