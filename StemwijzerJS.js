var body = document.getElementById("body");
var stemwijzerModal = document.getElementById("intro-modal");
var loadingModal = document.getElementById("loading-modal");
var contributorsOverviewModal = document.getElementById("contributors-overview-modal");
var stellingenModal = document.getElementById("stellingen-modal");
var contributorsOpinionModal = document.getElementById("contributors-opinion-modal");
var opinionPopupModal = document.getElementById("opinion-popup-modal");
var resultModal = document.getElementById("result-modal");

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
var progressBar =  document.getElementById("progress-bar");

var agreeOpinions = document.getElementById("agree-opinions");
var disagreeOpinions = document.getElementById("disagree-opinions");
var neitherOpinions = document.getElementById("neither-opinions");

var choices = [];
var theBool = false;

var progressBarData = 
{

    width: 0,
    fraction: this.width =+ 61/subjects.length,

    grow: function()
    {
        this.width = this.width + this.fraction;
        progressBar.style.width = this.width + "%";
        progressBar.innerHTML = Math.round(this.width * 1.7) + "%";
    },

    shrink: function()
    {
        this.width = this.width - this.fraction;
        progressBar.style.width = this.width + "%";
        progressBar.innerHTML = Math.round(this.width * 1.7) + "%";
    }
    


}

function loadActualOpinion(theParty)
{
    body.className = "scroll-lock";
    opinionPopupModal.className = "show";

    var partyposition = document.createTextNode(subjects[choices.length].parties[theParty].position);
    var p = document.getElementById("position").appendChild(partyposition);

    var partyopinion = document.createTextNode(subjects[choices.length].parties[theParty].opinion);
    document.getElementById("opinion").appendChild(partyopinion);
    var p = document.getElementById("position").appendChild(partyposition);
    
    if (partyposition.textContent == "pro")
    {
        p.textContent = "Eens";
        
    }
    
    if (partyposition.textContent == "contra")
    {
        p.textContent = "Oneens";
        
    }

    if (partyposition.textContent == "none")
    {
        p.textContent = "Geen van beide";
        
    }
}

function closeActualOpinion()
{
    body.className = "show";
    opinionPopupModal.className = "hide";
    position.innerHTML = "";
    opinion.innerHTML = "";
}

function partyOpinionLoad()
{
    contributorsOpinionModal.className = "grid";
    theBool = true;
    var amountParties = subjects[choices.length].parties.length;
    for (a = 0; a <= amountParties; a++)
    {
        var btn = document.createElement("button");
        btn.setAttribute("id", "btn"+a);
        btn.className = "party-opinion-button";
        btn.setAttribute("onclick", "loadActualOpinion("+a+")");
      
        var partyname = document.createTextNode(subjects[choices.length].parties[a].name);
       btn.appendChild(partyname);
        

       var partyposition = document.createTextNode(subjects[choices.length].parties[a].position);
    

    if (partyposition.textContent == "pro")
    {
        
        agreeOpinions.appendChild(btn);
    }
    
    if (partyposition.textContent == "contra")
    {

        disagreeOpinions.appendChild(btn);
    }

    if (partyposition.textContent == "none")
    {
        
        neitherOpinions.appendChild(btn);
    }

    
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
    else if (choices.length <= subjects.length)
    {
        choices.pop();
        questionSetup();
        progressBarData.shrink();
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
    progressBar.className = "hide";
    progressBarData.width = 0;
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

   setTimeout(function() {questionSetup()}, 1500);
}

function nextQuestion(value)
{


    if (theBool == true)
    {
        partyOpinionClose();
    }
    
    
    if (choices.length < subjects.length -1)
    {
        choices.push(value);
        questionSetup();
        progressBarData.grow();
    }

    else if (choices.length >= subjects.length -1)
    {

        resultSetup();
        
    }
    
}

function questionSetup()
{
    console.log(choices);
    resultModal.className = "hide";
    loadingModal.className = "hide";
    stellingenModal.className = "grid";
    progressBar.className = "show";

    stellingTitle.innerHTML = subjects[choices.length].title;
    stellingText.innerHTML = subjects[choices.length].statement;
    
}

function resultSetup()
{
    contributorsOpinionModal.className = "hide";
    stellingenModal.className = "hide";

    resultModal.className = "grid";
}

intro();