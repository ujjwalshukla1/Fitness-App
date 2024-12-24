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

const exerciseData = JSON.parse(localStorage.getItem("exerciseData"));

if (exerciseData) {
  const cardDiv = document.getElementById("card");
  const curl = document.createElement("div");
  curl.className = "curl-div";
  
  const name = document.createElement("h2");
  name.textContent = `${exerciseData.name}`
  curl.appendChild(name);

  const difficulty = document.createElement("h3");
  difficulty.textContent = `Difficulty: ${exerciseData.difficulty}`
  curl.appendChild(difficulty);

  const instructions = document.createElement("p");
  instructions.textContent = `${exerciseData.instructions}`
  curl.appendChild(instructions);

  const Button = document.createElement("button");
  Button.className = "btn";
  Button.textContent = "Go back";
  Button.addEventListener('click', function(){
    window.location.href = "../Workout Page/workout.html";
  })
  curl.appendChild(Button);

  cardDiv.appendChild(curl);
} else {
  document.getElementById("card").innerHTML = "<p>No data available.</p>";
}
