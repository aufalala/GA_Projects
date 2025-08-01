

//############### INITIALISE BOXES (PLAY AREA) //############### INITIALISE BOXES (PLAY AREA)
//############### INITIALISE BOXES (PLAY AREA) //############### INITIALISE BOXES (PLAY AREA)

/////////////////GENERATE 240 BOXES /////////////////GENERATE 240 BOXES /////////////////GENERATE 240 BOXES
let boxColor = "black";
let boxBorder = ".1px solid gray";
let allBoxes;

function generateBoxes() {
    const gameArea = document.getElementById("game-area")
    for (let i = 0; i < 240; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        div.id = `boxID${i+1}`;
        div.style.background = boxColor;
        div.style.border = boxBorder;
        // div.textContent = `${i + 1}`;
        gameArea.appendChild(div);
    }
}

function cacheAllBoxes() {
    allBoxes = document.querySelectorAll(".box");
}

// const allBoxes = document.querySelectorAll(".box");


/////////////////HIDE FIRST 30 BOXES /////////////////HIDE FIRST 30 BOXES /////////////////HIDE FIRST 30 BOXES
function hideBoxes() {
    //const allBoxes = document.querySelectorAll(".box");
    for (let i = 0; i < 30; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
        allBoxes[i].classList.add("top");
    }
/////////////////HIDE LAST 10 BOXES /////////////////HIDE LAST 10 BOXES /////////////////HIDE LAST 10 BOXES
    for (let i = 230; i < 240; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
        allBoxes[i].classList.add("bottom");
    }
}

//############### DATA //############### DATA //############### DATA //############### DATA
//############### DATA //############### DATA //############### DATA //############### DATA

/////////////////PIECES DATA /////////////////PIECES DATA /////////////////PIECES DATA 
const pieces = {
    o: { color: "yellow",   piece:[ [1, 1], [1, 1], ],                                         },
    t: { color: "purple",   piece:[ [0, 1, 0], [1, 1, 1], [0, 0, 0], ],                        },
    j: { color: "blue",     piece:[ [1, 0, 0], [1, 1, 1], [0, 0, 0], ],                        },
    l: { color: "orange",   piece:[ [0, 0, 1], [1, 1, 1], [0, 0, 0], ],                        }, 
    z: { color: "red",      piece:[ [1, 1, 0], [0, 1, 1], [0, 0, 0], ],                        },
    s: { color: "green",    piece:[ [0, 1, 1], [1, 1, 0], [0, 0, 0], ],                        },
    i: { color: "cyan",     piece:[ [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], ], },
}
const pieceNames = Object.keys(pieces);

/////////////////PLAYER DATA /////////////////PLAYER DATA /////////////////PLAYER DATA
const player = {
    piece: "",
    color: "",
    pos: 3,
}

/////////////////GAME DATA /////////////////GAME DATA /////////////////GAME DATA
const game = { 
    dropRate: 300,
    place: false,
    linesToCheck: [],
    linesToClear: [],
    linesToMove: {},
    gameOver: false,
}

/////////////////HOLDPIECE DATA /////////////////HOLDPIECE DATA /////////////////HOLDPIECE DATA
const holdP = {
    piece: "",
    color: "",
};

/////////////////GHOSTPIECE DATA /////////////////GHOSTPIECE DATA /////////////////GHOSTPIECE DATA 
const ghostPiece = {
    pos: "",
};


//############### Functions //############### Functions //############### Functions 
//############### Functions //############### Functions //############### Functions






/////////////////CREATE LINE UP LIST ACCORDING TO LINE UP QTY /////////////////CREATE LINE UP LIST ACCORDING TO LINE UP QTY

let lineUpQty = 5;
const nextLineUp = [];

function createLineUpList() {
    for (i=0; i<lineUpQty; i++) {
        nextLineUp.push({});
        nextLineUp[i].piece = "";
        nextLineUp[i].color = "";
    }
}

/////////////////GENERATE LINE UP /////////////////GENERATE LINE UP /////////////////GENERATE LINE UP

function generateLineUp() {
    for (i=0; i<lineUpQty; i++) {
        nextLineUp[i] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
    }
    spawnLineUp();
}

function generateNewPiece() {
    nextLineUp.push({})
    nextLineUp[lineUpQty-1] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
    spawnLineUp();
}


