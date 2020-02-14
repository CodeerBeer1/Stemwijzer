var stemwijzerModal = document.getElementById("intro-modal");
var loadingModal = document.getElementById("loading-modal");
var contributorsOverviewModal = document.getElementById("contributors-overview-modal");
var stellingenModal = document.getElementById("stellingen-modal");
var contributorsOpinionModal = document.getElementById("contributors-opinion-modal");

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

var contributorsContainer = document.getElementById("contributors-container");
var contributorsText = document.getElementById("contributors-text");

var choices = [];

function partyOpinionLoad()
{

    for (a = 0; a < subjects[choices.length].parties[a]; a++)
    {
        var btn = document.createElement("button");
        btn.setAttribute("btn"+a);
        contributorsOpinionModal.appendChild(btn);
        
    }

    return subjects[0].parties[2].name;
     
}

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

function showOpinions()
{
    contributorsOpinionModal.className = "grid";
    partyOpinionLoad();
}

function intro()
{

    contributorsOpinionModal.className = "hide";
    stellingenModal.className = "hide";
    stemwijzerModal.className = "grid";

    contributorsOverviewModal.className = "grid";
}

function startStemwijzer()
{
    contributorsOverviewModal.className = "hide";
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