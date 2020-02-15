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
var theBool = false;

var progressBar = 
{


    
}

function partyOpinionLoad()
{
    contributorsOpinionModal.className = "grid";
    theBool = true;
    var amountParties = subjects[choices.length].parties.length;
    for (a = 0; a < amountParties; a++)
    {
        var btn = document.createElement("button");
        btn.setAttribute("id", "btn"+a);
      
       var partyname = document.createTextNode(subjects[choices.length].parties[a].name);
       btn.appendChild(partyname);
        contributorsOpinionModal.appendChild(btn);
    }
}

function partyOpinionClose()
{
    contributorsOpinionModal.className = "hide";
    theBool = false;

    var amountParties = subjects[choices.length].parties.length;
    for (a = 0; a < amountParties; a++)
    {
        document.getElementById("btn"+ a).remove();
    }

}

function back()
{
    if (theBool == true)
    {
        partyOpinionClose();
    }
    

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
    
    if (theBool == false)
    {
        
        
        partyOpinionLoad();
    }

    else if (theBool == true)
        {
            partyOpinionClose();
        }
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

   setTimeout(function() {questionSetup()}, 1);
}

function nextQuestion(value)
{
    if (theBool == true)
    {
        partyOpinionClose();
    }
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