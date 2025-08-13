
///////////////////////////////////////// DATA / STATUSES /////////////////////////////////////////

//pieces
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

//settings
const settings = {
    screenShake: true,
    ghost: true,
}

//player
const player = {
    pieceName: "",
    piece: "",
    color: "",
    pos: 3,
}

//game
const game = { 
    mode: "",
    running: false,
    dropRate: 300,
    initialDropRate: 300,
    holdAntiSpam: false,
    place: false,
    linesToCheck: [],
    linesToClear: [],
    linesToMove: {},
    gameOver: false,
    linesCleared: 0,
    piecesPlaced: 0,
}

//end screen
const end = {
    message: "",
    lines: 0,
    time: "",
}

//hold piece
const holdP = {
    pieceName: "",
    piece: "",
    color: "",
};

//ghost piece
const ghostPiece = {
    pos: "",
};

//initialise boxes
let boxColor = "black";
let boxBorder = ".1px solid gray";
let allBoxes;

//lineup
let lineUpQty = 5;
const nextLineUp = [];

//intervals
let dropInterval;
let checkBottomInterval;
let placeInterval;

//timer
let timerRunning = false;
let startTime;
let updateTime;
let elapsed;


///////////////////////////////////////// CACHE /////////////////////////////////////////

const body = document.querySelector("body");
const bigDiv = document.getElementById("big-div");

///////////////// HOME PAGE
const homePage = document.getElementById("home-page");
//home buttons
const homeButtons = document.querySelectorAll(".home-buttons");
const playButton = document.getElementById("play-button");
const settingsButton = document.getElementById("settings-button");
const tutButton = document.getElementById("tutorial-button");
//play child buttons
const playChildButtons = document.querySelectorAll(".play-child-buttons");
const fortyButton = document.getElementById("forty-button");
const marathonButton = document.getElementById("marathon-button");
const playChildBackButton = document.getElementById("play-child-back");
//tutorial
const tutScreen = document.getElementById("tutorial-screen");
const tutBackButton = document.getElementById("tutorial-back")
// const playMode = document.querySelector("#play-mode");

///////////////// PLAY PAGE
const playPage = document.getElementById("play-page");
const mainBlock = document.getElementById("main-block");
//white ui
const whitePartsDiv = document.querySelectorAll(".white-parts-div");
const whitePartsText = document.querySelectorAll(".white-parts-text");
//stats
const stat1Big = document.getElementById("stat-1-big");
const stat1Small = document.getElementById("stat-1-small");
const stat2Big = document.getElementById("stat-2-big");
const stat3Big = document.getElementById("stat-3-big");
const stat3Small = document.getElementById("stat-3-small");
//countdown
const countdownScreen = document.getElementById("countdown-screen");
const countdownMessageDiv = document.getElementById("countdown-message-div");
const countdownMessage = document.getElementById("countdown-message");
//end screen
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("game-result-message");
const endTime = document.getElementById("game-result-time");
const endLines = document.getElementById("game-result-line");
//end buttons
const endReturn = document.getElementById("end-return")
const endAnother = document.getElementById("end-another")


// HOME PAGE -------------------------------------- HOME PAGE -------------------------------------- HOME PAGE
// HOME PAGE -------------------------------------- HOME PAGE -------------------------------------- HOME PAGE

//initial show page and button ----------------------- MOVE THIS SOMEWHERE
setTimeout(() => {
    homePage.classList.add("show");
}, 700);
setTimeout(() => {
    homeButtons.forEach((button) => {
        button.classList.add("button-show");
    });
}, 1000);

///////////////////////////////////////// BUTTON CLICK HANDLERS /////////////////////////////////////////

///////////////// HOME PAGE
playButton.addEventListener("click", playClickHandler);
settingsButton.addEventListener("click", settingsClickHandler);
tutButton.addEventListener("click", tutorialClickHandler);

fortyButton.addEventListener("click", fortyClickHandler);
marathonButton.addEventListener("click", marathonClickHandler);
playChildBackButton.addEventListener("click", playChildBackHandler);

