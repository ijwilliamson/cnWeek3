//--------------------------------------------------------------------
//--------- Black Jack Game Script -----------------------------------
//--------------------------------------------------------------------

// classes
class Card {
    constructor(imgSrc, value, played) {
        //imgSrc: string image filename
        //value: int face value
        //played: bool on the table
        
        this.imgSrc = imgSrc;
        this.value = value;
        this.width = width;

    }    
}

//consts
const Suits = ["C","S","H","D"];
const CardNumbers = ["A","1-10","T","J","Q","K"];

// variables
let Cards = Array(52).fill(null);
let Scores = [0,0];
let Cash = [100,100];
let Bet = 0;
let currentPlayer = 0;  //0: player One, 1: player 2
let playersCards= null; //cannot think of a way to pre define



buildDeck = ()=>{

    Suits.forEach((suit) => {
        CardNumbers.forEach((num) => {
            switch(num){
                case "A":
                    //code
                    break;
                case "1-10":
                    //code
                    break;
                case "T":
                    //code
                    break;
                case "J":
                    //code
                    break;
                case "Q":
                    //code
                    break;
                case "K":
                    // code
                    break;
            }

        })
    })

}

addCardToDeck = (newCard) => {

}
    // new Card('AC', 11, false ),
    // new Card('2C', 2, false ),
    // new Card('3C', 3, false ),
    // new Card('4C', 4, false ),
    // new Card('5C', 5, false ),
    // new Card('6C', 6, false ),
    // new Card('7C', 7, false ),
    // new Card('8C', 8, false ),
    // new Card('TC', 9, false ),
    // new Card('JC', 10, false ),
    // new Card('QC', 10, false ),
    // new Card('KC', 10, false )



