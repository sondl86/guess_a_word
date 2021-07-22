
//view winning fetchAPI TheMealDB

//views
const viewGame = document.querySelector("#viewGame");
viewGame.style.display = "none";

const viewPrize = document.querySelector("#viewPrize");
viewPrize.style.display = "block";


const buildRequestUrl = () => {
    return "https://themealdb.com/api/json/v1/1/random.php";
}

const requestRecipe = async (url) => {
    const response = await fetch(url);
    const jsonResponse = await response.json();
    
    console.log(jsonResponse);
    //const recipe = jsonResponse.meals;
    const randomRecipe = jsonResponse.meals;

    displayRecipe(randomRecipe);
}

// show recipe dynamically
const displayRecipe = (randomRecipe) => {
    const recipeTitle1 = document.getElementById("recipe__title1");
    const recipeContainer = document.getElementById("recipe");
   
    
    // Ausgabe mit forEach
    randomRecipe.forEach(recipe => {
        // show title
        const divTitle = document.createElement("div");
        divTitle.setAttribute("id", "recipe__title");
        divTitle.setAttribute("class", "recipe__content");
        divTitle.innerHTML = "<h2>" + recipe.strMeal +"</h2>";

        // show ingredients
        const divIngredients = document.createElement("div");
        divIngredients.setAttribute("id", "recipe__ingredients");
        divIngredients.setAttribute("class", "recipe__content");
  
        let ingredients = [];
        let measurements = [];
        for (const property in recipe){
            if(`${recipe[property]}`){
                for(let i=1; i<=20; i++){
                    if(property === "strMeasure"+i){
                        measurements.push(`${recipe[property]}`);
                    }
                    if(property === "strIngredient"+i){
                        ingredients.push(`${recipe[property]}`); 
                    }
                }   
            }
        }
        
        // remove null, undefined, whitespace and empty string
        var filteredM = measurements.filter(function (obj) { 
            return ![null, undefined, "", " "].includes(obj) 
        });

        var filteredI = ingredients.filter(function (obj) { 
            return ![null, undefined, "", " "].includes(obj) 
        });
   
        // create and show ingredient list
        let ul = document.createElement('ul');
        ul.setAttribute('id', 'listIngredients');
        ul.innerHTML = "<h2>Ingredients</h2><br>";

        let li;
        for(let i = 0; i< filteredM.length; i++){
            li = document.createElement('li'); 
            for(let j = 0; j< filteredI.length; j++){
                    if(filteredM[i] === null || filteredM[i] === undefined || filteredM[i] === " " || filteredM[i] === "" 
                        || filteredI[i] === null || filteredI[i] === undefined || filteredI[i] === " " || filteredI[i] === "") {
                        continue;
                    }else{
                        li.innerHTML = filteredM[i] + " " + filteredI[i]; 
                        ul.appendChild(li); 
                    }   
            }
        }
        divIngredients.appendChild(ul);
        
        // show instructions
        const divInstructions = document.createElement("div");
        divInstructions.setAttribute("id", "recipe__instructions");
        divInstructions.setAttribute("class", "recipe__content");
        divInstructions.innerHTML = "<h2>Instructions</h2><br>" + recipe.strInstructions;

        //show image
        const divImage = document.createElement("div");
        divImage.setAttribute("id", "recipe__image");
        divImage.setAttribute("class", "recipe__content");

        const myImage = new Image(250,200);
        let strUrlImage = recipe.strMealThumb;
        myImage.src = strUrlImage;
        divImage.appendChild(myImage);

        recipeTitle1.appendChild(divTitle);
        recipeContainer.appendChild(divIngredients);
        recipeContainer.appendChild(divImage);
        recipeContainer.appendChild(divInstructions);
        
    });
}

const processRecipeRequest = async () => {
    const requestUrl = buildRequestUrl();
    await requestRecipe(requestUrl);
    console.log("finished");
}

processRecipeRequest();





/*const getRandomMeal = async () => {
    const response = await fetch("https://themealdb.com/api/json/v1/1/random.php", {
        method: "GET",
        
        headers:{
            Accept: "application/json"
        },
       
        
    });

    const jsonRecipeData = await response.json();
    console.log(jsonRecipeData);
}  
getRandomMeal();
*/