var signUp = document.querySelector("#signup");
var signIn = document.querySelector("#signin");
var signUpName = document.querySelector("#SUName");
var signUpemail = document.querySelector("#SUEmail");
var signUpPass = document.querySelector("#SUPassword");
var signUpClick = document.querySelector("#signUpClick");
var loginClick = document.querySelector("#loginClick");
var loginEmail = document.querySelector("#loginEmail");
var loginPass = document.querySelector("#loginPassword");

var users = [];
if (localStorage.getItem("users") != null){
    users = JSON.parse(localStorage.getItem("users"));
}else{
    users = [];
}

signUp.addEventListener("click",function(){
    changePages();
    clearRedComment();
    clearGreenComment();
})
signIn.addEventListener("click",function(){
    changePages();
})

function changePages(){
    document.querySelector(".login-page").classList.toggle("d-none");
    document.querySelector(".signup-page").classList.toggle("d-none");
}
function openMain(){
    document.querySelector(".login-page").classList.add("d-none");
    document.querySelector(".signup-page").classList.add("d-none");
    document.querySelector(".home-page").classList.remove("d-none");

}
function isEmptyInput(){
    if(signUpName.value=="" || signUpemail.value == "" || signUpPass.value == ""){
        return true;
    }
}
function isExist(){
    for ( var i = 0 ; i < users.length ; i++){
        if (signUpemail.value.toLowerCase() == users[i].userEmail.toLowerCase()){
            return true;
        }
    }
}
function addNewUser(){
    var user = {
        userName : signUpName.value,
        userEmail : signUpemail.value,
        userPass : signUpPass.value,
    }
    
    if(isEmptyInput() == true){
        document.querySelector("#wrongSignup").innerHTML = "Wrong Input";
        clearGreenComment()
    }else if( isExist() == true){
        document.querySelector("#wrongSignup").innerHTML = "Email Exists";
        clearGreenComment()
    }
    else{
        clearRedComment();
        users.push(user);
        document.querySelector("#correctSignup").innerHTML = "Correct";
    }
    clearForm();
    localStorage.setItem("users",JSON.stringify(users));
}
function clearRedComment(){
    document.querySelector("#wrongSignup").innerHTML = "";
}
function clearGreenComment(){
    document.querySelector("#correctSignup").innerHTML = "";
}
function clearWrongComment(){
    document.querySelector("#wrongLogin").innerHTML = "";
}
signUpClick.addEventListener("click", function(){
    addNewUser();
})
function clearForm(){
    signUpName.value = "";
    signUpemail.value = "";
    signUpPass.value = "";
    loginEmail.value = "";
    loginPass.value = "";
}
function goToMainPage(){
    for ( var i = 0 ; i < users.length ; i++){
        if (loginEmail.value == users[i].userEmail && loginPass.value == users[i].userPass){
            document.querySelector("#welcome-mess").innerHTML = `Welcome ${users[i].userName}`;
            openMain();
        }else{
            document.querySelector("#wrongLogin").innerHTML = "incorrect email or password"
        }
        
    }
}
loginClick.addEventListener("click", function(){
    
    goToMainPage();
})
function logout(){
    document.querySelector(".home-page").classList.add("d-none");
    document.querySelector(".login-page").classList.remove("d-none");
    clearWrongComment();
}
document.querySelector("#logout").addEventListener("click", function(){
    clearForm();
    logout();
    
})