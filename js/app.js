const API_URL = "http://127.0.0.1:8000/recipes";

const form = document.getElementById("recipe-form");
const searchInput = document.getElementById("search");

let editingRecipeId = null;

document.addEventListener("DOMContentLoaded", () => {
  form.reset();
  editingRecipeId = null;
  form.querySelector("button").textContent = "Add Recipe";
});

let allRecipes = [];

form.addEventListener("submit", createRecipe);
searchInput.addEventListener("input", searchRecipes);

async function getRecipes() {
  try {
    const response = await axios.get(API_URL);

    allRecipes = response.data;

    displayRecipes(allRecipes);
  } catch (error) {
    console.error(error);
  }
}

function displayRecipes(recipes) {
  const container = document.getElementById("recipes-container");

  container.innerHTML = "";

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const image = document.createElement("img");
    image.classList.add("recipe-image");

    image.src = "assets/images/default.jpg";

    const name = recipe.name.toLowerCase();

    image.src = "assets/default.jpg";

    if (name === "vanilla protein latte") {
      image.src = "assets/Vanilla-Protein-Latte.jpg";
    } else if (name === "mocha protein latte") {
      image.src = "assets/Mocha-Protein-Latte.jpg";
      image.classList.add("mocha-image");
    } else if (name === "caramel protein frappe") {
      image.src = "assets/caramel-protein-frappe.jpg";
    } else if (name === "honey cinnamon cold brew") {
      image.src = "assets/Honey-Cinnamon-Cold-Brew.jpg";
    }

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const category = document.createElement("p");
    category.textContent = `Category: ${recipe.category}`;

    const calories = document.createElement("p");
    calories.textContent = `Calories: ${recipe.calories} kcal`;

    const protein = document.createElement("p");
    protein.textContent = `Protein: ${recipe.protein} g`;

    const preparation = document.createElement("p");
    preparation.textContent = `Preparation: ${recipe.preparation_time} min`;

    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients";

    const ingredients = document.createElement("p");
    ingredients.textContent = recipe.ingredients;

    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instructions";

    const instructions = document.createElement("p");
    instructions.textContent = recipe.instructions;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      loadRecipeForEditing(recipe);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Are you sure you want to delete this recipe?");

      if (confirmed) {
        deleteRecipe(recipe.id);
      }
    });

    const actions = document.createElement("div");
    actions.classList.add("recipe-actions");

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(category);
    card.appendChild(calories);
    card.appendChild(protein);
    card.appendChild(preparation);
    card.appendChild(ingredientsTitle);
    card.appendChild(ingredients);
    card.appendChild(instructionsTitle);
    card.appendChild(instructions);
    card.appendChild(actions);

    container.appendChild(card);
  });
}

async function createRecipe(event) {
  event.preventDefault();

  const recipe = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    calories: Number(document.getElementById("calories").value),
    protein: Number(document.getElementById("protein").value),
    preparation_time: Number(document.getElementById("prep-time").value),
    ingredients: document.getElementById("ingredients").value,
    instructions: document.getElementById("instructions").value,
  };

  if (
    recipe.name.trim() === "" ||
    recipe.ingredients.trim() === "" ||
    recipe.instructions.trim() === ""
  ) {
    alert("Please complete all required fields.");
    return;
  }

  try {
    if (editingRecipeId === null) {
      await axios.post(API_URL, recipe);
    } else {
      await axios.put(`${API_URL}/${editingRecipeId}`, recipe);

      editingRecipeId = null;

      form.querySelector("button").textContent = "Add Recipe";
    }

    form.reset();

    await getRecipes();

    document.getElementById("recipes-container").scrollIntoView({
      behavior: "smooth",
    });
  } catch (error) {
    console.error(error);
  }
}

async function deleteRecipe(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);

    getRecipes();
  } catch (error) {
    console.error(error);
  }
}

function loadRecipeForEditing(recipe) {
  editingRecipeId = recipe.id;

  document.getElementById("name").value = recipe.name;
  document.getElementById("category").value = recipe.category;
  document.getElementById("calories").value = recipe.calories;
  document.getElementById("protein").value = recipe.protein;
  document.getElementById("prep-time").value = recipe.preparation_time;
  document.getElementById("ingredients").value = recipe.ingredients;
  document.getElementById("instructions").value = recipe.instructions;

  form.querySelector("button").textContent = "Update Recipe";

  form.scrollIntoView({
    behavior: "smooth",
  });
}

function searchRecipes() {
  const searchText = searchInput.value.toLowerCase();

  const filteredRecipes = allRecipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchText) ||
      recipe.category.toLowerCase().includes(searchText),
  );

  displayRecipes(filteredRecipes);
}

getRecipes();
