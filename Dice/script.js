

let gameRunning = false;
let currentPlayer = 0;  //0 left : 1 right
let scores = [0,0];
let currentScore = [0,0];
let goal = 20;

const overlay = document.querySelector("overlay")
const startButton = document.querySelector("overlay restart")
const resetButton = document.querySelector("centerControls restart")
const game = document.querySelector("game")
const leftSide = document.querySelector("leftSide")
const rightSide = document.querySelector("rightSide")
const controls = document.querySelector("centerControls")
const die = document.querySelector("die")
const dieCircles = document.querySelectorAll('die circle')
const winnerBar = document.querySelector("winner")
const options = document.querySelector("options")
const optionArray = options.querySelectorAll("option")
const rPlayerName = document.getElementsByTagName('player')[0]
const lPlayerName = document.getElementsByTagName('player')[1]


//Add button Events

rPlayerName.addEventListener('dblclick', () => {
    NameEdit(rPlayerName,true);
} )

lPlayerName.addEventListener('dblclick', () => {
    NameEdit(lPlayerName,true);
} )
rPlayerName.addEventListener('keypress', (args) => {
    if (args.keyCode === 13){
        NameEdit(rPlayerName,false);}
})
lPlayerName.addEventListener('keypress', (args) => {
    if (args.keyCode === 13){
        NameEdit(lPlayerName,false);}
})

optionArray.forEach((o) => {
    o.addEventListener('click', ()=>{
        setOption(o);
    })
})

winnerBar.addEventListener('click', ()=> {
    winnerBar.classList.add('remove');
    hideShowOverlay('show');
})

startButton.addEventListener('click', ()=> {
    hideShowOverlay('hide');
    startNewGame();
})

die.addEventListener('click', ()=> {
    if (!gameRunning) return;
    diceRoll();
})

NameEdit = (player,state)=>{
    player.contentEditable=state;
   
    console.log(player)
}



setOption = (opt,state)=>{

    optionArray.forEach(c =>{c.className=""});
    opt.classList.add('selected')
    goal = parseInt(opt.textContent);
}

leftSide.getElementsByTagName('holdButton')[0].addEventListener('click', ()=>{
     bankScore();
})

rightSide.getElementsByTagName('holdButton')[0].addEventListener('click', ()=>{
    bankScore();    
})

resetButton.addEventListener('click', ()=> {
    document.getElementsByTagName('winner')[0].classList.add('remove');
    overlay.className = "";
})

bankScore = ()=> {
    scores[currentPlayer] += currentScore[currentPlayer];
    currentScore[currentPlayer] = 0;
    setScoreDisplay();
     if (!checkWinner())
        {switchPlayers();}
}

checkWinner = ()=>{
    if (scores[0]>=goal || scores[1]>=goal){
       const winner =  document.getElementsByTagName('winner')[0];
       winner.textContent = `Player ${currentPlayer+1} Wins!`      
        winner.classList.remove('remove');
        leftSide.classList.add('disable');
        rightSide.classList.add('disabe');
        die.classList.add('hide');
        document.getElementsByTagName('holdButton')[0].classList.add('hide');
        document.getElementsByTagName('holdButton')[1].classList.add('hide');
        gameRunning = !gameRunning;
        return true;
    }
    return false;
}

startNewGame = ()=> {
    currentPlayer = 0;
    scores = [0,0];
    currentScore = [0,0];
    setCurrentPlayer();
    setScoreDisplay();
    die.classList = "";
    gameRunning = true;
}


diceRoll = ()=> {
    let rollValue = Math.floor(Math.random(1)*6)+1;
    displayDieFace(rollValue);
    updateCurrentScore(rollValue);
    setScoreDisplay();

}

setScoreDisplay = ()=>{
    document.getElementsByTagName('currentScore')[0].textContent = currentScore[0];
    document.getElementsByTagName('currentScore')[1].textContent = currentScore[1];
    document.getElementsByTagName('score')[0].textContent = scores[0];
    document.getElementsByTagName('score')[1].textContent = scores[1];
}

updateCurrentScore = (value)=>{
    if (value === 1){
        currentScore[currentPlayer]=0;
        
        switchPlayers()
    } else {
        currentScore[currentPlayer]+=value;
    }
}

switchPlayers = ()=>{
    currentPlayer = (currentPlayer===0) ? 1 : 0;
   
    setCurrentPlayer();
}

setCurrentPlayer = ()=>{

    if(currentPlayer === 0) {
       rightSide.classList.add('disable');
       leftSide.classList.remove('disable');
       rightSide.getElementsByTagName('holdButton')[0].classList.add('hide')
       leftSide.getElementsByTagName('holdButton')[0].classList.remove('hide')
        document.getElementById('dieArea').classList.add("rotate");
    } else {
        leftSide.classList.add('disable')
        rightSide.classList.remove('disable');
        rightSide.getElementsByTagName('holdButton')[0].classList.remove('hide')
        leftSide.getElementsByTagName('holdButton')[0].classList.add('hide')
        document.getElementById('dieArea').classList.remove("rotate");
    }

    document.getElementById('playerRoll').textContent = `Player ${currentPlayer+1} click to roll`
}

hideShowOverlay = (state)=>{
    // use show or hide for state
    if (state === 'show') {
        overlay.classList.remove('remove');
    }
    else {
        overlay.classList.add('remove');
    }
    
}

displayDieFace =(value)=>{
    const faces = [ [false,false,false,false,true,false,false,false,false],
                    [true,false,false,false,false,false,false,false,true],
                    [true,false,false,false,true,false,false,false,true],
                    [true,false,true,false,false,false,true,false,true],
                    [true,false,true,false,true,false,true,false,true],
                    [true,false,true,true,false,true,true,false,true]]
    
    let currentface = faces[value-1];
   
    for (let i=0; i<9 ;i++)
    {
        if(currentface[i]){
            dieCircles[i].classList.remove('hide');
        } else {
            dieCircles[i].classList.add('hide');
        }
    }
    
}

