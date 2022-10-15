//--------------------------------------------------------------------
//--------- Black Jack Game Script -----------------------------------
//--------------------------------------------------------------------

// classes
class card {
    constructor(imgSrc, value, played) {
        //imgSrc: string image filename
        //value: int face value
        //played: bool on the table
        
        this.imgSrc = imgSrc;
        this.value = value;
        this.played = played;

    }}



//Initial Constants
const suits = ["C","S","H","D"];
const cardNumbers = ["A","2-9","T","J","Q","K"];

//UI Constants
const playerAreas = [document.getElementsByTagName('player')[0],
                     document.getElementsByTagName('player')[1]];
   
const playerAmounts = document.getElementsByTagName('amount');

const cardAreas = [document.getElementsByTagName('cards')[0],
                   document.getElementsByTagName('cards')[1]];

const standButton = [document.getElementsByTagName('control')[0],
                   document.getElementsByTagName('control')[1]];

const deck = document.querySelector('cardDeck img');

const winnerOverlay = document.querySelector('winnerOverlay');
const endOverlay = document.querySelector('endOverlay');
const startScreen = document.querySelector('startOverlay');
const startButton = document.getElementById('startGame');
const infoBar = document.querySelector('.status');

const playerNumberOptions = document.querySelectorAll('#playerNumber li');
const startingCashOptions = document.querySelectorAll('#startingCash li');
const roundOptions = document.querySelectorAll('#rounds li');


// variables

// **** Very important ****
// Player 1 is second in the HTML hiarachy and so has an Id of 1.
// Player 0 is first and so has an Id of 0.
// The game begins with Player 1 and so has an Id of 1 not 0.
let currentPlayer = 1;

let cards = [];  
let playersCards =  [[],[]]; //cannot think of a way to pre define
let scores = [[0,0,0,0,0],[0,0,0,0,0]]; //possible score options
let startcash = [100,100];
let cash = [100,100];
let bet = 5;
let totalRounds = 5;
let currentRound = 0;
let gametype = 1; //0: 1Player, 1: 2Player

let AiTimer = 0;  //AI timer variable


console.log(playerNumberOptions);
console.log(startingCashOptions);
console.log(roundOptions);



//Events
deck.addEventListener('click', () => hitACardAiFix());

standButton.forEach((button) => {
    button.addEventListener('click', () => standAiFix());
});

winnerOverlay.addEventListener('click', () => reset());
endOverlay.addEventListener('click', () => displayNewGameScreen());

playerNumberOptions.forEach((li) => {
    li.addEventListener('click', (args)=> optionSelected('player',args))
})

startingCashOptions.forEach((li) => {
    li.addEventListener('click', (args)=> optionSelected('cash',args))
})

roundOptions.forEach((li) => {
    li.addEventListener('click', (args)=> optionSelected('rounds',args))
})

startButton.addEventListener('click', ()=> beginNewGame());


//Game Flow
beginNewGame = () => {
    currentRound =0;
    reset();
    setInitValues();
    startScreenVisible(false);
    updateUI();
    //Game becomes event driven by the user until a winner emerges

}


//Game Functions


reset = () =>{
    //reset the game values.
    if (currentRound>=totalRounds){
        endGame();
    }

    cards = [];
    playersCards = [[], []];
    scores = [[0,0,0,0,0],[0,0,0,0,0]];
    buildDeck();
    cardAreas[0].innerHTML= "";
    cardAreas[1].innerHTML ="";
    document.getElementsByClassName('playerScore')[0].textContent = 0;
    document.getElementsByClassName('playerScore')[1].textContent = 0;
    document.getElementsByClassName('playerStatus')[0].textContent = '';
    document.getElementsByClassName('playerStatus')[1].textContent = '';
    currentPlayer=1;
    currentRound +=1;
    winnerOverlay.classList.add('removed');
    standButton[0].classList.add('disabled');
    standButton[1].classList.add('disabled');
}

