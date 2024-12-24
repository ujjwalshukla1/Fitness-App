document.addEventListener('DOMContentLoaded', function () {

    const data = JSON.parse(localStorage.getItem("userData"));

    
        const userEmail = data.email;
        const userPassword = data.password;


        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        const loginForm = document.getElementById('login-form');
       
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); 
            const enteredEmail = email.value;
            const enteredPassword = password.value;

            if (enteredEmail === userEmail && enteredPassword === userPassword) {
                window.location.href = "../index.html";
            } else {
                console.log("Wrong credentials");
                alert("Invalid email or password. Please try again.");
            }

            
        });
});

