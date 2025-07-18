
window.addEventListener("DOMContentLoaded", () => {



/////////////////TEXT RESIZE /////////////////TEXT RESIZE /////////////////TEXT RESIZE
    const mainBlockDiv = document.getElementById("mainBlock");
    const titles = mainBlock.querySelectorAll("h3");
    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            const {width} = entry.contentRect;
            titles.forEach(title => {
                title.style.fontSize = (width / 30) + "px";
            });
        }
    });
    resizeObserver.observe(mainBlockDiv);




//############### INITIALISE BOXES (PLAY AREA) //############### INITIALISE BOXES (PLAY AREA)
//############### INITIALISE BOXES (PLAY AREA) //############### INITIALISE BOXES (PLAY AREA)
    
/////////////////GENERATE 240 BOXES /////////////////GENERATE 240 BOXES /////////////////GENERATE 240 BOXES
    let boxColor = "black";
    let boxBorder = ".1px solid gray";

    function generateBoxes() {
        for (let i = 0; i < 240; i++) {
            const div = document.createElement("div");
            div.classList.add("box");
            div.id = `boxID${i+1}`;
            div.style.background = boxColor;
            div.style.border = boxBorder;
            // div.textContent = `${i + 1}`;
            gameArea.appendChild(div);
        }
        hideBoxes();
    }
    generateBoxes();

/////////////////HIDE FIRST 30 BOXES /////////////////HIDE FIRST 30 BOXES /////////////////HIDE FIRST 30 BOXES
    function hideBoxes() {
        const allBoxes = gameArea.querySelectorAll(".box");
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
    }

/////////////////HOLDPIECE DATA /////////////////HOLDPIECE DATA /////////////////HOLDPIECE DATA
    const holdP = {
        piece: "",
        color: "",
    };


//############### Functions //############### Functions //############### Functions 
//############### Functions //############### Functions //############### Functions



    function spawnHold() {

    }


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
    createLineUpList();

/////////////////GENERATE LINE UP /////////////////GENERATE LINE UP /////////////////GENERATE LINE UP

    function generateLineUp() {
        for (i=0; i<lineUpQty; i++) {
            nextLineUp[i] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
            // nextLineUp[i].color = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].color;
        }
    }
    generateLineUp();

    function generateNewPiece() {
        nextLineUp.push({})
        nextLineUp[lineUpQty-1] = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]];
    }


/////////////////////////////////////////
    function spawnLineUp() {
        //draw into divs
    }


/////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT
    function assignNextPiece() {
        player.piece = nextLineUp[0].piece;
        player.color = nextLineUp[0].color;

        nextLineUp.shift();

        console.log(nextLineUp);

        generateNewPiece();

        // for (i=0; i<lineUpQty-1; i++) {
        // }

        // insert fea
        // if line up qty 0
    }

/////////////////HOLD FUNCTION
    function holdPiece() {
        if (holdP.color) {
            [player.piece, holdP.piece] = [holdP.piece, player.piece];
            [player.color, holdP.color] = [holdP.color, player.color];
            player.pos = 3;
            despawn();
            spawn(player.pos);
        } else {
            holdP.piece = player.piece;
            holdP.color = player.color;
            respawn();
        }
    }

