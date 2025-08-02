// HOME PAGE -------------------------------------- HOME PAGE -------------------------------------- HOME PAGE
// HOME PAGE -------------------------------------- HOME PAGE -------------------------------------- HOME PAGE

///////////////// BUTTONS
const homeButtons = document.querySelectorAll(".home-buttons");
const playButton = document.querySelector("#play-button");
const settingsButton = document.querySelector("#settings-button");
const tutButton = document.querySelector("#tutorial-button");

playButton.addEventListener("click", playClickHandler)
settingsButton.addEventListener("click", settingsClickHandler)
tutButton.addEventListener("click", tutorialClickHandler)

function playClickHandler() {
}

function settingsClickHandler() {
}

function tutorialClickHandler() {
}

// PLAY PAGE -------------------------------------- PLAY PAGE -------------------------------------- PLAY PAGE
// PLAY PAGE -------------------------------------- PLAY PAGE -------------------------------------- PLAY PAGE

///////////////////////////////////////// DATA /////////////////////////////////////////
const pieces = {
    o: { pieceName: "o", color: "yellow",   piece:[ [1, 1], [1, 1], ],                                         },
    t: { pieceName: "t", color: "purple",   piece:[ [0, 1, 0], [1, 1, 1], [0, 0, 0], ],                        },
    j: { pieceName: "j", color: "blue",     piece:[ [1, 0, 0], [1, 1, 1], [0, 0, 0], ],                        },
    l: { pieceName: "l", color: "orange",   piece:[ [0, 0, 1], [1, 1, 1], [0, 0, 0], ],                        }, 
    z: { pieceName: "z", color: "red",      piece:[ [1, 1, 0], [0, 1, 1], [0, 0, 0], ],                        },
    s: { pieceName: "s", color: "green",    piece:[ [0, 1, 1], [1, 1, 0], [0, 0, 0], ],                        },
    i: { pieceName: "i", color: "cyan",     piece:[ [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], ], },
}
const pieceNames = Object.keys(pieces);
const player = {
    pieceName: "",
    piece: "",
    color: "",
    pos: 3,
}
const game = { 
    mode: "",
    dropRate: 300,
    place: false,
    linesToCheck: [],
    linesToClear: [],
    linesToMove: {},
    gameOver: false,
}
const holdP = {
    pieceName: "",
    piece: "",
    color: "",
};
const ghostPiece = {
    pos: "",
};

///////////////////////////////////////// INITIALISE BOXES /////////////////////////////////////////
let boxColor = "black";
let boxBorder = ".1px solid gray";
let allBoxes;

///////////////// GENERATE 240 BOXES (play grid)
function generateBoxes() {
    const gameArea = document.getElementById("game-area")
    for (let i = 0; i < 240; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        div.id = `boxID${i+1}`;
        div.style.background = boxColor;
        div.style.border = boxBorder;
        gameArea.appendChild(div);
    }
}
///////////////// CACHE allboxes
function cacheAllBoxes() {
    allBoxes = document.querySelectorAll(".box");
}
///////////////// HIDE FIRST 30 BOXES (spawn area)
///////////////// HIDE LAST 10 BOXES (bottom row, invisible)
function hideBoxes() {   
    for (let i = 0; i < 30; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
        allBoxes[i].classList.add("top");
    }
    for (let i = 230; i < 240; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
        allBoxes[i].classList.add("bottom");
    }
}

///////////////////////////////////////// LINEUP /////////////////////////////////////////
let lineUpQty = 5;
const nextLineUp = [];

///////////////// CREATE LINE UP LIST ACCORDING TO LINE UP QTY
function createLineUpList() {
    for (i=0; i<lineUpQty; i++) {
        nextLineUp.push({});
        nextLineUp[i].pieceName = "";
        nextLineUp[i].piece = "";
        nextLineUp[i].color = "";
    }
}
///////////////// GENERATE LINE UP PIECE (all)
function generateLineUp() {
    for (i=0; i<lineUpQty; i++) {
        nextLineUp[i] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
    }
    spawnLineUp();
}
///////////////// GENERATE LINE UP PIECE (one)
function generateNewPiece() {
    nextLineUp.push({})
    nextLineUp[lineUpQty-1] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
    spawnLineUp();
}


