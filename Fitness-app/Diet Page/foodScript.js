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

const url = "https://www.themealdb.com/api/json/v1/1/categories.php";

const userData = JSON.parse(localStorage.getItem("userData"));

if (!userData || !userData.bmi) {
  console.error("User data or BMI not found");
}


fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const mealCategories = document.getElementById("meal-categories");
    const personalDiet = document.getElementById("personal-diet");
    const emptyMessage = document.getElementById("empty-message");

    const filterCategories = filterBmi(data.categories, userData.bmi);

    filterCategories.forEach((category) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";

      const title = document.createElement("h2");
      title.textContent = category.strCategory;
      cardDiv.appendChild(title);

      const image = document.createElement("img");
      image.src = category.strCategoryThumb;
      image.alt = category.strCategory;
      image.style.width = "100%";
      cardDiv.appendChild(image);

      const description = document.createElement("p");
      description.textContent =
        category.strCategoryDescription.slice(0, 100) + "...";
      cardDiv.appendChild(description);

      const button = document.createElement("button");
      button.textContent = "Add to diet";
      button.className = "Btn";
      button.addEventListener("click", function () {
        addToDiet(category);
      });
      cardDiv.appendChild(button);

      mealCategories.appendChild(cardDiv);
    });

    function filterBmi(categories, bmi) {
      let allowedCategories = [];
      if (bmi > 25) {
        allowedCategories = categories.filter((category) =>
          ["9", "10", "11", "12", "13"].includes(category.idCategory)
        );
      } else if (bmi >= 18.5 && bmi <= 25) {
        allowedCategories = categories.filter((category) =>
          ["5", "6", "7", "8", "14"].includes(category.idCategory)
        );
      } else if (bmi < 18.5) {
        allowedCategories = categories.filter((category) =>
          ["1", "2", "3", "4"].includes(category.idCategory)
        );
      }
      return allowedCategories;
    }

    function addToDiet(category) {
      const item = document.createElement("div");
      item.className = "personal-item";

      const itemTitle = document.createElement("h3");
      itemTitle.textContent = category.strCategory;
      item.appendChild(itemTitle);

      const itemImage = document.createElement("img");
      itemImage.src = category.strCategoryThumb;
      itemImage.alt = category.strCategory;
      itemImage.style.width = "100%";
      item.appendChild(itemImage);

      const itemDescription = document.createElement("p");
      itemDescription.textContent =
        category.strCategoryDescription.slice(0, 100) + "...";
      item.appendChild(itemDescription);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove from diet";
      removeButton.addEventListener("click", function () {
        removeDiet(item);
      });
      item.appendChild(removeButton);

      personalDiet.appendChild(item);

      emptyMessage.style.display = "none";
    }

    function empty() {
      if (personalDiet.children.length === 0) {
        emptyMessage.style.display = "block";
      }
    }

    empty();

    function removeDiet(item) {
      personalDiet.removeChild(item);
    }
  })
  .catch((error) => {
    console.error("Error fetching meal categories:", error);
  });