/////////////////SPAWN PLAYPIECE FUNCTION
    function respawn() {
        despawn();
        assignNextPiece();
        
        player.pos = 3;
        spawn(player.pos);
    }

    function spawn(pos) {
        despawnGhost();
        const allBoxes = gameArea.querySelectorAll(".box");
        player.piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    
                    allBoxes[(x+pos)+(y*10)].classList.add("playPiece"); 
                    allBoxes[(x+pos)+(y*10)].classList.add("ghostPiece");
                    allBoxes[(x+pos)+(y*10)].style.background = player.color;
                    allBoxes[(x+pos)+(y*10)].style.border = `1px solid ${player.color}`;
                }
            })
        });

        spawnGhost();

        // insert spawn interval boost here to "flash" moveDown
    }
    // spawn(player.pos);

    function despawn() {
        const playPiece = gameArea.querySelectorAll(".playPiece");
        
            playPiece.forEach((box) => {
                box.classList.remove("playPiece");

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
    
    // function updateGhost() {
    //     despawnGhost();
    //     spawnGhost();

    // }

    function despawnGhost() {
        const ghostPiece = gameArea.querySelectorAll(".ghostPiece");
        
            ghostPiece.forEach((box) => {
                box.classList.remove("ghostPiece");

                if (box.classList.contains("top")) {
                    // box.style.background = "";
                    // box.style.border = "";
                } else {
                    // box.style.background = boxColor;
                    // box.style.border = boxBorder;
                    
                    box.style.boxShadow = "";
                }
        });            
    }

    // function spawnGhost() {
    //     const allBoxes = gameArea.querySelectorAll(".box");
    //     let lowestFound = false;
    //     let ghostPos = player.pos;
    //     ///// IN FUTURE PUT LOWESTFOUND AND GHOST POS TO DATA
    //                         console.log(ghostPos);
        
    //     while (!lowestFound) {
    //         player.piece.forEach((row, y) => {
    //             row.forEach((value, x) => {
    //                 if (allBoxes[(x+ghostPos)+(y*10)].classList.contains("filled") ||
    //                         allBoxes[(x+ghostPos)+(y*10)].classList.contains("bottom")) {
    //                             // ghostPos += 10;
    //                             console.log(ghostPos);
    //                             console.log(allBoxes[(x+ghostPos)+(y*10)]);
    //                             lowestFound = true;
    //                             return;
    //                         }
    //                 // } 
    //             });
    //         });
    //         ghostPos += 10;
    //     }

    //     if (lowestFound) {
    //         player.piece.forEach((row, y) => {
    //             row.forEach((value, x) => {
    //                 if  (value !== 0) {
    //                     allBoxes[(x+ghostPos)+(y*10)].classList.add("ghostPiece");
    //                     allBoxes[(x+ghostPos)+(y*10)].style.background = "white";
    //                     allBoxes[(x+ghostPos)+(y*10)].style.border = `1px solid white`;
    //                 };
    //             });
    //         });
    //     }
    // }

    function spawnGhost() {
        const ghostPieces = gameArea.querySelectorAll(".ghostPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
        
        console.log(ghostPieces);
        let showGhost = false;
        let count = 10;

        while (!showGhost) {
            ghostPieces.forEach((box) => {
                if (allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("bottom") ||
                    allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("filled")) {
                    
                        count -= 10;
                        console.log(count);
    
                        player.piece.forEach((row, y) => {
                            row.forEach((value, x) => {
                                if (value !== 0) {
                                    
                                    allBoxes[(x+player.pos)+(y*10)+count].classList.add("ghostPiece");            
                                    allBoxes[(x+player.pos)+(y*10)+count].style.boxShadow = "inset 0 0 5px 10px rgba(255, 255, 255, 0.5)";
                                    // allBoxes[(x+player.pos)+(y*10)+count].style.background = "white";
                                    // allBoxes[(x+player.pos)+(y*10)+count].style.border = `1px solid white`;
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
    


//////////////////////////////////////PLACE BLOCK
    function place() {
        if (game.place){
            fill();
            // removePlayPieceBox();
            game.place = false;
            respawn();
        }
    }

    function checkBottom() {
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");

        playPieceBox.forEach((box) => {
            if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
                game.place = true;       
            }
        });
    }

    function fill() {
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        playPieceBox.forEach((boxToFill) => {
            boxToFill.classList.add("filled");
            boxToFill.style.background = `${player.color}`;
            console.log(`filled added ${boxToFill.id}`);
            boxToFill.classList.remove("playPiece");
        });

    }

    // function fillColor(color) {
    //     const toFill = gameArea.querySelectorAll(".toFill");
    //     toFill.forEach((boxToFill) => {
    //         boxToFill.style.background = color;
    //         // console.log(player.color);
    //         boxToFill.style.border = `1px solid ${color}`;
    //         console.log("colored");
    //         boxToFill.classList.add("filled")
    //         boxToFill.classList.remove("toFill");
    //         // respawn();
    //         fillColor(color);
    //         setTimeout(() => {
    //             respawn();
    //         }, 100);
    //     });
    // }


//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS 
//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS

    // function moveDown() {
    //     // if below filled, place
    //     const playPieceBox = gameArea.querySelectorAll(".playPiece");
    //     const allBoxes = gameArea.querySelectorAll(".box");
    //     // console.log(playPieceBox);
    //     // console.log(box.id);
    //     let toFill = false;

    //     playPieceBox.forEach((box) => {
    //         if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
    //             allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
    //                 toFill = true;       
    //         }
    //     });           

    //     if (!toFill) {
    //         player.pos += 10;
    //         despawn();
    //         spawn(player.pos);
    //         return;
    //     } else {
    //         // place();
    //         const colorToFill = player.color;
    //         fill(colorToFill); //fill - fillColor - respawn
    //     }
    // }
    // function moveDown2() {
    //     const playPiece = gameArea.querySelectorAll(".playPiece")
    //     const allBoxes = gameArea.querySelectorAll(".box");
    //     const playPieceIDArray = [];
    //     let border = false;
    //     playPiece.forEach((box) => {
    //         playPieceIDArray.push(parseInt(box.id.slice(5)))
    //     });

    //     playPieceIDArray.some((id) => {
            
    //         allBoxes[id+10].classList.contains("bottom");
    //         allBoxes[id+10].classList.contains("filled");
    //         return;
    //     });

    //     if (!border) {
    //         player.pos += 10;
    //         despawn();
    //         spawn(player.pos);
    //     }
    // }
    
    function moveDown3() {
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
        // let downBorder = false;

        playPieceBox.forEach((box) => {
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
            game.dropRate = 1000;
            startDropInterval();
            startPlaceInterval();
            startCheckBottomInterval();
            return;
        } else {
            // place();
        }
    }

    function moveRight() {
        // if right filled, dont move
        const playPiece = gameArea.querySelectorAll(".playPiece")
        let border = false;
        playPiece.forEach((box) => {

            if (parseInt(box.id.slice(5))%10 == 0) {
                border = true;
                return;
            }
        });
        if (!border) {
            player.pos += 1;
            despawn();
            spawn(player.pos);
        }
        
    }
    function moveLeft() {
        // if left filled, dont move
        
        const playPiece = gameArea.querySelectorAll(".playPiece")
        let border = false;
        playPiece.forEach((box) => {

            if ((parseInt(box.id.slice(5))-1)%10 == 0 ||
                parseInt(box.id.slice(5) === 1)) {
                border = true;
                return;
            }
        });
        if (!border) {
            player.pos -= 1;
            despawn();
            spawn(player.pos);
        }

        
    }
    function rotateRight() {

    }
    function rotateLeft() {

    }

/////////////////////////////////////////////////////INTERVALS

    let dropInterval;
    let checkBottomInterval;
    let placeInterval;

    function startDropInterval() {
        clearInterval(dropInterval);
        dropInterval = setInterval(moveDown3, game.dropRate);
    }

    function startCheckBottomInterval() {
        clearInterval(checkBottomInterval);
        checkBottomInterval = setInterval(checkBottom, 10);
    }

    function startPlaceInterval() {
        clearInterval(placeInterval);
        placeInterval = setInterval(place, game.dropRate);
    }
    

//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS
//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            moveDown3();
        }
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            moveRight();
        }
    })    

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            moveLeft();
        }
    })
    

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
        checkBottomInterval = setInterval(checkBottom, 10);
    }

    function startPlaceInterval() {
        clearInterval(placeInterval);
        placeInterval = setInterval(place, game.dropRate);
    }

    
    startCheckBottomInterval();
    startDropInterval();
    startPlaceInterval();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    assignNextPiece();
})