///////////////// DISPLAY LINEUP
function spawnLineUp() {
    const nextArea = document.getElementById("next-area");
    nextArea.innerHTML = "";  
  
    nextLineUp.forEach((nextPiece, index) => {
        const div = document.createElement("div");
        div.classList.add("line-up-indi");
        const pieceSize = nextPiece.piece.length;
        switch (pieceSize) {
            case 4:
                div.style.gridTemplateColumns = "repeat(4, 1fr)";
                div.style.width = "60%";
                break;
            case 3:
                div.style.gridTemplateColumns = "repeat(3, 1fr)";
                div.style.width = "45%";
                break;
            case 2:
                div.style.gridTemplateColumns = "repeat(2, 1fr)";
                div.style.width = "27%";
                break;
        }        
        nextLineUp[index].piece.forEach((row) => {
            if (row.includes(1)) {
                row.forEach((value) => {
                    const box = document.createElement("div");
                    box.classList.add("line-up-piece");
                    box.style.width = "100%";
                    box.style.aspectRatio = "1/1";
                    if (value === 1) {
                        box.classList.add("line-up-piece-filled");
                        box.style.background = nextPiece.color;
                        box.style.border = nextPiece.color;
                    }
                    div.appendChild(box)
                });
            }
        });
        nextArea.appendChild(div);
    });
}
///////////////// ASSIGN NEXT PIECE FROM LINEUP
function assignNextPiece() {    
    player.pieceName = nextLineUp[0].pieceName;
    player.piece = nextLineUp[0].piece;
    player.color = nextLineUp[0].color;
    nextLineUp.shift();
    generateNewPiece();
    // setTimeout(moveDown3, 10);
}

///////////////////////////////////////// HOLD /////////////////////////////////////////

///////////////// HOLD PIECE SWAP/STORE
function holdPiece() {
    if (holdP.color) {
        game.place = false;
        [player.pieceName, holdP.pieceName] = [holdP.pieceName, player.pieceName];
        [player.color, holdP.color] = [holdP.color, player.color];
        player.piece = pieces[player.pieceName].piece;
        holdP.piece = pieces[holdP.pieceName].piece;
        player.pos = 3;
        despawn();
        spawn(player.pos);
        // setTimeout(moveDown3, 10);
        startCheckBottomInterval();
        startDropInterval();
        startPlaceInterval();
    } else {
        game.place = false;
        holdP.pieceName = player.pieceName;
        holdP.piece = pieces[holdP.pieceName].piece;
        holdP.color = pieces[holdP.pieceName].color;
        respawn();
        startCheckBottomInterval();
        startDropInterval();
        startPlaceInterval();
    }
    spawnHold();
}
///////////////// DISPLAY HOLD PIECE
function spawnHold() {
    const holdArea = document.getElementById("hold-area");
    holdArea.innerHTML = "";  
    if (holdP.color) {
        const div = document.createElement("div");
        div.classList.add("hold-indi")
        const pieceSize = holdP.piece.length;
        switch (pieceSize) {
            case 4:
                div.style.gridTemplateColumns = "repeat(4, 1fr)";
                div.style.width = "60%";
                break;
            case 3:
                div.style.gridTemplateColumns = "repeat(3, 1fr)";
                div.style.width = "45%";
                break;
            case 2:
                div.style.gridTemplateColumns = "repeat(2, 1fr)";
                div.style.width = "27%";
                break;
        }
        holdP.piece.forEach((row) => {
            if (row.includes(1)) {
                row.forEach((value) => {
                    const box = document.createElement("div");
                    box.classList.add("hold-piece");
                    box.style.width = "100%";
                    box.style.aspectRatio = "1/1";
                    if (value === 1) {
                        box.classList.add("hold-piece-filled");
                        box.style.background = holdP.color;
                        box.style.border = holdP.color;
                    }
                    div.appendChild(box)
                });
            }
        });
        holdArea.appendChild(div);
    }
}

