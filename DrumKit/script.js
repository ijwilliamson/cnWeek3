
//Drum Kit Scripts
//------------------

//Build Drum Array
const drums = Array(7).fill(null);
for (let i = 0; i < drums.length; i++){
    drums[i] = document.getElementById(`Drum${i+1}`);
}

//Add click event to each drum

drums.forEach((drum) => {
    drum.addEventListener('click', ()=>{
        let compiledSound = `sound${drum.id.substring(4)}`;
        document.getElementById(compiledSound).play();
    })
})



