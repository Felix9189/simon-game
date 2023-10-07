var level = 0;
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var score = 0;

$("h1").click(function() {
    if(!start) {
        $("h1").text("Level "+level);
        setTimeout(function() {
            nextSequence();
        },500);
        start = true;
        $("h2").remove();
        score = 0;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animateClick(userChosenColor);
    checkAnswer(userClickedPattern.length-1);

    console.log(userClickedPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
            score++;
        }
    }
    else {
        setTimeout(function() {
            playSound("wrong");
        },800);
        $("body").addClass("game-over");
        $("#level-title").text("Game over ! Click here to restart");
        $("h1").after("<h2>Your score: "+score+"</h2>");
        $("h2").attr("id","level-title").css("color","red");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColor[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);

    console.log(gamePattern);
}

function animateClick(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name) {
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play()
}

function startOver() {
    gamePattern = [];
    start = false;
    level = 0;
}