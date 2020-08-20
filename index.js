// Variables Decaration and initialization:

//Mapping for random color Selection
var buttonColours = ["red", "blue", "green", "yellow"];

//Keep track of current Level
var level=-1;

//To store the user and actual sequence
var gamePattern = [];
var userClickedPattern = [];

//A flag to check if game has started or not
var start=true;


//Function:

//To play sound corresponding to the selected button
function playSound(name){

    switch(name){
        case "red":
            var audio = new Audio("sounds/red.mp3");
            audio.play();
        break;

        case "blue":
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
        break;

        case "green":
            var audio = new Audio("sounds/green.mp3");
            audio.play();
        break;

        case "yellow":
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
        break;

        default:
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
    }
}

// To animate the elements
function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");

    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    },100);
}

//Adding a new color to the game sequence:
function nextSequence(){
    
    //randomly selecting a color
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    //Incrementing the level
    level++;

    //Changing heading
    $("h1").text("Level "+level);

    //Displaying the selecting color to user
    playSound(randomChosenColor);

    animatePress(randomChosenColor);
}

//If you successfully complete the previous level, starting a new level
function nextLevel(){
    //initializing user sequence for new level
    userClickedPattern.length=0;
    nextSequence();
}

//If you loose, reseting the game to initial state
function restartGame(){

    //Initializing all the variables
    gamePattern.length=0;
    userClickedPattern.length=0;
    level=-1;
    start=true;

    //Response on wrong move
    playSound("wrong");

    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass("game-over");
    },100);

    //Changing heading
    $("h1").text("Press A Key to Start");
}

//Checking the current move of the user
function checkAnswer(currentLevel){

//If user has pressed the correct button
if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

    //If user completes the level
    if(currentLevel==level){
        setTimeout(nextLevel,600);
    }

}else{
    //If user presses a wrong button
    setTimeout(restartGame,200);
}
}

//Event Listeners:

//To detect Key Press
$(document).on("keypress", function(){

    //Ignoring the key press during the game
    if(start===true){
        start=false;
        nextSequence();
    }
});

//To detect button press
$(".btn").on("click", function(){

    //Only after starting the game
    if(start==false){

        //User's response
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        //Generating response
        playSound(userChosenColour);
        animatePress(userChosenColour);

        //Checking answer
        checkAnswer(userClickedPattern.length - 1);
    }
});

// To display and hide rule list
$("footer .list").on("click",function(){
    $(".rules").toggle();
});