///////////////////////////////////////// PLAYER SPAWN /////////////////////////////////////////

///////////////// DESPAWN PLAYPIECES
function despawn() {
    const playPieces = document.querySelectorAll(".play-piece");
    playPieces.forEach((box) => {
        box.classList.remove("play-piece");
        if (box.classList.contains("top")) {
            box.style.background = "";
            box.style.border = "";
        } else {
            box.style.background = boxColor;
            box.style.border = boxBorder;
        }
    });
}
///////////////// SPAWN PLAYER AT TOP(used by place & hold)
function respawn() {
    despawn();
    assignNextPiece();
    player.pos = 3;
    spawn(player.pos);
}
///////////////// SPAWN PLAYER WITH POS
function spawn(pos) {
    despawn();
    despawnGhost();
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                allBoxes[(x+pos)+(y*10)].classList.add("play-piece"); 
                allBoxes[(x+pos)+(y*10)].classList.add("ghost-piece");
                allBoxes[(x+pos)+(y*10)].style.background = player.color;
                allBoxes[(x+pos)+(y*10)].style.border = `1px solid ${player.color}`;
            }
        })
    });
    spawnGhost();
}

///////////////////////////////////////// GHOST SPAWN /////////////////////////////////////////

///////////////// DESPAWN GHOST  
function despawnGhost() {
    const ghostPiece = document.querySelectorAll(".ghost-piece");
    ghostPiece.forEach((box) => {
        box.classList.remove("ghost-piece");
        box.style.boxShadow = "";
    });            
}
///////////////// SPAWN GHOST  
function spawnGhost() {
    const ghostPieces = document.querySelectorAll(".ghost-piece");
    let showGhost = false;
    let count = 0;
    while (!showGhost) {
        ghostPieces.forEach((box) => {
            if (allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("filled")) {
                    count -= 10;
                    ghostPiece.pos = count + player.pos;
                    player.piece.forEach((row, y) => {
                        row.forEach((value, x) => {
                            if (value !== 0) {
                                allBoxes[(x+player.pos)+(y*10)+count].classList.add("ghost-piece");            
                                allBoxes[(x+player.pos)+(y*10)+count].style.boxShadow = "inset 0 0 5px 10px rgba(255, 255, 255, 0.5)";
                            }
                        });
                    });
                    showGhost = true;
                    return;      
            }
        });
        count += 10;
    }        
}

///////////////////////////////////////// PLACE PLAYER PIECE /////////////////////////////////////////

///////////////// PLACE BLOCK 
function place() {
    if (game.place){
        fill();
        checkGameOver();
        if (!game.gameOver) {
            game.place = false;
            respawn();
        }
    }
}
///////////////// FILL
function fill() {
    const playPieces = document.querySelectorAll(".play-piece");
    playPieces.forEach((boxToFill) => {
        boxToFill.classList.add("filled");
        boxToFill.classList.add("check-line-clear");
        boxToFill.style.background = `${player.color}`;
        boxToFill.classList.remove("play-piece");
    });
    checkLineCLear();
}

///////////////////////////////////////// CHECKS /////////////////////////////////////////

