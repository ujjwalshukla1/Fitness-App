document.addEventListener('DOMContentLoaded', function () {
    const signUpForm = document.getElementById('sign-up-form');

    signUpForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const height = parseFloat(document.getElementById('signup-height').value);
        const weight = parseFloat(document.getElementById('signup-weight').value);

        if (username && email && password && height && weight) {
        
            const heightInMeters = height / 100; 
            const bmi = weight / (heightInMeters * heightInMeters);

            const userData = { username, email, password, height, weight, bmi };
            localStorage.setItem('userData', JSON.stringify(userData));

            alert('Sign Up Successful');
            window.location.href = '../Profile Page/profile.html'; 
        } else {
            alert('Please fill in all fields');
        }
    });
});
 
