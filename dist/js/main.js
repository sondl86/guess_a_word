//views...
const viewGame = document.querySelector("#viewGame");
const viewPrize = document.querySelector("#viewPrize");

const form = document.querySelector("#form");
const inputLetter = document.querySelector("#input__text");

const placeholder = document.querySelector("#wordPlaceholder");
const drawing = document.querySelector(".hangman__draw");
const usedArray = document.querySelector("#letters__used");
const remainAttempts = document.querySelector("#attempts");
const error = document.querySelector("#error");
const easy = document.querySelector("#easy");
const middle = document.querySelector("#middle");
const difficult = document.querySelector("#difficult");

//hide an element
const hide = (element) => {
    element.style.display = 'none';
}

//show an element
const show = (element) => {
    element.style.display = 'block';
}

// toggle the element visibility
const toggle = (element) => {
    // if the element is visible, hide it
    if(window.getComputedStyle(element).display !== 'none') {
        hide(element);
        return;
    }

    // show the element
    show(element);
}
hide(document.querySelector('#start'));
hide(document.querySelector('#question__bear'));
hide(viewPrize);
/*
const prepareGame = () =>{
    hide(placeholder);
    hide(viewPrize);
    hide(document.querySelector('table'));
    hide(document.querySelector('form'));
    hide(drawing);
    hide(error);
    const question = document.getElementById("question");
    for(let i=20; i > 0.1; i= i/2){
        let qu = document.createElement("i");
        qu.setAttribute("class", "fas");
        qu.classList.add("fa-question");
        qu.style.fontSize = i + "rem";
        question.appendChild(qu);
    }
}
*/

const initGame = () => {
    let startGame = true;
    while(startGame){
        //AJAX request for the php variable word from get_data.php
        const xhrObj = new XMLHttpRequest();
        xhrObj.onreadystatechange = function() {
            if(xhrObj.readyState === 4 && xhrObj.status === 200) {
                console.log(this.responseText); 
                
                const word = cleanDBWord(this.responseText);
                const wordArray = preparePlaceholder(word, placeholder);
                console.log(wordArray);

                //showSolution(word);

                let startInput = true;
                let round = 0;
                let noMatch = 0;
                let isOk = false;
                let usedLetters = [];
                let attempts = 10;
                remainAttempts.innerText = attempts;
                // game loop
                while(startInput){
                    form.addEventListener('submit', e => {
                        e.preventDefault();
                        error.innerText = "";
                            // turn input to lower case 
                            let letterValue = inputLetter.value.toLowerCase().trim();

                            isOk = checkInputs(letterValue, usedLetters);
                            if(isOk){
                                round += 1;
                            }

                            const letterExist = isLetterInWord(letterValue, word);

                            //if input is correct and letter exists in the word 
                            if(isOk && letterExist){
                                const foundIndexes = checkWord(letterExist, letterValue, word);
                            
                                const replacedLine = replaceLineWithLetter(foundIndexes, wordArray, word);
            
                                showLetterinWord(replacedLine, placeholder)
                                updateUsedOnes(letterValue, usedLetters, usedArray);
                                
                            }
                            else if(!isOk){
                                startInput = false;
                            }else{
                                 
                                noMatch += 1;
                                // drawing update
                                updateDrawing(noMatch);
                                
                                // schreib letter in info
                                updateUsedOnes(letterValue, usedLetters, usedArray);
                                attempts -=1;
                                updateAttempts(attempts);
                            }
                           
                        //empty input field
                        inputLetter.value = "";
                        
                        console.log("round: " + round + " noMatch: " + noMatch);

                        if(!(wordArray.includes("_")) && round <= 10){
                            //winning
                            showPrice();
                        }else if(attempts === 0){
                            gameOver(word, placeholder);
                        }
                        
                    });
                    startInput = false;
                }
            }
        }
        // making a get request, true = ansynchronous
        xhrObj.open("GET", "include/get_data.php", true);
        //we send the request
        xhrObj.send();
        startGame = false;
    }
}

// remove whitesapace, first and last character
function cleanDBWord(dbWord){
    let word = dbWord.trim();
    word = word.substring(1);
    word = word.substring(0,word.length-1);
    console.log(word);
    return word;
}

//prepare placeholder
function preparePlaceholder(word, placeholder){
    // set and write placeholder
    const wordLength = word.length;
    let str;
    for(let i=1; i <=wordLength; i++){
        str = placeholder.textContent += "_ ";
    }
    placeholder.style.fontSize = "2rem";

    //turn placeholder string into array
    const wordArr = str.split(" ");
    return wordArr;
}

function updateDrawing(round){
    switch(round){
        case 1:
            drawing.style.backgroundImage = 'url("img/hang1.svg")';
            break;
        case 2:
            drawing.style.backgroundImage = 'url("img/hang2.svg")';
            break;
        case 3:
            drawing.style.backgroundImage = 'url("img/hang3.svg")';
            break;
        case 4:
            drawing.style.backgroundImage = 'url("img/hang4.svg")';
            break;
        case 5:
            drawing.style.backgroundImage = 'url("img/hang5.svg")';
            break;
        case 6:
            drawing.style.backgroundImage = 'url("img/hang6.svg")';
            break;
        case 7:
            drawing.style.backgroundImage = 'url("img/hang7.svg")';
            break;
        case 8:
            drawing.style.backgroundImage = 'url("img/hang8.svg")';
            break;
        case 9:
            drawing.style.backgroundImage = 'url("img/hang9.svg")';
            break;
        case 10:
            drawing.style.backgroundImage = 'url("img/hang10.svg")';
            break;
    }
}

