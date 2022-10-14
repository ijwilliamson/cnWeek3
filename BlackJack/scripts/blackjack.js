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
const startScreen = document.querySelector('startOverlay');
const startButton = document.getElementById('startGame');

let playerNumberOptions = document.querySelectorAll('#playerNumber li');
let startingCashOptions = document.querySelectorAll('#startingCash li');
let roundOptions = document.querySelectorAll('#rounds li');


// variables

// **** Very important ****
// Player 1 is second in the HTML hiarachy and so has an Id of 1.
// Player 0 is first and so has an Id of 0.
// The game begins with Player 1 and so has an Id of 1 not 0.
let currentPlayer = 1;

let cards = [];  
let playersCards =  [[],[]]; //cannot think of a way to pre define
let scores = [[0,0,0,0,0],[0,0,0,0,0]]; //possible score options
let cash = [100,100];
let bet = 5;
let totalRounds = 5;
let gametype = 1; //0: 1Player, 1: 2Player


console.log(playerNumberOptions);
console.log(startingCashOptions);
console.log(roundOptions);

//Events

deck.addEventListener('click', () => hitACard());

standButton.forEach((button) => {
    button.addEventListener('click', () => standClicked());
});

winnerOverlay.addEventListener('click', () => reset());

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

    reset();
    setInitValues();
    startScreenVisible(false);
    updateUI();
    //Game becomes event driven by the user until a winner emerges

}


//Game Functions


reset = () =>{
    //reset the game values.
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
    winnerOverlay.classList.add('removed');
    standButton[0].classList.add('removed');
    standButton[1].classList.add('removed');
}

setInitValues = () =>{
    //set the game values to those chosen on the start screen
    gametype = getGameType();
    cash = getStartingCash();
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

    //set Player 1 Score
    //set Player 2 Score
    //set Player 1 State (Bust Stopped)
    //set Player 2 State
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

//Game play

//Get a random unplayed card

hitACard = () =>{
    
    let randomCard = null;
    do{
        i = Math.floor(Math.random(1)*52);
        randomCard = cards[i];
    
    } while(randomCard.played)
    // to here
        
    placeCard(randomCard);
    standButton[currentPlayer].classList.remove('removed');
    

    newScore = checkScore(currentPlayer)
    updatePlayerScore(newScore)
    if(newScore <= 21){
        //player can continue and no action is required.
    } else {
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

//stand clicked
standClicked = ()=> {
    
    if (currentPlayer === 0){
        calculateWinner(-1);
    } else {
        switchPlayer();   
    }
}

switchPlayer = () => {
    standButton[1].classList.add('removed');
    currentPlayer -=1;
    //change active stand button
    //change opacity of the player
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




