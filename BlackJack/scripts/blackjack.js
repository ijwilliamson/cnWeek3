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

    }    
}

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
let cards = [];
let scores = [0,0];
let cash = [100,100];
let bet = 0;
let currentPlayer = 1;  //0: player One, 1: player 2
let playersCards =  [[],[]]; //cannot think of a way to pre define

//Events
document.addEventListener('DOMContentLoaded',()=> pageLoad());
deck.addEventListener('click', () => hitACard());

standButton.forEach((button) => {
    button.addEventListener('click', () => standClicked());
});


//initial game setup
pageLoad = () =>{
    buildDeck();
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
hitACard = () =>{
    let randomCard = null;
    do{
        i = Math.floor(Math.random(1)*52);
        randomCard = cards[i];
    
    } while(randomCard.played)

        
    //play card on the table
    newCard = document.createElement('img');
    newCard.src = "./images/" + randomCard.imgSrc + ".svg";
    cardAreas[currentPlayer].appendChild(newCard);
    randomCard.played = true;
    playersCards[currentPlayer].push(randomCard);
    //TODO - check score
    //TODO - display score

}

//stand clicked
standClicked = ()=> {
    
    if (player = 0){
        //TODO - calc winner
    } else {
        currentPlayer -=1;   
    }
    

}