function updateUsedOnes(letterVal, usedLetters, usedArray){
    usedLetters.push(letterVal);
    usedArray.innerText = " " + usedLetters.toString() + ", ";
}

 //update & show attempts
function updateAttempts(attempts){
    if(attempts > 0){
        remainAttempts.innerText = attempts;
    }else{
        remainAttempts.innerText = "no attempts left";
    }
}

function showSolution(dbWord){
    const solution = document.querySelector("#solution");
    solution.textContent = dbWord;
    solution.style.fontSize = "1rem";
    solution.style.textAlign = "end";
    solution.style.color = "#FD9BAB";
    solution.style.display = "block";
}

//input validation
function checkInputs(letterValue, usedLetters){
    let isLetterOk;
    if(letterValue === ''){
        error.textContent = "You guess - nothing. Enter a letter from a-z!";
        error.style.color = "#FD9BAB";
        isLetterOk = false;
        return isLetterOk;
    }else if(!isLetter(letterValue)){
        error.textContent = "That wasn't a letter, "
        + "do not use numbers or special characters. Only use letters from a - z.";
        error.style.color = "#FD9BAB";
        isLetterOk = false;
        return isLetterOk;
    }else if(usedLetters.includes(letterValue)){
        error.innerText = "You tried this one already.";
        error.style.color = "#FD9BAB";
        isLetterOk = false;
        return isLetterOk; 
    }else{
        isLetterOk = true;
        return isLetterOk;
    }
}

function isLetter(letterVal){
    //check with regular expression
    return /[A-Za-z]/.test(letterVal);
}

//check string 
function isLetterInWord(inputLetter, word){
    const a = word.includes(inputLetter);
    return a;
}

function checkWord(letterExist,cleanLetter,word){
    let indexe = [];
    if(letterExist){
        //check what position is the letter in the word
        for(let i=0; i<word.length; i++){
            if (word[i] === cleanLetter){
                console.log(i);
                indexe.push(i);
            }
        }
        console.log(indexe);
        // different approach with match method and regEx
        //console.log(dbWord.match(/s/g));
    }
    return indexe;
}

function replaceLineWithLetter(foundIndexes, wordArr, word){
    //change word into Array
    let dbWordArr = Array.from(word);
    //initialize the line with the letter from the input
    for(let i=0; i<foundIndexes.length; i++){
        for(let j=0; j<wordArr.length-1; j++){
            wordArr[foundIndexes[i]] = dbWordArr[foundIndexes[i]];
            //console.log(wordArr[foundIndexes[i]]);
        }
    }
    return wordArr;
}

//show replaced line
function showLetterinWord(replacedLine, placeholder){
    // array in string
    let strLine = replacedLine.join(" ");
    placeholder.textContent = strLine;
}

////////////////////////////////////

//view winning fetchAPI TheMealDB

const recipeContainer = document.getElementById("recipe");
const win = document.querySelector("#win_loose_info");

const showPlayAgainBtn = () => {
    let btnAgain = document.createElement("button");
    btnAgain.innerHTML = "play again";
    btnAgain.classList.add("button");
    btnAgain.style.padding = "0.5rem";
    btnAgain.style.margin = "0 auto";
    btnAgain.style.marginTop = "0.75rem";
    btnAgain.style.display = "block";
    btnAgain.type = "button";
    btnAgain.name = "playAgainBtn";
    btnAgain.setAttribute("onclick", "window.location.href='http://192.168.64.3/hangman/dist/'");
    
    const playAgain = document.querySelector(".play__again");
    playAgain.appendChild(btnAgain);
}


// button plus eventlistener to display price
const showPrice = () => {
    win.innerText = "Congratulations!";
    win.style.fontSize = "2rem";
    win.style.textAlign= "center";
    const wg = document.createElement("p");
    wg.innerText = "You won the game! \nClick below to collect your prize!";
    wg.style.color = "#FD9BAB"; 
    wg.style.fontSize = "1.25rem";
    win.appendChild(wg);

    let btn = document.createElement("button");
    btn.innerHTML = "<i class='fas fa-trophy'></i>";
    btn.classList.add("button");
    btn.style.padding = "0.25rem";
    btn.style.margin = "0 auto";
    btn.style.display = "block";
    btn.type = "submit";
    btn.name = "priceBtn";
    btn.onclick = function() {
        viewPrize.style.display = "block";
        viewGame.style.display = "none";
        processRecipeRequest();
        showPlayAgainBtn();
    }
    win.appendChild(btn);
}

const gameOver = (word, placeholder) => {
    win.innerText = "GAME OVER";
    win.style.fontSize = "2.5rem";
    win.style.textAlign= "center";  
    placeholder.innerText = "solution: " + word;
    placeholder.style.color = "#FD9BAB"; 
    placeholder.style.fontSize = "2rem";
    showPlayAgainBtn();
}

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


initGame();

    