///////////////// CHECK GAMEOVER (if placed in spawn area)
function checkGameOver() {
    const topBoxes = document.querySelectorAll(".top");
    topBoxes.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))-1].classList.contains("top") &&
            allBoxes[parseInt(box.id.slice(5))-1].classList.contains("filled")) {
            console.log("GAME OVER");
            game.gameOver = true;
            return;
        }
    });
}
///////////////// CHECK LINE CLEAR
function checkLineCLear() {
    
    const checkPieces = document.querySelectorAll(".check-line-clear");

    //add (uniquely) each line start number to linesToCheck array after filled
    checkPieces.forEach((box) => {
        const lineStart = Math.floor((parseInt(box.id.slice(5))-1)/10)*10; //formula gets line start number, e.g. 120, 130, 140
        if (!game.linesToCheck.includes(lineStart)) {
            game.linesToCheck.push(lineStart);
        }
        box.classList.remove("check-line-clear"); //remove class
    })

    //check each line in linesToCheck if fully filled, if so, push to lineToClear
    game.linesToCheck.forEach((line) => {
        let gap = false;
        for (i=0; i<10; i++) {
            if (!allBoxes[line+i].classList.contains("filled")) {
                gap = true;
                break;
            }
        }
        if (!gap) {
            game.linesToClear.push(line);
        } 
    })
    game.linesToCheck.length = 0;

    //if linesToClear truthy, proceed to clearLines()
    if (game.linesToClear.length > 0) {
        clearLines();    
    }
}
/////////////////CHECK BOTTOM (if block below player obstructed)
function checkBottom() {
    const playPieces = document.querySelectorAll(".play-piece");
    playPieces.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
            game.place = true;       
        }
    });
}

///////////////////////////////////////// LINE CLEAR AND MOVE /////////////////////////////////////////

///////////////// CLEAR LINES
function clearLines() { // from checkLineClear()
    game.linesToClear.forEach((line) => {
        //add 1 row (10) for each line to clear below
        for (i=line-10; i>20; i-= 10) {
            if (!game.linesToMove[i]) {
                game.linesToMove[i] = {toMove: 0}; 
            }
            game.linesToMove[i].toMove += 10;
        }
        //clear the line
        for (i=0; i<10; i++) {
            const boxIndex = line + i;
            allBoxes[boxIndex].classList.remove("filled");  
            allBoxes[boxIndex].style.backgroundColor = boxColor; //todo: add to game data
            allBoxes[boxIndex].style.border = boxBorder; //todo: add to game data
        }
    });
    game.linesToClear.length = 0; //reset lineToClear
    if (game.linesToMove) {
        moveLines(); //move lines down to fill up cleared rows
    }
}

///////////////// MOVE LINES
function moveLines() {
    const sorted = Object.entries(game.linesToMove).sort(([a], [b]) => Number(b) - Number(a));
    Object.entries(sorted).forEach(([line, value]) => {
        const toMoveValue = value[1].toMove;
        for (i=0; i<10; i++) {
            const boxIndex = Number(value[0]) + i;
            const newBoxIndex = boxIndex + toMoveValue;
            const styles = window.getComputedStyle(allBoxes[boxIndex]);
            const backgroundColor = styles.backgroundColor;
            const border = styles.border;
            const wasFilled = allBoxes[boxIndex].classList.contains("filled");
            //despawn rows to move
            allBoxes[boxIndex].classList.remove("filled");
            allBoxes[boxIndex].style.backgroundColor = boxColor; //todo: add to game data
            allBoxes[boxIndex].style.border = boxBorder; //todo: add to game data
            //move rows down
            //may not need the if loop
            if (!wasFilled) {
                allBoxes[newBoxIndex].style.backgroundColor = boxColor; //todo: add to game data
                allBoxes[newBoxIndex].style.border = boxBorder; //todo: add to game data
            } else {
                allBoxes[newBoxIndex].classList.add("filled");
                allBoxes[newBoxIndex].style.backgroundColor = backgroundColor;
                allBoxes[newBoxIndex].style.border = border;
            }
        }
    });
    game.linesToMove = {};
}

///////////////////////////////////////// PLAYER ACTIONS /////////////////////////////////////////

function moveDown3() {
    const playPieces = document.querySelectorAll(".play-piece");
    playPieces.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
            game.place = true;       
        }
    });           
    if (!game.place) {
        player.pos += 10;
        despawn();
        spawn(player.pos);
        game.place = false;
        startDropInterval();
        startPlaceInterval();
        startCheckBottomInterval();
        return;
    }
}

