/*

    Opdracht: Stemwijzer Front-end Challenge
    Naam: Khizer Butt
    Klas: 18A3
    Studenten-nummer: 99053182
    Inleverdatum: 20/5/2020

*/


// Alle HTML elementen worden hier opgehaald.

var body = document.getElementById("body");
var stemwijzerModal = document.getElementById("intro-modal");
var loadingModal = document.getElementById("loading-modal");
var contributorsOverviewModal = document.getElementById("contributors-overview-modal");
var stellingenModal = document.getElementById("stellingen-modal");
var contributorsOpinionModal = document.getElementById("contributors-opinion-modal");
var opinionPopupModal = document.getElementById("opinion-popup-modal");
var resultModal = document.getElementById("result-modal");
var rankingModal = document.getElementById("ranking-modal");

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
var partyContainer = document.getElementById("party-container");

var agreeOpinions = document.getElementById("agree-opinions");
var disagreeOpinions = document.getElementById("disagree-opinions");
var neitherOpinions = document.getElementById("neither-opinions");

var FirstChoice = document.getElementById("nrr1");
var SecondChoice = document.getElementById("nrr2");
var ThirdChoice = document.getElementById("nrr3");

var TheRest = document.getElementById("the-rest");

var multiplierButton = document.getElementById("multiplier-button");

// Alle globale variabelen.

var yourParties = [];
var choices = [];
var theBool = false;
var multistate = false;

var secbool = false;
var greatbool = false;
var allbool = false;

// Deze object hieronder houdt bij hoever je bent met de stemwijzer, door een balk te laten weergeven-
// die groeit of krimpt afhankelijk van jouw voortgang.

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

// Function hieronder zet de eerste gedeelte van de applicatie in elkaar.

function intro()
{
    progressBar.className = "hide";
    progressBarData.width = 0;
    contributorsOpinionModal.className = "hide";
    stellingenModal.className = "hide";
    stemwijzerModal.className = "grid";
    contributorsOverviewModal.className = "grid";
}

// Function hieronder start de stemwijzer.

function startStemwijzer()
{
    contributorsOverviewModal.className = "hide";
    stemwijzerModal.className = "hide";
    loadingModal.className = "grid";

   setTimeout(function() {questionSetup()}, 1500);
}

// Function hieronder zet de vraag inelkaar met de bijbehorende gegevens.

function questionSetup()
{
    if(choices.length < subjects.length)
    {
        console.log(choices);
        resultModal.className = "hide";
        loadingModal.className = "hide";
        stellingenModal.className = "grid";
        progressBar.className = "show";

        // Button die zorgt voor meer gewicht van de vraag door vermenigvuldiging van punten.

        multiplierButton.onclick = function()
        {
            if(multistate == false)
            {
                multistate = true;
                multiplierButton.style.backgroundColor = "rgb(0, 191, 255)";  
            }

            else if(multistate == true)
            {
                multistate = false;
                multiplierButton.style.backgroundColor = "black";
            }
        }

        stellingTitle.innerHTML = subjects[choices.length].title;
        stellingText.innerHTML = subjects[choices.length].statement;
    }
    
    else 
    {
        resultSetup();
    }
    
}

// Function hieronder schakelt naar de volgende vraag.

function nextQuestion(value)
{

    // Sluit ook de meningen van partijen.

    if (theBool == true)
    {
        partyOpinionClose();
    }
    
    // Slaat de ingevoerde gegevens op in een array.

    if (choices.length < subjects.length)
    {
        choices.push({question:choices.length+1, answer: value, multiplier: 1});
        questionSetup();
        progressBarData.grow();
    }
    
    else if (choices.length >= subjects.length-1)
    {

        resultSetup();
        
    }
    if(multistate == true)
    {
        choices[choices.length-1].multiplier = 2;
    }
}

// Function hieronder gaat terug naar de vorige vraag.

