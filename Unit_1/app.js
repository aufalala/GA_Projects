
window.addEventListener("DOMContentLoaded", () => {



/////////////////TEXT RESIZE /////////////////TEXT RESIZE /////////////////TEXT RESIZE
    const mainBlockDiv = document.getElementById("mainBlock");
    const titles = document.querySelectorAll("h3");
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

    function spawnHold() {

    }


/////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT /////////////////ASSIGN PIECE FROM NEXT
    function assignNextPiece() {
        player.piece = nextLineUp[0].piece;
        player.color = nextLineUp[0].color;

        nextLineUp.shift();

        console.log(nextLineUp);

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

    function despawn() {
        const playPieces = gameArea.querySelectorAll(".playPiece");
        
            playPieces.forEach((box) => {
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

/////////////////DESPAWN GHOST /////////////////DESPAWN GHOST /////////////////DESPAWN GHOST  
    function despawnGhost() {
        const ghostPiece = gameArea.querySelectorAll(".ghostPiece");
        
            ghostPiece.forEach((box) => {
                box.classList.remove("ghostPiece");

                if (box.classList.contains("top")) {
                    // box.style.background = "";
                    // box.style.border = "";
                    box.style.boxShadow = "";
                } else {
                    // box.style.background = boxColor;
                    // box.style.border = boxBorder;
                    
                    box.style.boxShadow = "";
                }
        });            
    }

/////////////////SPAWN GHOST /////////////////SPAWN GHOST /////////////////SPAWN GHOST  
    function spawnGhost() {
        const ghostPieces = gameArea.querySelectorAll(".ghostPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
        
        console.log(ghostPieces);
        let showGhost = false;
        let count = 0;

        while (!showGhost) {
            ghostPieces.forEach((box) => {
                if (allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("bottom") ||
                    allBoxes[parseInt(box.id.slice(5))+count-1].classList.contains("filled")) {
                    
                        count -= 10;
                        ghostPiece.pos = count + player.pos - 10;
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
    
/////////////////PLACE BLOCK /////////////////PLACE BLOCK /////////////////PLACE BLOCK 
    function place() {
        if (game.place){
            fill();
            const topBoxes = gameArea.querySelectorAll(".top");
            const allBoxes = gameArea.querySelectorAll(".box");

            topBoxes.forEach((box) => {
                if (allBoxes[parseInt(box.id.slice(5))-1].classList.contains("top") &&
                    allBoxes[parseInt(box.id.slice(5))-1].classList.contains("filled")) {
                        console.log("GAME OVER");
                        return;
                }
                return;
            });

            game.place = false;
            respawn();
        }
    }

/////////////////CHECK BOTTOM /////////////////CHECK BOTTOM /////////////////CHECK BOTTOM 
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

/////////////////FILL /////////////////FILL /////////////////FILL /////////////////FILL 
    function fill() {
        const playPieces = gameArea.querySelectorAll(".playPiece");
        playPieces.forEach((boxToFill) => {
            boxToFill.classList.add("filled");
            boxToFill.style.background = `${player.color}`;
            console.log(`filled added ${boxToFill.id}`);
            boxToFill.classList.remove("playPiece");
        });

    }

//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS 
//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS
    
    function moveDown3() {
        const playPieces = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");

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
        const playPiece = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
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
        const playPiece = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
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
        const playPiece = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");

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
        }
    }

    //     function rotateRight() {
    //     const allBoxes = gameArea.querySelectorAll(".box");

    //     const oldMatrix = player.piece;
    //     const rotated = oldMatrix[0].map((_, colIndex) => 
    //         oldMatrix.map(row => row[colIndex])).map(row => row.reverse());

    //     const kicks = [ 
    //         { x: 0, y: 0 },   
    //         { x: -1, y: 0 },  
    //         { x: 1, y: 0 },   
    //         { x: 0, y: -1 },  
    //         { x: -1, y: -1 }, 
    //         { x: 1, y: -1 },  
    //     ];

    //     for (let kick of kicks) {
    //         let blocked = false;

    //         for (let y = 0; y < rotated.length; y++) {
    //             for (let x = 0; x < rotated[y].length; x++) {
    //                 if (rotated[y][x] !== 0) {
    //                     let newX = x + player.pos + kick.x;
    //                     let newY = y + kick.y;
    //                     let index = newX + newY * 10;

    //                     if ( 
    //                         allBoxes[index].classList.contains("filled") ||
    //                         allBoxes[index].classList.contains("bottom") ||

    //                             ((parseInt(allBoxes[index].id.slice(5))-1)%10 == 0 ||
    //                             parseInt(allBoxes[index].id.slice(5) === 1) && 
    //                             (parseInt(allBoxes[index].id.slice(5))%10 == 0)) 
    //                     ) {
    //                         blocked = true;
    //                         // break;
    //                     }
    //                 }
    //             }
    //         }

    //         if (!blocked) {
    //             player.piece = rotated;
    //             player.pos += kick.x;
    //             spawn(player.pos);
    //             startCheckBottomInterval();
    //             startPlaceInterval();
    //             return;
    //         }
    //     }
    // }

    function rotateLeft() {

    }

    

//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS
//############### KEYBINDS //############### KEYBINDS //############### KEYBINDS //############### KEYBINDS
    // document.addEventListener("keydown", (event) => {
    //     if (event.key === "ArrowDown") {
    //         moveDown3();
    //     }
    // })

    // document.addEventListener("keydown", (event) => {
    //     if (event.key === "ArrowRight") {
    //         moveRight();
    //     }
    // })    

    // document.addEventListener("keydown", (event) => {
    //     if (event.key === "ArrowLeft") {
    //         moveLeft();
    //     }
    // })

    // document.addEventListener("keydown", (event) => {
    //     if (event.key === "Space") {
    //         hardDrop();
    //     }
    // })   
    
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
                rotateRight();
                break;

            case "c":
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
        checkBottomInterval = setInterval(checkBottom, 10);
    }

    function startPlaceInterval() {
        clearInterval(placeInterval);
        placeInterval = setInterval(place, game.dropRate*2);
    }

    
    startCheckBottomInterval();
    startDropInterval();
    startPlaceInterval();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    assignNextPiece();
})