function moveRight() {
    const playPiece = document.querySelectorAll(".play-piece");
    
    let blocked = false;
    
    //check if piece @ rightmost border
    playPiece.forEach((box) => {
        if (parseInt(box.id.slice(5))%10 == 0) {
            blocked = true;
            return;
        }
    });
    //check if piece blocked by placed box right
    playPiece.forEach((box) => {
        if (
            allBoxes[parseInt(box.id.slice(5))].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))].classList.contains("filled")) {
            blocked = true;       
        }
    });
    //if not blocked, move right
    if (!blocked) {
        player.pos += 1;
        despawn();
        spawn(player.pos);
        game.place = false;
        startDropInterval();
        startCheckBottomInterval();
    }
}

function moveLeft() {
    let blocked = false;
    const playPiece = document.querySelectorAll(".play-piece");
    
    //check if piece @ leftmost border
    playPiece.forEach((box) => {
        if ((parseInt(box.id.slice(5))-1)%10 == 0 ||
            parseInt(box.id.slice(5) === 1)) {
            blocked = true;
            return;
        }
    });
    //check if piece blocked by placed box left
    playPiece.forEach((box) => {
        if (
            allBoxes[parseInt(box.id.slice(5))-2].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))-2].classList.contains("filled")) {
            blocked = true;       
        }
    });
    //if not blocked, move left
    if (!blocked) {
        player.pos -= 1;
        despawn();
        spawn(player.pos);
        game.place = false;
        startDropInterval();
        startCheckBottomInterval();
    }
}

function hardDrop() {
    player.pos = ghostPiece.pos;
    spawn(player.pos);
    game.place = true;
    place();
}

function rotateRight2() {
const oldMatrix = player.piece;
    const rotated = oldMatrix[0].map((_, colIndex) => oldMatrix.map(row => row[colIndex])).map(row => row.reverse());
    const kicks = [ 
        { x: 0, y: 0 },   
        { x: -1, y: 0 },  
        { x: 1, y: 0 },   
        { x: 0, y: -1 },  
        { x: -1, y: -1 }, 
        { x: 1, y: -1 },  
    ];
    for (let kick of kicks) {
        let open = true;
        let left = false;
        let right = false;
        for (let y = 0; y < rotated.length; y++) {
            for (let x = 0; x < rotated[y].length; x++) {
                if (rotated[y][x] !== 0) {
                    let newX = x + player.pos + kick.x;
                    let newY = y + kick.y;
                    let index = newX + newY * 10;
                    //single box collision check
                    if ( 
                        allBoxes[index].classList.contains("filled") ||
                        allBoxes[index].classList.contains("bottom") ||
                        index >= 230 
                    ) {
                        open = false;
                        break;
                    }
                    //left right border check
                    if (index%10 === 0) {left = true}
                    if (index%10 === 9) {right = true}
                }
            }
            if (!open) {
                break;
            }
        }
        if (open && !(left && right)) {
            player.piece = rotated;
            player.pos += kick.x + (kick.y*10);
            break;
        }
    }
    game.place = false;
    spawn(player.pos);
    // startDropInterval();
    startCheckBottomInterval();
    startPlaceInterval();
}

function rotateLeft() {
    const oldMatrix = player.piece;
    const rotated = oldMatrix[0].map((_, colIndex) => 
        oldMatrix.map(row => row[colIndex])).reverse();
    const kicks = [ 
        { x: 0, y: 0 },   
        { x: -1, y: 0 },  
        { x: 1, y: 0 },   
        { x: 0, y: -1 },  
        { x: -1, y: -1 }, 
        { x: 1, y: -1 },  
    ];
    for (let kick of kicks) {
        let open = true;
        let left = false;
        let right = false;
        for (let y = 0; y < rotated.length; y++) {
            for (let x = 0; x < rotated[y].length; x++) {
                if (rotated[y][x] !== 0) {
                    let newX = x + player.pos + kick.x;
                    let newY = y + kick.y;
                    let index = newX + newY * 10;
                    //single box collision check
                    if ( 
                        allBoxes[index].classList.contains("filled") ||
                        allBoxes[index].classList.contains("bottom") ||
                        index >= 230
                    ) {
                        open = false;
                        break;
                    }
                    //left right border check
                    if (index%10 === 0) {left = true}
                    if (index%10 === 9) {right = true}
                }
            }
            if (!open) {
                break;
            }
        }
        if (open && !(left && right)) {
            player.piece = rotated;
            player.pos += kick.x + (kick.y*10);
            break;
        }
    }
    game.place = false;
    spawn(player.pos);
    // startDropInterval();
    startCheckBottomInterval();
    startPlaceInterval();
}

