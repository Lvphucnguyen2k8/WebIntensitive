import { catchProfileEvent, loadProfile } from "./menu.js"

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
            alert("Success")
            showUser()
            document.getElementById("userEmail").textContent = userCredential.user.bc.email
            catchProfileEvent(userCredential)
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
        .then((userCredential) => {
            alert("Success");
            console.log(firebase.auth().currentUser);
            showUser()
            document.getElementById("userEmail").textContent = userCredential.user.bc.email
            catchProfileEvent(userCredential)
            
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
        })
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
        .then((success) => {
            alert("Success")
        })
        .catch((error) => {
            alert(error.message)
        })
}

export { signUp, signIn, resetPassword }