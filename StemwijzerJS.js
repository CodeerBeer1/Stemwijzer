var stemwijzerModal = document.getElementById("intro-modal");
var loadingModal = document.getElementById("loading-modal");
var secondaryModal = document.getElementById("secondary-modal");
var stellingenModal = document.getElementById("stellingen-modal");
var stemwijzerLogo = document.getElementById("stemwijzer-logo");
var stemwijzerStartext = document.getElementById("starText");
var stemwijzerStartbutton = document.getElementById("stemwijzer-startbutton");
var loadingGif = document.getElementById("loading-icon");
var stellingTitle = document.getElementById("stelling-title");
var stellingText = document.getElementById("stelling-text");
var disagreeButton = document.getElementById("disagree-button");
var neitherButton = document.getElementById("neither-button");
var agreeButton = document.getElementById("agree-button");
var previousButton = document.getElementById("previous-button");

var choices = [];

function back()
{

    if (choices.length == 0)
    {
        intro();
    }
    else
    {
        choices.pop();
        questionSetup();
    }
    
}

function intro()
{

    document.getElementById("stellingen-modal").className = "hide";
    document.getElementById("intro-modal").className = "grid";
}

function startStemwijzer()
{
    secondaryModal.className = "hide";
    stemwijzerModal.className = "hide";
    loadingModal.className = "grid";

    setTimeout(function() {questionSetup()}, 2000);
}

function nextQuestion(value)
{
    choices.push(value);
    questionSetup();
    
}

function questionSetup()
{

    loadingModal.className = "hide";
    stellingenModal.className = "grid";

    stellingTitle.innerHTML = subjects[choices.length].title;
    stellingText.innerHTML = subjects[choices.length].statement;

}

intro();