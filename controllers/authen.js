let signUp = function () {
    let email = document.getElementById("iEmail").value
    let password = document.getElementById("iPassword").value

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in 
        //var user = userCredential.user;
        // ...
        alert("Success")
        })
        
        .catch((error) => {
        //var errorCode = error.code;
        //var errorMessage = error.message;
        // ..
        alert(error.message)
      });
}

let signIn = function () {
     let email = document.getElementById('iEmail').value
     let password = document.getElementById('iPassword').value

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
        alert("Success");
        console.log(firebase.auth().currentUser);

    })
    .catch((error) => {
        alert(error.message)
        console.log(firebase.auth().currentUser);
    });
}

let forgotPassword = function () {
     let email = document.getElementById('inputEmailForgotten').value
    
    firebase.auth().sendPasswordResetEmail(email)
    .then((success) => {
        console.log("Success")
    })
    .catch((error) => {
        console.log(error.message)
    })

}

let resetPassword = function () {
    let email = document.getElementById('resetEmail').value
   
   firebase.auth().sendPasswordResetEmail(email)
   .then((success) => {
       console.log("Success")
   })
   .catch((error) => {
       console.log(error.message)
   })

}

export { signUp, signIn, forgotPassword, resetPassword }