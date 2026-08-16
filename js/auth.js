const Email = document.querySelector(".login-page__email-input");
const Password = document.querySelector(".login-page__password-input");

const Login = document.querySelector(".login-page__btn");

Login.addEventListener("click",(e)=>{

    if(Email.value == "admin@example.com" && Password.value == "Admin@123" ){
        window.location.href="index.html";
        localStorage.setItem("isLoggedIn", "true");
    }else{
        alert("Incorrect Credentials")
    }
})