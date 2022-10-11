
//Drum Kit Scripts
//------------------

//Build Drum Array
const drums = Array(8).fill(null);
for (let i = 0; i < drums.length; i++){
    drums[i] = document.getElementById(`Drum${i+1}`);
}

//Add click event to each drum

drums.forEach((drum) => {
    drum.addEventListener('click', ()=>{
        playSound(drum.id.substring(4));
    })
})


// Handle key presses
const keys = ["A", "S", "D", "F", "G", "H","J","K","L"];

document.addEventListener('keypress',(args) => {
    const keytoCheck = args.key.toString().toUpperCase();
    if ( keys.includes(keytoCheck ))
    {
       const sound = keys.indexOf(keytoCheck)+1;
       playSound(sound);
    }
})


// Play a sound using the soundId (1 - 9)
playSound =(soundId) => {
    let compiledSound = `sound${soundId}`;
    soundElement = document.getElementById(compiledSound);
    soundElement.pause();
    soundElement.currentTime=0;
    soundElement.play(); 
}