endGame = () => {
    //handle end of game by displaying the endOverlay with the game summary
    //this is a little confusing because you have to remember that Player 2 has the playerId of 1 and player 2 has the playerId of 0
    
        let winner = 0;
        lines = ["","","",""]
        if (cash[0] === cash[1]){
            //draw
            lines[0] = "It's a draw!!"
        } else if (cash[0] > cash[1]){
            winner = 2;
            //player 2 wins
            lines[0] = "Player 2 is the overall winner";
            lines[1] = `Player 2 won £${cash[0]-startcash[0]}`;
            lines[2] = `Player 1 lost £${startcash[1]-cash[1]}`;
        } else {
            winnder = 1;
            //player 1 wins
            lines[0] = "Player 1 is the overall winner";
            lines[1] = `Player 1 won £${cash[1]-startcash[1]}`;
            lines[2] = `Player 2 lost £${startcash[0]-cash[0]}`;
        }
        lines[3] = "Click to play again"
        endOverlay.innerHTML=`<p>${lines[0]}</p><p>${lines[1]}</p><p>${lines[2]}</p><p>${lines[3]}</p>`
        endOverlay.className="";
}

displayNewGameScreen = () =>{
    endOverlay.classList.add('removed')
    startScreen.className="";
}

setInitValues = () =>{
    //set the game values to those chosen on the start screen

    gametype = getGameType();
    cash = getStartingCash();
    startcash = getStartingCash();
    totalRounds = getTotalRounds();
}

// building the Deck using buildDeck and addCardToDeck
buildDeck = ()=>{
    //loop though each suit with inner loop of cardNumbers
    //add a card with value for each cardNumber and each suit
    
    //Clear cards before building Deck
    cards = [];

    suits.forEach((suit) => {
        cardNumbers.forEach((num) => {
            switch(num){
                case "A":
                    addCardToDeck(num,suit,11);
                    break;
                case "2-9":
                    for (let i=2;i<=9;i++){
                        addCardToDeck(i.toString(),suit,i);
                    }
                    break;
                case "T":
                case "J":
                case "Q":
                case "K":
                    addCardToDeck(num,suit,10);
                    break;
            }
        })
    })
}

addCardToDeck = (num, suit, val) => {
    cards.push(new card(num+suit,val,false));
}

updateUI = () =>{
    playerAmounts[0].textContent = `£${cash[0]}`
    playerAmounts[2].textContent = `£${cash[1]}`
    playerAmounts[1].textContent = `£${bet}`
    playerAmounts[3].textContent = `£${bet}`

    infoBar.textContent = `Round ${currentRound} of ${totalRounds}`

}

getGameType = () =>{
   option = Array.from(playerNumberOptions).find(
                    element => element.className === "selected")
    return parseInt(option.textContent.charAt(0))-1;
}

getStartingCash = () =>{
    option = Array.from(startingCashOptions).find(
        element => element.className === "selected")
    amount = parseInt(option.textContent.substring(1));
    return [amount,amount];
}

getTotalRounds = () =>{
    option = Array.from(roundOptions).find(
        element => element.className === "selected")
    if(option.textContent === "Infinite"){
        return 9999;
    } else {
        return parseInt(option.textContent); 
    }
}

startScreenVisible = (visible) =>{
    if (visible) {
        startScreen.className=""
    } else {
        startScreen.classList.add('removed')
    }
}

optionSelected = (cat,args)=>{
    //cat player, cash, round
       selectedItemText = args.path[0].textContent;
       switch(cat){
           case 'player':
               playerNumberOptions.forEach((li) => 
                   optionLiSet(li,selectedItemText));
               break;
           case 'cash':
               startingCashOptions.forEach((li) => 
                   optionLiSet(li,selectedItemText));
           break;
           case 'rounds':
               roundOptions.forEach((li) => 
                   optionLiSet(li,selectedItemText));
           break;
   
       }
}

optionLiSet = (li,val)=>{
    li.className='';
    if (li.textContent === val){
        li.classList.add('selected')
    } 
}



// Game play

// To protect the Ai from interference it is necessary to stop user clicks on the deck and stand buttons.
hitACardAiFix = ()=>{
    if(gametype === 0 && currentPlayer === 0){
        //stop players from giving the ai extra cards
        return;
    } else {
        hitACard();
    }
}

standAiFix = ()=>{
    if(gametype === 0 && currentPlayer === 0){
        //stop players from standing the AI
        return;
    } else {
        standClicked();
    }
}

