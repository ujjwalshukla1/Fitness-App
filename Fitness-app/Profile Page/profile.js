const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

const data = JSON.parse(localStorage.getItem("userData"));
const signup = document.getElementById("btn");
const login = document.getElementById("btn2");
const profile = document.getElementById("btn3");

if (data) {
  signup.hidden = true;
  login.hidden = true;
  profile.hidden = false;
} else {
  signup.hidden = false;
  login.hidden = false;
  profile.hidden = true;
}

function getRandomStat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

const profileInfo = document.getElementById("profile-info");

const userData = JSON.parse(localStorage.getItem("userData"));


if (userData) {
  const card = document.createElement("div");
  card.className = "card";

  const userName = document.createElement("p");
  userName.textContent = `User Name: ${userData.username}`;
  card.appendChild(userName);

  const email = document.createElement("p");
  email.textContent = `User Email: ${userData.email}`;
  card.appendChild(email);

  const height = document.createElement("p");
  height.textContent = `Height: ${userData.height}cm`;
  card.appendChild(height);

  const weight = document.createElement("p");
  weight.textContent = `Weight: ${userData.weight}kg`;
  card.appendChild(weight);

  const bmi = document.createElement("p");
  bmi.textContent = `BMI: ${userData.bmi.toFixed(2)}`;
  card.appendChild(bmi);

  const stats = document.createElement("h2");
  stats.textContent = "Performance Statistics";
  card.appendChild(stats);

  const calories = document.createElement("p");
  calories.textContent = `Calories Burned: ${getRandomStat(200, 500)}`;
  card.appendChild(calories);

  const intake = document.createElement("p");
  intake.textContent = `Calorie Intake: ${getRandomStat(1000, 1500)}`;
  card.appendChild(intake);

  const steps = document.createElement("p");
  steps.textContent = `Steps Walked: ${getRandomStat(1000, 7000)}`;
  card.appendChild(steps);

  const water = document.createElement("p");
  water.textContent = `Water Intake: ${getRandomStat(2, 5)}L`;
  card.appendChild(water);

  const workout = document.createElement("p");
  workout.textContent = `Workout Attended: ${getRandomStat(1, 10)}`;
  card.appendChild(workout);

  profileInfo.appendChild(card);
} else {
  profileInfo.innerHTML =
    '<p>No user data available. Please <a href="../Signup Page/signup.html">sign up</a>.</p>';
}

document.getElementById("connect").addEventListener("click", function() {
  window.location.href = "WIP.html"
})

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("userData");
  window.location.href = "../Signup Page/signup.html";
});