tutBackButton.addEventListener("click", tutorialBackHandler);

///////////////// PLAY PAGE
endReturn.addEventListener("click", endReturnHandler);
endAnother.addEventListener("click", endAnotherHandler);

///////////////////////////////////////// CLICK HANDLER FUNCTIONS /////////////////////////////////////////


///////////////// HOME PAGE
function playClickHandler() {
    hideHomeButtons();
    //show play child
    setTimeout(() => {
        //show play child buttons
        playChildButtons.forEach((button) => {
            button.classList.remove("button-hide");
        });
        requestAnimationFrame(() => {
            playChildButtons.forEach((button) => {
                button.classList.add("button-show");
            }); 
        });
        //show play-child-back-button
        playChildBackButton.classList.remove("hide");
        setTimeout(() => {
            playChildBackButton.classList.add("show");
        }, 500);
    }, 200);
}
function fortyClickHandler() {
    game.mode = "forty";
    hideNavToInitGame();
}
function marathonClickHandler() {
    game.mode = "marathon";
    hideNavToInitGame();
}
function playChildBackHandler() {
    hidePlayChildButtons();
    showHomeButtons();
}
function settingsClickHandler() { //------------------------------------------------
}
function tutorialClickHandler() {
    hideHomeButtons();
    
    tutScreen.classList.remove("hide");
    setTimeout(() => {
        tutScreen.classList.add("show");
    }, 500)

    
    //show tutorial-back-button
    tutBackButton.classList.remove("hide");
    setTimeout(() => {
        tutBackButton.classList.add("show");
    }, 1000);
}

function tutorialBackHandler() {
    //hide tut screen
    tutScreen.classList.remove("show");
    setTimeout(() => {
        tutScreen.classList.add("hide")    
    }, 200);

    //hide tut back button
    tutBackButton.classList.remove("show");
    setTimeout(() => {
        tutBackButton.classList.add("hide");
    }, 400);

    showHomeButtons();
}

///////////////// PLAY PAGE
function endReturnHandler() {
    endScreen.classList.add("hide-end-screen-zoom-out")
    setTimeout(() => {
        //hide end screen
        endScreen.classList.add("hide");
        endScreen.classList.remove("hide-end-screen-zoom-out")
        endScreen.classList.remove("show-end-screen");
        
        //hide playPage
        setTimeout(() => {            
            bigDiv.classList.remove("big-div-show");
            playPage.classList.remove("show");

            //show homepage and buttons
            homePage.classList.remove("hide");
            requestAnimationFrame(() => {
                homePage.classList.add("show");    
            });
            showHomeButtons();

        }, 500);
    }, 500);

    resetGameBoardUI();
}
function endAnotherHandler() {
    endScreen.classList.add("hide-end-screen-zoom-in")
    setTimeout(() => {
        //hide end screen
        endScreen.classList.add("hide");
        endScreen.classList.remove("hide-end-screen-zoom-in")
        endScreen.classList.remove("show-end-screen");
    }, 2000);

    resetGameBoardUI();
    initGame();
}


///////////////////////////////////////// NAV (PAGES/BUTTONS) VISIBILITY /////////////////////////////////////////

function hideNavToInitGame() {
    hidePlayChildButtons();
    hideHomePage();
    initGame();
}
function hidePlayChildButtons() {
    //hide play child buttons
    playChildButtons.forEach((button) => {
        button.classList.remove("button-show");
        setTimeout(() => {
            button.classList.add("button-hide")    
        }, 200);
    });
    //hide play child back button
    playChildBackButton.classList.remove("show");
    setTimeout(() => {
        playChildBackButton.classList.add("hide");
    }, 400);
}
function hideHomePage() {
    //hide homePage
    homePage.classList.remove("show");
    setTimeout(() => {
        homePage.classList.add("hide");    
    }, 200);
}
function showHomeButtons() {
    //show home buttons
    setTimeout(() => {
        homeButtons.forEach((button) => {
            button.classList.remove("button-hide");
        });
    }, 200);
    setTimeout(() => {
        homeButtons.forEach((button) => {
            button.classList.add("button-show");
        });
    }, 300);
}
function hideHomeButtons() {
    //hide home buttons
    homeButtons.forEach((button) => {
        button.classList.remove("button-show");
        setTimeout(() => {
            button.classList.add("button-hide");   
        }, 200);
    });
}



