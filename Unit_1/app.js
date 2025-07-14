
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





/////////////////GENERATE 230 BOXES, HIDE FIRST 30
    for (let i = 0; i < 230; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        div.id = `boxID${i+1}`;
        // div.textContent = `${i + 1}`;
        gameArea.appendChild(div);
        // div.style.aspectRatio= "1/1";
    }
    const allBoxes = gameArea.querySelectorAll(".box");
    for (let i = 0; i < 30; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
    }

    /////////////////PIECES
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


/////////////////HOLDPIECE OBJECT
    const holdP = {
        piece: [],
        color: "",
    };

    // const next1P = {
    //     piece: [],
    //     color: "",
    // };
    // const next2P = {
    //     piece: [],
    //     color: "",
    // };
    // const next3P = {
    //     piece: [],
    //     color: "",
    // };
    // const next4P = {
    //     piece: [],
    //     color: "",
    // };
    // const next5P = {
    //     piece: [],
    //     color: "",
    // };

/////////////////CREATE LINE UP ACCORDING TO LINE UP QTY

    let lineUpQty = 5;
    const nextLineUp = [];
    
    function createLineUp() {
        for (i=0; i<lineUpQty; i++) {
            nextLineUp.push({});
            nextLineUp[i].piece;
            nextLineUp[i].color = "";
        }
    }
    createLineUp();

/////////////////SPAWN LINE UP

    function generateLineUp() {
        for (i=0; i<lineUpQty; i++) {
            nextLineUp[i].piece = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].piece;
            nextLineUp[i].color = pieces[pieceNames[Math.floor(Math.random()*pieceNames.length)]].color;
        }
    }
    generateLineUp();

    function spawnLineUp() {

    }


/////////////////PLAYER DATA
    const player = {
        piece: pieces.t.piece,
        color: pieces.t.color,
    }



/////////////////PIECE FROM NEXT
    function assignNextPiece() {
        player.piece = next1P.piece;
        player.color = next1P.color;

        for (i=0; i<lineUpQty-1; i++) {

        }

        // insert fea

        // if line up qty 0
    }

/////////////////HOLD FUNCTION
    function holdPiece() {
        if (holdP.color) {
            [player.piece, holdP.piece] = [holdP.piece, player.piece];
            [player.color, holdP.color] = [holdP.color, player.color];
        } else {
            holdP.piece = player.piece;
            holdP.color = player.color;
            assignNextPiece();
        }
    }

/////////////////SPAWN FUNCTION
    function spawn() {
        const allBoxes = gameArea.querySelectorAll(".box");
        player.piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    allBoxes[(x+3)+(y*10)].classList.add("playPiece");
                    allBoxes[(x+3)+(y*10)].style.background = player.color;
                    allBoxes[(x+3)+(y*10)].style.border = `1px solid ${player.color}`;
                }
            })
        });

        // insert spawn interval boost here to "flash" moveDown
    }
    spawn();
})