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
   

const cardAreas = [document.getElementsByTagName('cards')[0],
                   document.getElementsByTagName('cards')[1]];


const standButton = [document.getElementsByTagName('control')[0],
                   document.getElementsByTagName('control')[1]];

const deck = document.querySelector('cardDeck img');



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
let bet = 0;


//Events
document.addEventListener('DOMContentLoaded',()=> pageLoad());
deck.addEventListener('click', () => hitACard());

standButton.forEach((button) => {
    button.addEventListener('click', () => standClicked());
});


//initial game setup
pageLoad = () =>{
    buildDeck();
    //TODO : Create overlay with options for:
    //          one and two players
    //          starting cash
    //          minimum bet
    //          number of rounds (5, 10 ,15, 20, infinate)
    //          Start Game button

    //          Hide 

    //          Add a round counter
    //          After a game, have a new round popup
    //          set a bet amount
    //          fix bet and draw first card
    //          
    //          in two player mode, winner goes first
    //          

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

//Get a random unplayed card

// hitACard UnitTest
// testCards = [0,3,8,13]
// testId = 0;
// to here
hitACard = () =>{
    
    //unit test
    // randomCard = cards[testCards[testId]];
    // testId +=1;
    
    // deactivated for unit test //
    let randomCard = null;
    do{
        i = Math.floor(Math.random(1)*52);
        randomCard = cards[i];
    
    } while(randomCard.played)
    // to here
        
    //play card on the table
    newCard = document.createElement('img');
    newCard.src = "./images/" + randomCard.imgSrc + ".svg";
    cardAreas[currentPlayer].appendChild(newCard);
    randomCard.played = true;
    playersCards[currentPlayer].push(randomCard);
    if(checkScore()){
        updateScore();
    } else {
        if(currentPlayer === 1){
            switchPlayer
        } else {
            calculateWinner();
        }
        
    }
}

//stand clicked
standClicked = ()=> {
    
    if (player = 0){
        calculateWinner();
    } else {
        switchPlayer();   
    }
}

switchPlayer = () => {
    currentPlayer -=1;
    //change active stand button
    //change opacity of the player
}

checkScore = ()=> {
    //check possible scores of current player
    //loop for each ace using 11 and 1
    //return true if valid score

    tempCardValues = [];
    playersCards[currentPlayer].forEach((card) =>{
        tempCardValues.push(card.value);
    })
    let i=0;
    do{
        //sum the card values
        scores[currentPlayer][i] = tempCardValues.reduce((a, b) => a + b, 0);

        //check if there is an ace reduce ace to 1 and store another score
        if (tempCardValues.includes(11)){
            i +=1;
            ace = tempCardValues.findIndex( val => val === 11);
            tempCardValues[ace] = 1;
        } else {
            i=-1;
        }
    } while (i>0)

    actualScores = scores[currentPlayer].filter(value => value > 0);
    validScores = actualScores.filter(value => value<=21);
    if (validScores.length === 0){
        actualScores.sort();
        document.querySelectorAll('player .playerScore')[currentPlayer].textContent = 
                                                                actualScores[0].toString();
        document.querySelectorAll('player .playerStatus')[currentPlayer].textContent =
        "Bust";
        return false;
    } else {
        validScores.sort((a,b) => {return a - b});
        scorebox = document.querySelectorAll('player .playerScore')
        scorebox[currentPlayer].textContent = validScores[validScores.length-1];
        return true;
    }
}

updateScore = ()=> {

}

calculateWinner = ()=> {
    //check score
    //possible score wins
    //award cash to the winner
    //remove cash from the looser

}



