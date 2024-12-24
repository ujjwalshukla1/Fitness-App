    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    const data = JSON.parse(localStorage.getItem('userData'));
    const signup = document.getElementById('btn');
    const login = document.getElementById('btn2');
    const profile = document.getElementById('btn3');

    

    if(data){
        signup.hidden= true;
        login.hidden= true;
        profile.hidden= false;
    }else{
        signup.hidden= false;
        login.hidden= false;
        profile.hidden= true;
    }


    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const slideCount = slides.length;
    let currentIndex = 0;
    const intervalTime = 3000; 
    let autoPlayInterval;

    function goToSlide(index) {
        const newIndex = (index + slideCount) % slideCount;
        const offset = -newIndex * 100;
        document.querySelector('.carousel-wrapper').style.transform = `translateX(${offset}%)`;
        currentIndex = newIndex;
    }

    function showNextSlide() {
        goToSlide(currentIndex + 1);
    }

    function showPrevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        autoPlayInterval = setInterval(showNextSlide, intervalTime);
    }

    function stopAutoplay() {
        clearInterval(autoPlayInterval);
    }

    prevButton.addEventListener('click', function() {
        stopAutoplay();
        showPrevSlide();
        startAutoplay();
    });

    nextButton.addEventListener('click', function() {
        stopAutoplay();
        showNextSlide();
        startAutoplay();
    });

    startAutoplay();


document.getElementById('subscribe-form').addEventListener('submit', function(event){
    event.preventDefault();

    const email = document.getElementById('email')
    const subscribe = document.getElementById('subscribe-message')

    if(email.value){
        subscribe.textContent = "Thank you for subscribing";
        subscribe.style.color = "green";
        email.value = "";
    }else{
        subscribe.textContent = "Enter the valid E-mail";
        subscribe.style.color = "Red";
    }
});