//Get a random unplayed card
hitACard = () =>{
   
    let randomCard = null;
    do{
        i = Math.floor(Math.random(1)*52);
        randomCard = cards[i];
    
    } while(randomCard.played)
    // to here
        
    placeCard(randomCard);
    standButton[currentPlayer].classList.remove('disabled');
    

    newScore = checkScore(currentPlayer)
    updatePlayerScore(newScore)
    if(newScore > 21){
        //player is bust
        markPlayerBust();
    } 
}

updatePlayerScore = (newScore) => {
    scorebox = document.querySelectorAll('player .playerScore')
    scorebox[currentPlayer].textContent = newScore;
}

markPlayerBust = () => {
    //TODO: needs improving
    document.querySelectorAll('player .playerStatus')[currentPlayer].textContent =
        "Bust";
calculateWinner(currentPlayer);
}

placeCard = (randomCard) => {
    //play card on the table
    newCard = document.createElement('img');
    newCard.src = "./images/" + randomCard.imgSrc + ".svg";
    cardAreas[currentPlayer].appendChild(newCard);
    randomCard.played = true;
    playersCards[currentPlayer].push(randomCard);
}


standClicked = () => {

    //stand clicked

     if (playersCards[currentPlayer].length === 0){
            return;
        }
    if (currentPlayer === 0){
        console.log(playersCards[currentPlayer].length)
       
        calculateWinner(-1);
        
    } else {

        switchPlayer();
        if (gametype===0){
            onePlayerAi();
        }
    }
}

switchPlayer = () => {
    standButton[1].classList.add('disabled');
    currentPlayer -=1;


}

onePlayerAi = () => {
    Timer(true);
   
}



Timer = (val) => {
    //Create the AI timer to place cards on the deck in with a pause between
    if (val) {
        AiTimer = setInterval(AiDrawACard,500)
    } else{
         clearInterval(AiTimer);
    }
}

AiDrawACard = () => {
    p2s = checkScore(0);
    p1s = checkScore(1);
    if (typeof(p2s) === "undefined") {
        p2s = 0;
    }
    if (p2s < p1s){
        hitACard();
    } else if (p2s<=21) {
        Timer(false);
        standClicked();
    }
}


checkScore = (player)=> {
    //check possible scores of current player
    //loop for each ace using 11 and 1
    //return true if valid score

    let tempCardValues = [];
   
    playersCards[player].forEach((card) =>{
        tempCardValues.push(card.value);
    })
    let i=0;
    do{
        //sum the card values
        scores[player][i] = tempCardValues.reduce((a, b) => a + b, 0);

        //check if there is an ace reduce ace to 1 and store another score
        if (tempCardValues.includes(11)){
            i +=1;
            ace = tempCardValues.findIndex( val => val === 11);
            tempCardValues[ace] = 1;
        } else {
            i=-1;
        }
    } while (i>0)

    actualScores = scores[player].filter(value => value > 0);
    validScores = actualScores.filter(value => value<=21);
    
    if (validScores.length === 0){
        actualScores.sort();
        return actualScores[0];
    } else {
        validScores.sort((a,b) => {return a - b});
        return validScores[validScores.length-1];
    }
}

calculateWinner = (status)=> {
    //0 player 1 wins
    //1 player 2 wins
    //-1 both players stuck, check scores
    clearInterval(AiTimer);
    console.log(AiTimer);
    let winningPlayer = 0;

    if (status >= 0){
        //a player is bust.  No need to check scores.
        winningPlayer = (status === 0) ? 1 : 0;
    
    } else{
        winningPlayer = (checkScore(1)>checkScore(0))? 1 : 0;
    }

     cash[1] += (winningPlayer === 1) ? bet : 0-bet;
     cash[0] += (winningPlayer === 0) ? bet : 0-bet;
    
    updateUI();


    winningPlayer = (winningPlayer === 0) ? 2 : 1;

    winnerOverlay.innerHTML=
    `<p>Player ${winningPlayer} Wins</p>`+
    `<p>Player ${winningPlayer} receives £${bet}</p>` +
    `<p>Click for the next round</p>`

    winnerOverlay.classList.remove('removed');


}