// PLAY PAGE -------------------------------------- PLAY PAGE -------------------------------------- PLAY PAGE
// PLAY PAGE -------------------------------------- PLAY PAGE -------------------------------------- PLAY PAGE

///////////////////////////////////////// INITIALISE GAME LOAD /////////////////////////////////////////
function resetGameData() {
    player.pieceName = "";
    player.piece = "";
    player.color = "";
    player.pos = 3;

    game.running = false;
    game.dropRate = game.initialDropRate;
    game.holdAntiSpam = false;
    game.place = false;
    game.linesToCheck = [];
    game.linesToClear = [];
    game.linesToMove = {};
    game.gameOver = false;
    game.linesCleared = 0;
    game.piecesPlaced = 0;

    end.message = "";
    end.lines = 0;
    end.time = "";

    holdP.pieceName = "";
    holdP.piece = "";
    holdP.color = "";

    ghostPiece.pos = "";

    lineUpQty = 5;
    nextLineUp.length = 0;

    timerRunning = false;
    startTime = "";
    updateTime = "";
    elapsed = "";
}
function resetGameBoardUI() {
    mainBlock.classList.remove("main-block-fall");
    setTimeout(() => {
        mainBlock.classList.add("show");
    }, 2000);

    whitePartsDiv.forEach((part) => {
        part.classList.remove("white-parts-div-red");
    });
    whitePartsText.forEach((part) => {
        part.classList.remove("white-parts-text-red");
    });
    
    mainBlock.classList.remove("main-block-scale");
}
function initGame() {
    // applySettings(); ------------------------------------------

    setTimeout(() => {
        generateBoxes();
        cacheAllBoxes();
        hideBoxes();
        createLineUpList();
        generateLineUp();
        spawnLineUp();
        spawnHold();
        resetStats();

        bigDiv.classList.add("big-div-show");
        playPage.classList.add("show");
        
        if (game.mode === "forty") {
            countdownMessage.textContent = "CLEAR 40 LINES";
        } else if (game.mode === "marathon") {
            countdownMessage.textContent = "LET'S SEE HOW FAR YOU CAN GO";
        }

        
        setTimeout(() => {
            countdownScreen.classList.remove("hide");
            requestAnimationFrame(() => {
                countdownScreen.classList.add("show");
                countdownMessageDiv.classList.add("show");
            })
        }, 1000);



        setTimeout(() => {
            countdownMessageDiv.classList.remove("show");
            setTimeout(() => {

            });
        }, 2000)

        setTimeout(() => {
            for (let i = 4; i > 0; i--) {
                setTimeout(() => {
                    if (i != 1) {
                        countdownMessage.textContent = i-1;
                    } else {
                        countdownMessage.textContent = "GO";
                    }

                    countdownMessageDiv.classList.add("show");
                    setTimeout(() => {
                        countdownMessageDiv.classList.remove("show");
                        if (i === 1) {
                            countdownScreen.classList.remove("show")
                            setTimeout(() => {
                                countdownScreen.classList.add("hide")
                            }, 200);
                        }
                    }, 500);

                }, (4 - i) * 800);
            }
        }, 2500);


        //round start
        setTimeout(() => {
            game.running = true;
            respawn();
            startTimer();
            startCheckBottomInterval();
            startDropInterval();
            startPlaceInterval();
        }, 5300);

    }, 1000);
}

