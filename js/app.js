const searchInput = document.getElementById("search");

searchInput.addEventListener("input", searchRecipes);

const API_URL = "http://127.0.0.1:8000/recipes";

const form = document.getElementById("recipe-form");

let editingRecipeId = null;

let allRecipes = [];

form.addEventListener("submit", createRecipe);


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

    recipes.forEach(recipe => {

        const card = document.createElement("div");
        card.classList.add("recipe-card");

        const title = document.createElement("h2");
        title.textContent = recipe.name;

        const category = document.createElement("p");
        category.textContent = `Category: ${recipe.category}`;

        const calories = document.createElement("p");
        calories.textContent = `Calories: ${recipe.calories}`;

        const protein = document.createElement("p");
        protein.textContent = `Protein: ${recipe.protein} g`;

        const preparation = document.createElement("p");
        preparation.textContent = `Preparation: ${recipe.preparation_time} min`;

        const ingredients = document.createElement("p");
        ingredients.textContent = recipe.ingredients;

        const instructions = document.createElement("p");
        instructions.textContent = recipe.instructions;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
        deleteRecipe(recipe.id);
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", () => {
        loadRecipeForEditing(recipe);
        });

        card.appendChild(title);
        card.appendChild(category);
        card.appendChild(calories);
        card.appendChild(protein);
        card.appendChild(preparation);
        card.appendChild(ingredients);
        card.appendChild(instructions);
        card.appendChild(editButton);

        card.appendChild(deleteButton);

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
        instructions: document.getElementById("instructions").value

    };

   try {

    if (editingRecipeId === null) {

        await axios.post(API_URL, recipe);

    } else {

        await axios.put(`${API_URL}/${editingRecipeId}`, recipe);

        editingRecipeId = null;

        form.querySelector("button").textContent = "Add Recipe";

    }

    form.reset();

    getRecipes();

} catch (error) {

    console.error(error);

  }
}

getRecipes();

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

}

function searchRecipes() {

    const searchText = searchInput.value.toLowerCase();

    console.log("Search:", searchText);
    console.log(allRecipes);

    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchText)
    );

    console.log(filteredRecipes);

    displayRecipes(filteredRecipes);

    console.log(document.getElementById("recipes-container").children.length)

}