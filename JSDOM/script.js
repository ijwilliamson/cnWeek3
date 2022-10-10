
//Activity one.

btnControlMoon.addEventListener('click', () => {
    const moonImage = document.getElementById('moon');
    console.log(moonImage.style.display)
    if (moonImage.style.display == 'inline' || moonImage.style.display == '')
     {
        btnControlMoon.textContent = "Show the moon"
        moonImage.style.display = 'none';
    } else {
        btnControlMoon.textContent = "Hide the moon"
        moonImage.style.display = 'inline';
    }
} )

//Activity two.

btnUrlInput.addEventListener('click', () => {
    const changableImage = document.getElementById('imgActTwo');
    const urlInput = document.getElementById('inputUrl');
    changableImage.src = urlInput.value
})

//Activity three.
btnColorChange.addEventListener('click', () => {
    const header = document.getElementById('hActThree');
    const colorInput = document.getElementById('inputHeadingColour');
    console.log(colorInput);
    header.style.color = colorInput.value;
})

//Activity four.
document.addEventListener('click', (args) =>
{
   
    posResult.innerHTML = `Click coordinates: X=${args.clientX} | Y=${args.clientY}` ;
})

//Extra.
document.addEventListener('mousemove', (args) => {
   
    document.getElementById('vLine').style.left = `${args.clientX-1}px`;
    document.getElementById('hLine').style.top = `${args.clientY-1}px`;
})

let xHair = false;
const xBtn = document.getElementById('btnX');
xBtn.addEventListener('click', () => {
    if (!xHair){
        document.getElementById('vLine').className = 'vLine';
        document.getElementById('hLine').className = 'hLine';

        document.body.className = 'hideCursor';

        xBtn.textContent = "Hide Crosshair";
    } else {
        document.getElementById('vLine').className = '';
        document.getElementById('hLine').className = '';
        document.body.className = '';
        xBtn.textContent = "Show Crosshair";
    }
    xHair = !xHair;
});