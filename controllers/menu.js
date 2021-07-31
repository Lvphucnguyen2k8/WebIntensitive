import { initProducts } from "./db.js";
import { forgotPassword, resetPassword, signIn, signUp } from "./authen.js";
var shop_menu = document.createElement('div');
var shop_content = document.createElement('div');

let initHtml = function() {
  shop_menu.id = 'shop_menu';
  document.body.appendChild(shop_menu);

  shop_content.id = 'shop_content';
  document.body.appendChild(shop_content);

  getMenu()
  loadHome()
}

let getMenu = async function() {
  let response = await fetch("./views/menu.html");
  let result = await response.text()
  shop_menu.innerHTML = result;
  document.getElementById('btnHome').addEventListener('click', ()=>{ 
      console.log('pressed Home');
      loadHome()
  });

  document.getElementById('btnCategory').addEventListener('click', ()=>{ 
    console.log('pressed Category');
    loadCategory()
  });

  document.getElementById('btnSupport').addEventListener('click', ()=>{ 
    console.log('pressed Support');
    loadSupport()
  });

  document.getElementById('btnProfile').addEventListener('click', async ()=>{ 
    console.log('pressed Profile');
    await loadProfile()
  });

  document.getElementById('btnLogIn').addEventListener('click', async ()=>{ 
    console.log('pressed Log In');
     await loadLogIn()
      
  });

  document.getElementById('btnSignUp').addEventListener('click', async ()=>{
    console.log('pressed');
    await loadSignUp()
  });


}

let loadHome = async function() {
  let response = await fetch("./views/home.html");
  let result = await response.text()
  shop_content.innerHTML = result;
  initProducts()
}

let loadCategory = async function() {
  let response = await fetch("./views/category.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadSupport = async function() {
  let response = await fetch("./views/support.html");
  let result = await response.text()
  shop_content.innerHTML = result;
}

let loadProfile = async function() {
  if (firebase.auth().currentUser != null) {
    let email = document.getElementById('iEmail').value
    let password = document.getElementById('iPassword').value
    
    console.log('AAAAAAAAAAAAAAA')
    document.getElementById('profileEmail').innerHTML = email
    document.getElementById('profilePassword').innerHTML = password
  }
  else {
    alert("You didn't sign in yet")
  }
  let response = await fetch("./views/profile.html");
  let result = await response.text()
  shop_content.innerHTML = result;

  document.getElementById("btnResetPassword").addEventListener('click', async ()=>{
    await loadResetPassword();
  })
}

let loadLogIn = async function() {
  // if(firebase.auth().currentUser != null) 
  //kiem tra xem ng dung dag dang nhap chua; null tuc la chua dang nhap
  let response = await fetch("./views/login.html")
  let result = await response.text()
  shop_content.innerHTML = result

  document.getElementById('btnForgotPasswordReset').addEventListener('click', async ()=>{
    console.log('pressed')
    forgotPassword()
  });

  document.getElementById('btnForgotPasswordReset').addEventListener('click', async ()=>{
    await loadForgotPassword()
  });

  document.getElementById('btnLogInAuth').addEventListener('click', async ()=>{
    console.log('pressed')
    signIn()
  });
}

let loadSignUp = async function() {
  let response = await fetch("./views/signup.html");
  let result = await response.text()
  shop_content.innerHTML = result;

  document.getElementById('btnSignup').addEventListener('click', async ()=>{
    console.log('pressed');
    signUp();
  });
}

let loadForgotPassword = async function() {
  let response = await fetch("./views/forgotpassword.html");
  let result = await response.text()
  shop_content.innerHTML = result;

  document.getElementById('btnForgotPassword').addEventListener('click', async ()=>{
    console.log('pressed');
    forgotPassword()
  });
}

let loadResetPassword = async function() {
  let response = await fetch("./views/resetpassword.html");
  let result = await response.text()
  shop_content.innerHTML = result;

  document.getElementById('btnResetPassword').addEventListener('click', async ()=>{
    console.log('pressed');
    resetPassword()
  });
}

let loadCard = async function() {
  let response = await fetch("./views/card.html");
  return response.text()
}

let renderCard = function(card) {
   document.getElementById("lstCard").innerHTML += card
}

export {initHtml, getMenu, loadCard, renderCard};