///////////////////////////////////////// TIMER /////////////////////////////////////////
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
function formatMilliseconds(ms) {
    return Math.floor(ms % 1000).toString().padStart(3, '0');
}
function startTimer() {
    if (timerRunning) return;
    timerRunning = true;
    startTime = performance.now();

    function update() {
        elapsed = performance.now() - startTime;

        stat1Big.textContent = formatTime(elapsed);
        stat1Small.textContent = `.${formatMilliseconds(elapsed)}`;    
        stat3Small.textContent = ` (${(game.piecesPlaced/elapsed*1000).toFixed(2)}/s)`;

        updateTime = requestAnimationFrame(update);
    }
    updateTime = requestAnimationFrame(update);
}
function stopTimer() {
    if (!timerRunning) return;
    cancelAnimationFrame(updateTime);
    timerRunning = false;
}

///////////////////////////////////////// INITIALISE BOXES /////////////////////////////////////////

///////////////// GENERATE 240 BOXES (play grid)
function generateBoxes() {
    const gameGrid = document.getElementById("game-grid")
    gameGrid.innerHTML = "";
    for (let i = 0; i < 240; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        div.id = `boxID${i+1}`;
        div.style.background = boxColor;
        div.style.border = boxBorder;
        gameGrid.appendChild(div);
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

///////////////////////////////////////// STATS TEXT RESET /////////////////////////////////////////
function resetStats() {
    stat3Big.textContent = game.piecesPlaced;
    stat2Big.textContent = game.linesCleared;
    stat1Big.textContent = "0:00";
    stat1Small.textContent = ".000";
    stat3Small.textContent = " (0.00/s)";

}

///////////////////////////////////////// ASSIGN NEXT PIECE /////////////////////////////////////////

///////////////// ASSIGN NEXT PIECE FROM LINEUP
function assignNextPiece() {
    if (!game.gameOver) {
        player.pieceName = nextLineUp[0].pieceName;
        player.piece = nextLineUp[0].piece;
        player.color = nextLineUp[0].color;
        nextLineUp.shift();
        generateNewPiece();
    }
}

///////////////////////////////////////// HOLD /////////////////////////////////////////

///////////////// HOLD PIECE SWAP/STORE
function holdPiece() {
    if (!game.holdAntiSpam) {
        if (holdP.color) {
            [player.pieceName, holdP.pieceName] = [holdP.pieceName, player.pieceName];
            [player.color, holdP.color] = [holdP.color, player.color];
            player.piece = pieces[player.pieceName].piece;
            holdP.piece = pieces[holdP.pieceName].piece;
            player.pos = 3;
            spawn(player.pos);
        } else {
            holdP.pieceName = player.pieceName;
            holdP.piece = pieces[holdP.pieceName].piece;
            holdP.color = pieces[holdP.pieceName].color;
            respawn();
        }
        game.holdAntiSpam = true;
        game.place = false;
        startCheckBottomInterval();
        startDropInterval();
        startPlaceInterval();
        spawnHold();
    }
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
///////////////// SPAWN PLAYER AT TOP (used by place & first hold) (assigns next piece)
function respawn() {
    assignNextPiece();
    player.pos = 3;
    spawn(player.pos);
}
///////////////// SPAWN PLAYER WITH POS (used by move, rotate, hold)
function spawn(pos) {
    despawn();
    despawnGhost();
    player.piece.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                allBoxes[(x+pos)+(y*10)].classList.add("play-piece"); 
                allBoxes[(x+pos)+(y*10)].classList.add("pre-ghost-piece");
                allBoxes[(x+pos)+(y*10)].style.background = player.color;
                allBoxes[(x+pos)+(y*10)].style.border = `1px solid ${player.color}`;
            }
        });
    });
    spawnGhost();
}

///////////////////////////////////////// GHOST SPAWN /////////////////////////////////////////