///////////////////////////////////////// KEYBIND EVENTLISTENER /////////////////////////////////////////
let keyIntervals = {};
document.addEventListener("keydown", (event) => {
    if (!game.gameOver) {
        if (keyIntervals[event.key]) return;
        switch (event.key) {
            case "ArrowDown":
                moveDown3();
                keyIntervals.ArrowDown = setInterval(moveDown3, 100);
                break;
            case "ArrowRight":
                moveRight();
                keyIntervals.ArrowRight = setInterval(moveRight, 100);
                break;
            case "ArrowLeft":
                moveLeft();
                keyIntervals.ArrowLeft = setInterval(moveLeft, 100);
                break;

            case " ":
            case "Spacebar":
            case "Space":
                hardDrop();
                break;

            case "ArrowUp":
            case "v":
            case "V":
                rotateRight2();
                break;

            case "x":
            case "X":               
                rotateLeft();
                break;

            case "c":
            case "C":
                holdPiece();
                break;
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (keyIntervals[event.key]) {
        clearInterval(keyIntervals[event.key]);
        delete keyIntervals[event.key];
    }
});

///////////////////////////////////////// INTERVALS /////////////////////////////////////////

let dropInterval;
let checkBottomInterval;
let placeInterval;

function startDropInterval() {
    clearInterval(dropInterval);
    dropInterval = setInterval(moveDown3, game.dropRate);
}

function startCheckBottomInterval() {
    clearInterval(checkBottomInterval);
    checkBottomInterval = setInterval(checkBottom, 100);
}

function startPlaceInterval() {
    clearInterval(placeInterval);
    placeInterval = setInterval(place, 300);
}

///////////////////////////////////////// INITIAL FUNCTION CALLS /////////////////////////////////////////

//TO MOVE TO INIT

generateBoxes();
cacheAllBoxes();
hideBoxes();
createLineUpList();
generateLineUp();
spawnLineUp();


//GAME START
assignNextPiece();
startCheckBottomInterval();
startDropInterval();
startPlaceInterval();


// CSS STYLINGS -------------------------------------- CSS STYLINGS -------------------------------------- CSS STYLINGS

///////////////////////////////////////// TEXT AUTO RESIZE /////////////////////////////////////////

const mainBlockDiv = document.getElementById("main-block");
const resizeObserver = new ResizeObserver(entries => {
    const h1 = document.querySelectorAll("h1");
    const h2 = document.querySelectorAll("h2");
    const h3 = document.querySelectorAll("h3");
    const h4 = document.querySelectorAll("h4");
    const p = document.querySelectorAll("p");
    const statSmall = document.querySelectorAll(".stat-small");
    const width = entries[0].contentRect.width;
    h1.forEach(el => {
        el.style.fontSize = (width / 10) + "px";
    });
    h2.forEach(el => {
        el.style.fontSize = (width / 20) + "px";
    });
    h3.forEach(el => {
        el.style.fontSize = (width / 30) + "px";
    });
    h4.forEach(el => {
        el.style.fontSize = (width / 40) + "px";
    });
    p.forEach(el => {
        el.style.fontSize = (width / 50) + "px";
    });
    statSmall.forEach(el => {
        el.style.fontSize = (width / 50) + "px";
    });
});
resizeObserver.observe(mainBlockDiv);


