<?php
    require_once 'include/configuration.php';
?>    
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hangman</title>
    <link rel="icon" href="data:;base64,=">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" referrerpolicy="no-referrer" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Poppins&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="css/main.min.css">
    <script type="module" src="js/main.js"></script>
</head>
<body>
    <main id="viewGame" class="fade-in">
        <p id="test"></p>
        <h1>Guess a word</h1>
        <section id="start">
            <div id="description" class="description">
                <p>Guess the word. You have 10 attempts. Only letters are valid input.
                 Choose the level of difficulty to start the game.</p>
            </div>
            <div id="level">
                <button id="easy" class="button">easy</button>
                <button id="middle" class="button">middle</button>
                <button id="difficult" class="button">difficult</button>
            </div> 
        </section>  
        <section id="question__bear">
            <div id="question"> 
            </div>
            <div id="bear">
                <img src="img/waschbaer.jpg" alt="bear" width="500" height="400">
            </div>
        </section>
        <section id="input" class="input fade-in">
            <form id="form" class="form">
                    <label for="input__text">Enter a letter: </label>
                    <input id="input__text" class="input__text text" type="text" minlength="1" 
                    maxlength="1" onfocus="this.value=''" value="">
                <button id="input__button text" class="input__button button" title="Submit your letter">
                    OK
                </button>
            </form>
            <div id="error__box">
                <p id="error"></p>
            </div>   
        </section>
        <section id="word" class="word fade-in">
            <div id="word__line" class="word__line">
                <p id="wordPlaceholder"></p>
            </div>        
        </section> 
        <section id="hangman" class="hangman fade-in">
            <div id="hangman__draw" class="hangman__draw">

            </div>
        </section>
        <section id="infobox" class="fade-in">
            <table style="width:50%">
                <tr>
                    <th>letters used</th>
                    <th>remain attempts</th>
                </tr>
                <tr>
                    <td id="letters__used"></td>
                    <td id="attempts"></td>
                </tr>
            </table>  
            <div id="win_loose_info" class="play__again">
            </div> 
        </section>
        <div id="solution" class="fade-in"></div>
    </main>
    <main id="viewPrize">
    
        <h1 id="winning" class="fade-in">winner</h1>
        <section id="recipe__title1">

        </section>
        <section id="recipe" class="recipe">
        
        </section>
        <section>
            <div id="links" class="play__again">
                <a href="http://192.168.64.3/hangman/dist/">play again</a>
                <a>webshop</a>
                <a>shopping list</a>
            </div>
        </section>
    </main>
</body>
</html>