///////////////// DESPAWN GHOST  
function despawnGhost() {
    const ghostPiece = document.querySelectorAll(".ghost-piece");
    ghostPiece.forEach((box) => {
        box.classList.remove("ghost-piece-place");
        box.classList.remove("ghost-piece-hidden");
        box.classList.remove("ghost-piece");
    });    
    const preGhostPiece = document.querySelectorAll(".pre-ghost-piece");
    preGhostPiece.forEach((box) => {
        box.classList.remove("pre-ghost-piece");
    });            
}
///////////////// SPAWN GHOST  
function spawnGhost() {
    const preGhostPieces = document.querySelectorAll(".pre-ghost-piece");
    let ghostCollision = false;
    let count = 0;
    while (!ghostCollision) {
        preGhostPieces.forEach((box) => {
            if (allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("filled")) {
                count -= 10;
                ghostPiece.pos = count + player.pos;
                player.piece.forEach((row, y) => {
                    row.forEach((value, x) => {
                        if (value !== 0) {
                            allBoxes[(x+player.pos)+(y*10)+count].classList.add("ghost-piece");
                            if (!settings.ghost) {
                                allBoxes[(x+player.pos)+(y*10)+count].classList.add("ghost-piece-hidden");
                            }
                        }
                    });
                });
                ghostCollision = true;
                return;      
            }
        });
        count += 10;
    }        
}

///////////////////////////////////////// PLACE PLAYER PIECE /////////////////////////////////////////

///////////////// PLACE BLOCK 
function place() {
    // clearInterval(placeInterval);
    const ghostPiece = document.querySelectorAll(".ghost-piece");
            
    if (game.place){
        fill();

        //fill animation
        ghostPiece.forEach((ghost) => {
            ghost.classList.add("ghost-piece-place-fast");
        });
        setTimeout(() => {
            ghostPiece.forEach((ghost) => {
                ghost.classList.remove("ghost-piece-place-fast");
            }); 
        }, 100)

        if (settings.screenShake) {
            mainBlock.classList.add("main-block-shake");
            setTimeout(() => {
                mainBlock.classList.add("main-block-unshake");
            }, 100)
            setTimeout(() => {
                mainBlock.classList.remove("main-block-shake");
                mainBlock.classList.remove("main-block-unshake");
            }, 200)
        }

        //respawn if not game over, else, end game
        
        if (!checkGameOver()) {
            respawn();
        }
        game.place = false;
        game.holdAntiSpam = false;
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
    game.piecesPlaced++;
    stat3Big.textContent = game.piecesPlaced;
    checkLineCLear();
}

///////////////////////////////////////// CHECKS /////////////////////////////////////////

///////////////// CHECK GAMEOVER (if placed in spawn area)
function checkGameOver() {
    const topBoxes = document.querySelectorAll(".top");
    topBoxes.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))-1].classList.contains("top") &&
            allBoxes[parseInt(box.id.slice(5))-1].classList.contains("filled")) {
            game.gameOver = true;
            return;
        }
    });
    if (game.gameOver) {
        gameLose();
        return true;
    }

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
    });

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
    });
    game.linesToCheck.length = 0;

    //if linesToClear truthy, proceed to clearLines()
    if (game.linesToClear.length > 0) {
        clearLines();
    }
}
/////////////////CHECK BOTTOM (if block below player obstructed)
function checkBottom() {
    const playPieces = document.querySelectorAll(".play-piece");
    const ghostPiece = document.querySelectorAll(".ghost-piece");
    playPieces.forEach((box) => {
        if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
            allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
                
            ghostPiece.forEach((ghost) => {
                ghost.classList.add("ghost-piece-place");
        });
            game.place = true;       
        }
    });
}

///////////////////////////////////////// LINE CLEAR AND MOVE /////////////////////////////////////////

