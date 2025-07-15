
// const gameArea = document.getElementById("gameArea");

window.addEventListener("DOMContentLoaded", () => {

    const mainBlockDiv = document.getElementById("mainBlock");
    
/////////////////TEXT RESIZE
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





/////////////////GENERATE 240 BOXES
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

/////////////////HIDE FIRST 30 BOXES
    function hideBoxes() {
        const allBoxes = gameArea.querySelectorAll(".box");
        for (let i = 0; i < 30; i++) {
            allBoxes[i].style.background = "none";
            allBoxes[i].style.border = "none";
            allBoxes[i].classList.add("top");
        }
/////////////////HIDE LAST 10 BOXES
        for (let i = 230; i < 240; i++) {
            allBoxes[i].style.background = "none";
            allBoxes[i].style.border = "none";
            allBoxes[i].classList.add("bottom");
        }
    }
/////////////////DATA /////////////////DATA /////////////////DATA /////////////////DATA

/////////////////PIECES DATA
    const pieces = {
        t: { 
            color: "blue",
            piece:[
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0],
            ], },
        square: { 
            color: "blue",
            piece:[
                [1, 1],
                [1, 1],
            ], },
        j: { 
            color: "blue",
            piece:[
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0],
            ], },
        l: { 
            color: "blue",
            piece:[
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0],
            ], }, 
        i: { 
            color: "blue",
            piece:[
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ], },
        z: { 
            color: "blue",
            piece:[
                [1, 1, 0],
                [0, 1, 1],
                [0, 0, 0],
            ], },
        s: { 
            color: "blue",
            piece:[
                [0, 1, 1],
                [1, 1, 0],
                [0, 0, 0],
            ], },

    }
    const pieceNames = Object.keys(pieces);
    
/////////////////PLAYER DATA
    const player = {
        piece: "",
        color: "",
        pos: 3,
    }

/////////////////GAME DATA
    const game = {
        dropRate: 200,
    }




/////////////////HOLDPIECE OBJECT
    const holdP = {
        piece: [],
        color: "",
    };

    function spawnHold() {

    }


/////////////////CREATE LINE UP LIST ACCORDING TO LINE UP QTY

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

/////////////////GENERATE LINE UP

    function generateLineUp() {
        for (i=0; i<lineUpQty; i++) {
            nextLineUp[i].piece = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].piece;
            nextLineUp[i].color = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].color;
        }
    }
    generateLineUp();

    function generateNewPiece() {
        nextLineUp.push({})
        nextLineUp[lineUpQty-1].piece = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].piece;
        nextLineUp[lineUpQty-1].color = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].color;
    }


/////////////////////////////////////////
    function spawnLineUp() {
        //draw into divs
    }


/////////////////PIECE FROM NEXT
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

/////////////////SPAWN FUNCTION
    function respawn() {
        player.pos = 3;
        despawn();
        assignNextPiece();
        spawn(player.pos);
    }

    function spawn(pos) {
        const allBoxes = gameArea.querySelectorAll(".box");
        player.piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    allBoxes[(x+pos)+(y*10)].classList.add("playPiece");
                    allBoxes[(x+pos)+(y*10)].style.background = player.color;
                    allBoxes[(x+pos)+(y*10)].style.border = `1px solid ${player.color}`;
                }
            })
        });

        // insert spawn interval boost here to "flash" moveDown
    }
    // spawn(player.pos);

    function despawn() {
        const playPiece = gameArea.querySelectorAll(".playPiece");
        
            // console.log(playPiece);
            playPiece.forEach((box) => {
                box.classList.remove("playPiece");

                if (box.classList.contains("top")) {
                    box.style.background = "";
                    box.style.border = "";
                // }
                    } else {
                    box.style.background = boxColor;
                    box.style.border = boxBorder;
                }
        })

    }

    function spawnGhost() {

    }

    function place() {
        fill();
        fillColor();
        // assignNextPiece();
        // respawn();
    }

    function fill() {
        
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        playPieceBox.forEach((boxToFill) => {
            
            boxToFill.classList.add("filled");
            console.log("filled");
        });
    }

    function fillColor() {
        const toFill = gameArea.querySelectorAll(".filled");
        toFill.forEach((boxToFill) => {
            boxToFill.style.background = "blue";
            // console.log(player.color);
            boxToFill.style.border = `1px solid blue`;
            console.log("colored");
        });
    }

/////////////////MOVE FUNCTIONS /////////////////MOVE FUNCTIONS /////////////////MOVE FUNCTIONS

    function moveDown() {
        // if below filled, place
        const playPieceBox = gameArea.querySelectorAll(".playPiece");
        const allBoxes = gameArea.querySelectorAll(".box");
        // console.log(playPieceBox);
        // console.log(box.id);
        let toFill = false;

        playPieceBox.forEach((box) => {
            if (allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("bottom") ||
                allBoxes[parseInt(box.id.slice(5))+10-1].classList.contains("filled")) {
                
                // fill();

                // fillColor();
                // place();
                // return;     
                toFill = true;        
            }
        });           

        // if (toFill) {
        //     place();
        //     return;
        // }
        if (!toFill) {
            player.pos += 10;
            despawn();
            spawn(player.pos);
        } else {
            place();
            respawn();
            fillColor();
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
    // moveDown();
    setInterval(moveDown, game.dropRate);
    
    setInterval(moveLeft, game.dropRate);

    
    assignNextPiece();

    

})