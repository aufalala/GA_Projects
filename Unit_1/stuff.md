can try using em for fonts. see if relative to parent div.

fallback for fonts, body

main page
  -play
    -40 clear
    -marathon
  -settings
  -how to play

do feats: rotate left, line up (div), hold (div), hold (div) antispam function, line clear 


--------- 25 july code from work ---------

function rotateLeft() {
        const allBoxes = gameArea.querySelectorAll(".box");

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
