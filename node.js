const firebaseConfig = {
  apiKey: "AIzaSyAazLSrBxTyHTkij1gEEuAoJ1xZEv3Lgu4",
  authDomain: "camplain-app.firebaseapp.com",
  databaseURL: "https://camplain-app-default-rtdb.firebaseio.com",
  projectId: "camplain-app",
  storageBucket: "camplain-app.appspot.com",
  messagingSenderId: "510244691855",
  appId: "1:510244691855:web:7c39ccf3f27d8c5edcf5fa",
  measurementId: "G-G357E100KJ",
};
let login = document.getElementById("display").style;
let register = document.getElementById("display1").style;
let btn = document.getElementById("log_btn").addEventListener("click",hideSignup );
let sign_btn = document.getElementById("sign_btn").addEventListener("click",hideLogin);
// function display0() {
//   login.display = "";
//   // register.display= "";
// }
function hideSignup(){
  register.display = "none";
  login.display = "";

}
function hideLogin(){
  login.display = "none";
  register.display = "";  

}
document.getElementById("register").addEventListener("click", display);
document.getElementById("login").addEventListener("click", display1);
function display() {
  login.display = "none";
  register.display = "";
}
function display1() {
  register.display = "none";
  login.display = "";
}
const fb = firebase.initializeApp(firebaseConfig);
function signUp() {
  let em = document.getElementById("email").value;
  let ps = document.getElementById("pass").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(em, ps)
    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
  document.getElementById("email").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("userName").value = "";
}
function signIn() {
  let em = document.getElementById("email1").value;
  let ps = document.getElementById("pass1").value;
  console.log("Ahmed")
if(em==="assistantadmin@gmail.com"&&ps==="assistantadmin"){
  window.location.href="AAdminPanel.html";
}
else if(em==="admin@gmail.com"&&ps==="admin12345"){
  window.location.href="adminPanel.html";
}
else{
  firebase
    .auth()
    .signInWithEmailAndPassword(em, ps)
    .then(async(userCredential) => {
      // Signed in
      const user = userCredential.user;
     await storeEmail(user.email)
     .then(() =>{
       window.location.href = "userPanel.html";
     })
     .catch((error) =>{
      console.error("Error storing email",error)
     })
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
}
function storeEmail(email) {
  // alert("A");
  const userRef = firebase.database().ref("userEmail");
  const userKey = firebase.auth().currentUser.uid;
  return userRef.child(userKey).set({
    email: email,
  });
}

