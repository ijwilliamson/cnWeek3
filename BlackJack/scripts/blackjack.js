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

//consts
const suits = ["C","S","H","D"];
const cardNumbers = ["A","2-9","T","J","Q","K"];

// variables
let cards = [];
let scores = [0,0];
let cash = [100,100];
let bet = 0;
let currentPlayer = 0;  //0: player One, 1: player 2
let playersCards= Array[[],[]]; //cannot think of a way to pre define

//Events
document.addEventListener('DOMContentLoaded',()=> buildDeck());


pageLoad = () =>{
    buildDeck();
}

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
    console.table(cards);
}

addCardToDeck = (num, suit, val) => {
    cards.push(new card(num+suit,val,false));
}
  



