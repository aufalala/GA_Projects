
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

//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS 
//############### MOVE FUNCTIONS //############### MOVE FUNCTIONS //############### MOVE FUNCTIONS
    
    function moveDown3() {
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");

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
        //check if piece blocked by placed box left
        playPiece.forEach((box) => {
            if (
                allBoxes[parseInt(box.id.slice(5))].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))].classList.contains("filled")) {
                blocked = true;       
            }
        });
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
        if (!blocked) {
            player.pos -= 1;
            despawn();
            spawn(player.pos);
            game.place = false;
            startDropInterval();
            startCheckBottomInterval();
        }
    }

    function rotateRight() {

    }
    function rotateLeft() {

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
        placeInterval = setInterval(place, game.dropRate*2);
    }

    
    startCheckBottomInterval();
    startDropInterval();
    startPlaceInterval();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    assignNextPiece();
})
