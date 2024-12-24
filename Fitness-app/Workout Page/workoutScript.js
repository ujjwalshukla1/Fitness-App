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

const url = "https://api.api-ninjas.com/v1/exercises?type";

const userData = JSON.parse(localStorage.getItem("userData"));

if (!userData || !userData.bmi) {
  console.error("User data or BMI not found");
}


fetch(url, {
  headers: {
    "X-Api-Key": "aN6AYotvTBt772G6Y3VDeQ==ArOM8ALOO0B7veT5",
  },
})
  .then((response) => response.json())
  .then((data) => {

    const workoutCards = document.getElementById("workout-cards");
    const personalWorkout = document.getElementById("personal-cards");
    const emptyMessage = document.getElementById("empty-message");
    const filteredExercises = filterData(data, userData.bmi);

    filteredExercises.forEach((exercise) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      const title = document.createElement("h2");
      title.textContent = exercise.name;
      cardDiv.appendChild(title);

      const difficulty = document.createElement("h3");
      difficulty.textContent = exercise.difficulty;
      cardDiv.appendChild(difficulty);

      const category = document.createElement("h3");
      category.textContent = exercise.type;
      cardDiv.appendChild(category);

      const description = document.createElement("p");
      description.textContent = exercise.instructions.slice(0, 100) + "...";
      cardDiv.appendChild(description);

      const button = document.createElement("button");
      button.textContent = "Learn more";
      button.addEventListener("click", function () {
        LocalStorage(exercise);
      });
      cardDiv.appendChild(button);

      const addButton = document.createElement("button");
      addButton.textContent = "Add Workout";
      addButton.addEventListener("click", function () {
        addWorkout(exercise);
      });
      cardDiv.appendChild(addButton);

      workoutCards.appendChild(cardDiv);
    });

    function filterData(exercises, bmi) {
      let difficultyLevel;
      if (bmi > 25 || bmi < 18.5) {
        difficultyLevel = "beginner";
      } else if (bmi >= 18.5 && bmi <= 25) {
        difficultyLevel = "intermediate";
      } else {
        difficultyLevel = "advanced";
      }

      return exercises.filter(
        (exercise) => exercise.difficulty === difficultyLevel
      );
    }

    function LocalStorage(exercise) {
      localStorage.setItem("exerciseData", JSON.stringify(exercise));
      window.location.href = "../WorkoutDescription Page/Curls.html";
    }

    function addWorkout(exercise) {
      const exercises = document.createElement("div");
      exercises.className = "card";

      const title = document.createElement("h2");
      title.textContent = exercise.name;
      exercises.appendChild(title);

      const difficulty = document.createElement("h3");
      difficulty.textContent = exercise.difficulty;
      exercises.appendChild(difficulty);

      const button = document.createElement("button");
      button.textContent = "Remove Workout";
      button.addEventListener("click", function () {
        removeWorkout(exercises);
      });
      exercises.appendChild(button);

      const learnButton = document.createElement("button");
      learnButton.textContent = "Learn More";
      learnButton.addEventListener("click", function () {
        LocalStorage(exercise);
      });
      exercises.appendChild(learnButton);

      personalWorkout.appendChild(exercises);

      emptyMessage.style.display = "none";
    }

    function empty() {
      if (personalWorkout.children.length === 0) {
        emptyMessage.style.display = "block";
      }
    }

    empty();

    function removeWorkout(exerciseElement) {
      personalWorkout.removeChild(exerciseElement);
    }
  })
  .catch((error) => {
    console.error(error);
  });