///////////////// CLEAR LINES
function clearLines() {
    const ghostPiecePlaceFastLineClear = document.querySelectorAll(".ghost-piece");
    ghostPiecePlaceFastLineClear.forEach((box) => {
        box.classList.add("ghost-piece-place-fast-line-clear");
    }); 

    game.linesToClear.forEach((line) => {
        game.linesCleared++;
        stat2Big.textContent = game.linesCleared;
        if (game.mode === "marathon") {
            if (game.linesCleared%10 === 0 && game.linesCleared < 120) {
                game.dropRate -= 25;
            }
        }
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
            
              
            allBoxes[boxIndex].style.backgroundColor = "white"; //todo: add to game data
            allBoxes[boxIndex].style.border = "white";
            setTimeout(() => {        
                allBoxes[boxIndex].style.backgroundColor = boxColor; //todo: add to game data
                allBoxes[boxIndex].style.border = boxBorder; //todo: add to game data
        
            }, 20);
        }
    });
    game.linesToClear.length = 0; //reset lineToClear
    if (game.linesToMove) {
        setTimeout(() => {
            moveLines(); //move lines down to fill up cleared rows
        }, 30);
    }
    
    if (game.mode === "forty") {
        if (game.linesCleared >= 40) {
            gameWin();
            return;
        }
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

///////////////////////////////////////// GAME END /////////////////////////////////////////
function freezeTime() {
    stopTimer();
    end.time = stat1Big.textContent+stat1Small.textContent;
    end.lines = stat2Big.textContent;

    clearInterval(dropInterval);
    clearInterval(checkBottomInterval);
    clearInterval(placeInterval);
}

function gameEnd() {
    endMessage.textContent = end.message
    endLines.textContent = end.lines
    endTime.textContent = end.time

    setTimeout(() => {
        endScreen.classList.remove("hide")
        requestAnimationFrame(() => {
            endScreen.classList.add("show-end-screen");
        })
    }, 500);

    resetGameData();       
}

function gameLose() {
    freezeTime();
    end.message = "GAME OVER!"
    mainBlock.classList.add("main-block-fall");
    setTimeout(() => {
        mainBlock.classList.remove("show");
    }, 500);
    whitePartsDiv.forEach((part) => {
        part.classList.add("white-parts-div-red");
    });
    whitePartsText.forEach((part) => {
        part.classList.add("white-parts-text-red");
    });
    gameEnd();
}

function gameWin() {
    freezeTime();
    end.message = "You did it?! Wow. Grape.";
    mainBlock.classList.add("main-block-scale");
    setTimeout(() => {
        mainBlock.classList.remove("show");
    }, 500);
    gameEnd();
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
    

    setTimeout(() => {
    const ghostPiecePlaceFastLineClear = document.querySelectorAll(".ghost-piece-place-fast-line-clear");
    ghostPiecePlaceFastLineClear.forEach((box) => {
        box.classList.remove("ghost-piece-place-fast-line-clear");
    });    
    
    }, 500)
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
    startCheckBottomInterval();
    startPlaceInterval();
}

///////////////////////////////////////// KEYBIND EVENTLISTENER /////////////////////////////////////////
let keyIntervals = {};
document.addEventListener("keydown", (event) => {
    if (!game.gameOver && game.running) {
        if (keyIntervals[event.key]) {
            return;
        }
        switch (event.key) {
            case "ArrowDown":
                moveDown3();
                keyIntervals.ArrowDown = setInterval(moveDown3, 70);
                break;
            case "ArrowRight":
                moveRight();
                keyIntervals.ArrowRight = setInterval(moveRight, 110);
                break;
            case "ArrowLeft":
                moveLeft();
                keyIntervals.ArrowLeft = setInterval(moveLeft, 110);
                break;

            case " ":
            case "Spacebar":
            case "Space":
                hardDrop();
                break;

            case "ArrowUp":
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
    placeInterval = setInterval(place, 500);
}

// CSS STYLINGS -------------------------------------- CSS STYLINGS -------------------------------------- CSS STYLINGS

///////////////////////////////////////// TEXT AUTO RESIZE /////////////////////////////////////////

const resizeObserver = new ResizeObserver(entries => {
    const h1 = document.querySelectorAll("h1");
    const h2 = document.querySelectorAll("h2");
    const h3 = document.querySelectorAll("h3");
    const h4 = document.querySelectorAll("h4");
    const h5 = document.querySelectorAll("h5");
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
    h5.forEach(el => {
        el.style.fontSize = (width / 50) + "px";
    });
    p.forEach(el => {
        el.style.fontSize = (width / 50) + "px";
    });
    statSmall.forEach(el => {
        el.style.fontSize = (width / 50) + "px";
    });
});
resizeObserver.observe(playPage);
