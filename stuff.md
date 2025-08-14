
do:  hang time, settings screen & apply settings function, music & sounds, red warning alert effect

next steps add code refactor to reduce repeating code


!!!!!WATCH OUT FOR
game.mode
game.dropRate
game.linesCleared
game.piecesPlaced
game.place
game.gameOver
INTERVALS START&CLEAR


///////////////////////////////////////////////

cache (settings)----------------

const ghostToggle = document.getElementById("ghost-toggle");
const shakeToggle = document.getElementById("shake-toggle");

event listeners------------------

ghostToggle.addEventListener("click", ghostToggleHandler);
shakeToggle.addEventListener("click", shakeToggleHandler);

functions-----------------------

//-----------------------------------------------------to be called when initHome
function applySettings() {
    ghostToggle.classList.add(`toggle-${settings.ghost}`);
    shakeToggle.classList.add(`toggle-${settings.screenShake}`);
}

//-----------------------------------------------------to see which works best
function ghostToggleHandler() {
    settings.ghost = !settings.ghost;
    ghostToggle.classlist.toggle("toggle-true");
    ghostToggle.classlist.toggle("toggle-false");
}

function shakeToggleHandler() {
    if (settings.screenShake == false) {
        shakeToggle.classlist.add("toggle-true");
        shakeToggle.classlist.remove("toggle-false");
    } else if (settings.screenShake == true) {
        shakeToggle.classlist.add("toggle-false");
        shakeToggle.classlist.remove("toggle-true");
    }
}
