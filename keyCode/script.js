document.addEventListener('keypress',(args) => {
    const kKey = document.getElementById('kKey');
    const kCode = document.getElementById('kCode');
    const kKeyCode = document.getElementById('kKeyCode');
    const kAlt = document.getElementById('kAlt');
    const kShift = document.getElementById('kShift');
    const kCtrl = document.getElementById('kCtrl');

    kKey.textContent = args.key;
    kCode.textContent = args.code;
    kKeyCode.textContent = args.keyCode;
    kAlt.textContent = args.altKey;
    kShift.textContent = args.shiftKey;
    kCtrl.textContent = args.ctrlKey;
    
    const codeArea = document.getElementsByTagName('codeArea')[0]
    codeArea.innerHTML = args.key;
    
    console.log(args);
})