var stemwijzerModal = document.getElementById("modal");
var stemwijzerLogo = document.getElementById("stemwijzer-logo");
var stemwijzerStartext = document.getElementById("starText");
var stemwijzerStartbutton = document.getElementById("stemwijzer-startbutton");
var loadingGif = document.getElementById("loading-icon");
var stellingText = document.getElementById("stelling-text");

var questionCount = 0;

function startStemwijzer()
{
    stemwijzerStartext.innerHTML = "Aan het laden..."
    stemwijzerStartbutton.className = "hide";
    loadingGif.className = "show";
    setTimeout(function()
    {
        stemwijzerStartext.className = "hide"
        loadingGif.className = "hide";
        questionSetup();
    }, 4000);
}

function questionSetup()
{

    stellingText.className = "show";
    stellingText.innerHTML = subjects[questionCount].statement;

}