function back()
{
    if (endPartyChoose == true)
    {
        endPartyChoose = false;
        
        var amountParties = parties.length;

        for (a = 0; a < amountParties; a++)
        {
        
            remove(party);
        
        }
    }
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

// Function hieronder laadt alle partijen tervoorschijn met een knop die allemaal leiden naar hun meningen.

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

// Function hieronder verdwijnen alle partijen met hun buttons voor hun meningen.

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

// Function hieronder laadt de mening van de partij zelf in een modal.

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

// Function hieronder haalt de mening van de scherm af.

function closeActualOpinion()
{
    body.className = "show";
    opinionPopupModal.className = "hide";
    position.innerHTML = "";
    opinion.innerHTML = "";
}

// Function hieronder leidt naar andere functions die zorgen voor de verschijning van de meningen.

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

// Function hieronder zet alvast alles klaar voor de uitslag presentatie.

function resultSetup()
{

    progressBarData.shrink();
    contributorsOpinionModal.className = "hide";
    stellingenModal.className = "hide";

    resultModal.className = "grid";

    // Je kan ondertussen kiezen wat je voorkeuren zijn bij partijen.
    endPartyChoose();

}

// Function hieronder haalt alle partijen tervoorschijn om te kiezen welke je mee wilt nemen.

function endPartyChoose()
{

    endPartyChoose = true;
    var amountParties = parties.length;

    // Laadt ze allemaal in.
    for (a = 0; a < amountParties; a++) 
    {
        var partyText = document.createTextNode(parties[a].name);
        var party = document.createElement("button");
        partyContainer.appendChild(party);
        party.appendChild(partyText);

        party.className = "partyy";
        party.id = "partyy"+a;
        party.check = false;


        if(parties[a].size > 9)
        {
            parties[a].big = true;
        }

        if(parties[a].size <= 9)
        {
            parties[a].big = false;
        }
       


        // De knoppen leiden naar een andere function die partijen opneemt voor de eindresultaat.
        party.setAttribute("onclick", "ChoosingParty("+a+")")
    }

    // Gaat naar de eindresultaat.
    volgende.onclick = function()
        {
        var chosen = false;
            // Kijkt met for-loop welke knoppen groen zijn (dus "party-chosen" als classnaam hebben) en stuurt hun naam mee naar een array: yourParties.
            for (o = 0; o < amountParties; o++)
            { 
                var party = document.getElementById("partyy"+o);

                if (party.className == "party-chosen")
                {
                    chosen = true;
                    yourParties.push(party.textContent);
                }
            }

            // Laat eindresultaat zien.
            if(chosen  == true)
            {
                showResult();
            }
            else if(!chosen)
            {
                alert("U hebt nog geen partijen gekozen");
            }
        }

}

// Function hieronder bepaalt of een partij wel of niet meegaat naar een eindresultaat.

function ChoosingParty(a)
{

    // Krijgt een ID van partij als argument mee om de juiste knop te selecteren.

    var party = document.getElementById("partyy"+a);

    var sec = document.getElementById("secular").style.backgroundColor = "black";
    var sec = document.getElementById("great").style.backgroundColor = "black";
    var sec = document.getElementById("all").style.backgroundColor = "black";

    secbool = false;
    greatbool = false;
    allbool = false;

    if (party.className != "party-chosen")
        {
    
            party.className = "party-chosen";
        }
    
        else if (party.className == "party-chosen")
        {
        
            party.className = "partyy";
        }
}

// Function hieronder selecteert alle seculiere partijen die de gebruiker kan meenemen naar de eindresultaat.

function chooseSecularParties()
{
    
    var great = document.getElementById("great").style.backgroundColor = "black";
    var all = document.getElementById("all").style.backgroundColor = "black";

    greatbool = false;
    allbool = false;

    // Met een for-loop neemt het alle partijen op die hun naam en seculariteit controleert-
    // door het te vergelijken met de originele lijst van alle partijen met hun bijbehorende-
    // gegevens; en hun vervolgens een "party-chosen" als classnaam te geven.

    if(secbool == false)
    {
        for(r = 0; r < parties.length; r++)
        {
            var party = document.getElementById("partyy"+r);
            if(party.textContent == parties[r].name)
            {
                party.className = "party-chosen";
                party.check = false;
            }
        }
    }
    

    for (e=0; e < parties.length; e++)
    {
        var party = document.getElementById("partyy"+e);
        if(party.textContent == parties[e].name)
        {

                party.className = "partyy";

            if(party.check == false)
            {
                
                if(parties[e].secular == true)
                {
                    party.className = "party-chosen";
                    party.check = true;
                    secbool = true;
                    var sec = document.getElementById("secular").style.backgroundColor = "red";
                }
            }

            else if(party.check == true)
            {
               
                if(parties[e].secular == true)
                {
                    party.className = "partyy";
                    party.check = false;
                    secbool = false;
                    var sec = document.getElementById("secular").style.backgroundColor = "black";
                }
            }
        }
    }
}

// Function hieronder selecteert alle grote partijen die de gebruiker kan meenemen naar de eindresultaat.

function chooseGreatParties()
{

    var sec = document.getElementById("secular").style.backgroundColor = "black";
    var all = document.getElementById("all").style.backgroundColor = "black";

    secbool = false;
    allbool = false;

    // Met een for-loop neemt het alle partijen op die hun naam en grootte controleert-
    // door het te vergelijken met de originele lijst van alle partijen met hun bijbehorende-
    // gegevens; en hun vervolgens een "party-chosen" als classnaam te geven.

    if(greatbool == false)
    {
        for(r = 0; r < parties.length; r++)
        {
            var party = document.getElementById("partyy"+r);
            if(party.textContent == parties[r].name)
            {
                party.className = "partyy";
                party.check = false;
            }
        }
    }

    for (e=0; e < parties.length; e++)
    {
        var party = document.getElementById("partyy"+e);
        if(party.textContent == parties[e].name )
        {
            if(party.check == false)
            {
                if(parties[e].big == true)
                {
                    var great = document.getElementById("great").style.backgroundColor = "red";
                    party.className = "party-chosen";
                    party.check = true;
                    greatbool = true
                } 
            }
            
            else if(party.check == true)
            {
                var great = document.getElementById("great").style.backgroundColor = "black";
                party.className ="partyy";
                party.check = false;
                greatbool = false;
            }
        }
    }
    
}

// Function hieronder selecteert alle partijen die de gebruiker kan meenemen naar de eindresultaat.

function chooseAllParties()
{

    var sec = document.getElementById("secular").style.backgroundColor = "black";
    var great = document.getElementById("great").style.backgroundColor = "black";

    secbool = false;
    greatbool = false;

    // Met een for-loop neemt het alle partijen op die hun naam controleert-
    // door het te vergelijken met de originele lijst van alle partijen met hun bijbehorende-
    // gegevens; en hun vervolgens een "party-chosen" als classnaam te geven.

    if(allbool == false)
    {
        for(r = 0; r < parties.length; r++)
        {
            var party = document.getElementById("partyy"+r);
            if(party.textContent == parties[r].name)
            {
                party.className = "partyy";
                party.check = false;
            }
        }
    }

    for (w=0; w < parties.length; w++)
    {

        var party = document.getElementById("partyy"+w);

        if(party.textContent == parties[w].name)
        {
            if(party.check == false)
            {
                all.style.backgroundColor = "red";
                party.className = "party-chosen";
                party.check = true;
                allbool = true;
            }

            else if(party.check == true)
            {
                all.style.backgroundColor = "black";
                party.className ="partyy";
                party.check = false;
                allbool = false;
            }
        }
    }

}

// Function hieronder berekent de punten van de partijen.

function CalculatePoints()
{

    // In de "parties" array krijgen alle partijen krijgen "score" property om hun punten bij te houden.
    for ( r = 0 ; r < parties.length; r ++)
    {
        parties[r].score = 0;
    }
   
    // Hier gaat de for-loop over al je antwoorden en van de partijen, en kijkt of ze overeen komen.
    // Als dat het geval is, wordt de partij opgezocht in "parties" door een ingebouwde find() array function, wordt de score-
    // verhoogd en als van toepassing is vermenigvuldigd door 2.
    for(p = 0; p < subjects.length; p++)
    {
        for(a = 0; a < subjects[p].parties.length; a++)
        {
            if(subjects[p].parties[a].position == choices[p].answer)
            {
                var result = parties.find(function(party)
                {
                    return party.name == subjects[p].parties[a].name
                })
                result.score += 1 * choices[p].multiplier;
            } 
        }
    }
}

// Function hieronder sorteert de partijen aan de hand van hun punten en voorkeur van de gebruiker.

function SortParties()
{

    // Er wordt een kopie gemaakt van een array die al punten bijhoudt, om ze te sorteren.
    var pScoreList = [];

    // Met een forEach() word alles van parties gepushed naar "pScoreList".
    parties.forEach(party => 
        {
            pScoreList.push(
                {
                    name: party.name,
                    score: party.score
                });
    })

    // Vervolgens wordt de "pScoreList" gesorteerd met een ingebouwde sort() function voor arrays.
    pScoreList.sort((a,b) => (a.score < b.score) ? 1 : -1);
 
    // Hier worden alle partijen daarna gecontroleerd of zij inderdaad gekozen zijn door ze een "check" property met een 'true' te geven.
    for(o = 0; o < yourParties.length; o++)
    {
        for(p = 0; p < parties.length; p++)
        {
            // Kijkt of de namen in "yourParties" in "pScoreList" zijn.
            if (pScoreList[p].name == yourParties[o])
            {
               pScoreList[p].check = true;
            }
        }
    }

    // De resterende partijen die niet zijn gekozen (dus geen 'true' bij zich hebben) worden uit de array verwijderd.
    for(i = 22; i > -1; i--)
    {
        if(pScoreList[i].check != true)
        {
            pScoreList.splice(i, 1);
        }
    }

    // Laat ze zien met de index van de array met de partijen op de juiste volgorde en voorkeur van de gebruiker.
    FirstChoice.innerHTML ="1ste keuze "+ pScoreList[0].name + ", "+ pScoreList[0].score + " punten";
    SecondChoice.innerHTML ="2de keuze "+ pScoreList[1].name + ", "+ pScoreList[1].score + " punten";
    ThirdChoice.innerHTML ="3de keuze "+ pScoreList[2].name + ", "+ pScoreList[2].score + " punten";

    for (u = 3; u < pScoreList.length; u++)
    {
        var place = document.getElementById("nr"+u);
        console.log(pScoreList)
        alert(pScoreList[u].name + "geplaatst")
        place.innerHTML = u+1 + "de " + pScoreList[u].name + ", " + pScoreList[u].score + " punten";
    }
    
}

// Function hieronder laat de eindresultaat zien.

function showResult()
{
   
        resultModal.className = "hide";
        rankingModal.className = "grid";

    // Voert ook functions uit voor het berekenen en sorteren van de eindresultaat.
        CalculatePoints();
        SortParties();

}