/////////////////////////////////////////
function spawnLineUp() {
    const nextArea = document.getElementById("next-area"); //maybe can cache outside?
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


function spawnHold() {
    const holdArea = document.getElementById("hold-area"); //maybe can cache outside?
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


/////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT
function assignNextPiece() {
    player.piece = nextLineUp[0].piece;
    player.color = nextLineUp[0].color;
    nextLineUp.shift();
    generateNewPiece();
}

/////////////////HOLD FUNCTION /////////////////HOLD FUNCTION /////////////////HOLD FUNCTION /////////////////HOLD FUNCTION 
function holdPiece() {
    if (holdP.color) {
        [player.piece, holdP.piece] = [holdP.piece, player.piece];
        [player.color, holdP.color] = [holdP.color, player.color];
        player.pos = 3;
        despawn();
        spawn(player.pos);
        startCheckBottomInterval();
        startDropInterval();
        startPlaceInterval();
    } else {
        holdP.piece = player.piece;
        holdP.color = player.color;
        respawn();
        startCheckBottomInterval();
        startDropInterval();
        startPlaceInterval();
    }
    spawnHold();
}

/////////////////SPAWN PLAYPIECE FUNCTION /////////////////SPAWN PLAYPIECE FUNCTION /////////////////SPAWN PLAYPIECE FUNCTION 
function respawn() {
    despawn();
    assignNextPiece();
    player.pos = 3;
    spawn(player.pos);
}

function spawn(pos) {
    despawn();
    despawnGhost();
    //const allBoxes = document.querySelectorAll(".box");
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

    // insert spawn interval boost here to "flash" moveDown
}

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


//############### GHOST FUNCTIONS //############### GHOST FUNCTIONS //############### GHOST FUNCTIONS 
//############### GHOST FUNCTIONS //############### GHOST FUNCTIONS //############### GHOST FUNCTIONS 

/////////////////DESPAWN GHOST /////////////////DESPAWN GHOST /////////////////DESPAWN GHOST  
function despawnGhost() {
    const ghostPiece = document.querySelectorAll(".ghost-piece");
    ghostPiece.forEach((box) => {
        box.classList.remove("ghost-piece");
        box.style.boxShadow = "";
    });            
}

/////////////////SPAWN GHOST /////////////////SPAWN GHOST /////////////////SPAWN GHOST  
function spawnGhost() {
    const ghostPieces = document.querySelectorAll(".ghost-piece");
    //const allBoxes = document.querySelectorAll(".box");
    let showGhost = false;
    let count = 0;
    while (!showGhost) {
        ghostPieces.forEach((box) => {
            if (allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("filled")) {
                    count -= 10;
                    ghostPiece.pos = count + player.pos - 10;
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

/////////////////PLACE BLOCK /////////////////PLACE BLOCK /////////////////PLACE BLOCK 
function place() {
    if (game.place){
        fill();
        checkGameOver();
        // const topBoxes = document.querySelectorAll(".top");
        // //const allBoxes = document.querySelectorAll(".box");
        // topBoxes.forEach((box) => {
        //     if (allBoxes[parseInt(box.id.slice(5))-1].classList.contains("top") &&
        //         allBoxes[parseInt(box.id.slice(5))-1].classList.contains("filled")) {
        //         console.log("GAME OVER");
        //         game.gameOver = true;
        //         return;
        //     }
        // });
        if (!game.gameOver) {
            game.place = false;
            respawn();
        }
    }
}

function checkGameOver() {
    const topBoxes = document.querySelectorAll(".top");
    //const allBoxes = document.querySelectorAll(".box");
    topBoxes.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))-1].classList.contains("top") &&
            allBoxes[parseInt(box.id.slice(5))-1].classList.contains("filled")) {
            console.log("GAME OVER");
            game.gameOver = true;
            return;
        }
    });
}

/////////////////CHECK BOTTOM /////////////////CHECK BOTTOM /////////////////CHECK BOTTOM 
function checkBottom() {
    const playPieces = document.querySelectorAll(".play-piece");
    //const allBoxes = document.querySelectorAll(".box");
    playPieces.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
            game.place = true;       
        }
    });
}

/////////////////FILL /////////////////FILL /////////////////FILL /////////////////FILL 
function fill() {
    const playPieces = document.querySelectorAll(".play-piece");
    playPieces.forEach((boxToFill) => {
        boxToFill.classList.add("filled");
        boxToFill.classList.add("check-line-clear");
        boxToFill.style.background = `${player.color}`;
        console.log(`filled added ${boxToFill.id}`);
        boxToFill.classList.remove("play-piece");
    });
    checkLineCLear();
}
/////////////////CHECK LINE CLEAR /////////////////CHECK LINE CLEAR /////////////////CHECK LINE CLEAR
function checkLineCLear() {
    //const allBoxes = document.querySelectorAll(".box");
    const checkPieces = document.querySelectorAll(".check-line-clear");

    //add (uniquely) each line start number to linesToCheck array after filled
    checkPieces.forEach((box) => {
        const lineStart = Math.floor((parseInt(box.id.slice(5))-1)/10)*10; //formula gets line start number, e.g. 120, 130, 140
        console.log(lineStart);
        if (!game.linesToCheck.includes(lineStart)) {
            game.linesToCheck.push(lineStart);
        }
        box.classList.remove("check-line-clear"); //remove class
    })
    console.log(game.linesToCheck);

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
        console.log(game.linesToClear)
        console.log("-------------")
        clearLines();    
    }
}

/////////////////CLEAR LINES /////////////////CLEAR LINES /////////////////CLEAR LINES /////////////////CLEAR LINES 
function clearLines() {
    //const allBoxes = document.querySelectorAll(".box");
    
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

/////////////////MOVE LINES /////////////////MOVE LINES /////////////////MOVE LINES /////////////////MOVE LINES 


//TODO: FIX THE BOTTOM 240 LINE BUG
function moveLines() {
    //const allBoxes = document.querySelectorAll(".box");
    
    const sorted = Object.entries(game.linesToMove).sort(([a], [b]) => Number(b) - Number(a));
    console.log(sorted)
    Object.entries(sorted).forEach(([line, value]) => {
        console.log(value[0]+"/////////");
        console.log(value[1].toMove)
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
            
            // may not need the if loop
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
    console.log(game.linesToMove);
}




//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS 
//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS

function moveDown3() {
    const playPieces = document.querySelectorAll(".play-piece");
    //const allBoxes = document.querySelectorAll(".box");

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
    //const allBoxes = document.querySelectorAll(".box");
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
    //const allBoxes = document.querySelectorAll(".box");
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
    spawn(player.pos+10);
    game.place = true;
    place();
}

function rotateRight() {
    const playPiece = document.querySelectorAll(".play-piece");
    //const allBoxes = document.querySelectorAll(".box");

    const oldMatrix = player.piece;
    let blocked = false;

    const newMatrix = oldMatrix[0].map((_, colIndex) => 
        oldMatrix.map(row => row[colIndex])).map(row => row.reverse());

    newMatrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0 && blocked === false) {
                const newPos = (x+player.pos)+(y*10); 

                if (allBoxes[newPos].classList.contains("filled") ||         //prevent rotation taking up filled/bottom box
                    allBoxes[newPos].classList.contains("bottom") ||

                    ((parseInt(allBoxes[newPos].id.slice(5))-1)%10 == 0 ||   //prevent rotation clipping between left and right border
                    parseInt(allBoxes[newPos].id.slice(5) === 1) && 
                    (parseInt(allBoxes[newPos].id.slice(5))%10 == 0))  
                ) {
                        blocked = true;
                }
            }
        });
    });
    
    if (!blocked) {
        player.piece = newMatrix;
        spawn(player.pos);
        startDropInterval();
        startCheckBottomInterval();
        startPlaceInterval();
    }
}

    function rotateRight2() {
    //const allBoxes = document.querySelectorAll(".box");

    const oldMatrix = player.piece;
    const rotated = oldMatrix[0].map((_, colIndex) => 
        oldMatrix.map(row => row[colIndex])).map(row => row.reverse());

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

        for (let y = 0; y < rotated.length; y++) {
            for (let x = 0; x < rotated[y].length; x++) {
                if (rotated[y][x] !== 0) {
                    let newX = x + player.pos + kick.x;
                    let newY = y + kick.y;
                    let index = newX + newY * 10;
                    // console.log(index);

                    if ( 
                        allBoxes[index].classList.contains("filled") ||
                        allBoxes[index].classList.contains("bottom") ||
                        index >= 230                            
                        ||
                        ((parseInt(allBoxes[index].id.slice(5))-1)%10 == 0 ||
                        parseInt(allBoxes[index].id.slice(5) === 1) && 
                        (parseInt(allBoxes[index].id.slice(5))%10 == 0)) 
                    ) {
                        open = false;
                        break;
                    }
                }
            }
            if (!open) {
                break;
            }
        }

        if (open) {
            player.piece = rotated;
            player.pos += kick.x + (kick.y*10);
            break;
        }
    }
    spawn(player.pos);
    game.place = false;
    // startDropInterval();
    startCheckBottomInterval();
    startPlaceInterval();
}

function rotateLeft() {

}



//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS
//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS


let keyIntervals = {};

document.addEventListener("keydown", (event) => {
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
            rotateRight2();
            break;

        case "c":
        case "C":
            holdPiece();
            break;
    }
});

document.addEventListener("keyup", (event) => {
    if (keyIntervals[event.key]) {
        clearInterval(keyIntervals[event.key]);
        delete keyIntervals[event.key];
    }
});


//############### INTERVALS //############### INTERVALS  //############### INTERVALS  //############### INTERVALS 
//############### INTERVALS //############### INTERVALS  //############### INTERVALS  //############### INTERVALS 

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
    placeInterval = setInterval(place, game.dropRate*2);
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

generateBoxes();
cacheAllBoxes();
hideBoxes();
createLineUpList();
generateLineUp();
assignNextPiece();

spawnLineUp();

startCheckBottomInterval();
startDropInterval();
startPlaceInterval();



/////////////////TEXT RESIZE /////////////////TEXT RESIZE /////////////////TEXT RESIZE

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


