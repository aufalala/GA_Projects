can try using em for fonts. see if relative to parent div.

fallback for fonts, body

main page
  -play
    -40 clear
    -marathon
  -settings
  -how to play

do feats: rotate left, line up (div), hold (div), hold (div) antispam function, line clear 



---CODE FROM WORK---

SORT game.linesToClear DESCENDING FIRST
ADD linesToMove to game data
	linesToMove = {}
ADD/MOVE bocColor and boxBorder to game data
MOVE classList.remove checkPieces from clear to checkLineClear


function clearLines() {
	const allBoxes = document.querySelectorAll(".box")
	
	linesToCLear.forEach((line) => {
		for (i=line-10; i>20; i-= 10) {
  			if (!game.linesToMove[i]) {
	 			game.linesToMove[i] = {toMove: 0}; 
			}
   			game.linesToMove[i].toMove += 10;
		}
  		//clearing steps here
		for (i=0; i>10; i++) {
			const boxIndex = line + i;
	 		allBoxes[boxIndex].classList.remove("filled");  //todo: add to game data
			allBoxes[boxIndex].styles.background = boxColor; //todo: add to game data
			allBoxes[boxIndex].styles.border = boxBorder; //todo: add to game data
	  	}
	});
 	linesToClear.length = 0;
  	if (game.linesToMove) {
		moveLines();
	}
  	//might need to check classes
}

function moveLines() {
	const allBoxes = document.querySelectorAll(".box")
 
 	Object.key(game.linesToMove).forEach((line) => {
  		
		for (i=0; i>10; i++) {
  			const boxIndex = line + i;
	 		const newBoxIndex = boxIndex + game.linesToMove[line].toMove
	 
			const styles = window.getComputedStyle(allBoxes[boxIndex]);
   			const backgroundColor = styles.backgroundColor;
	  		const border = styles.border;
	 		const wasFilled = allBoxes[boxIndex].classList.contains("filled");

	 		//insert moveDespawn here
			allBoxes[boxIndex].classList.remove.("filled");
   			allBoxes[boxIndex].styles.background = boxColor; //todo: add to game data
	  		allBoxes[boxIndex].styles.border = boxBorder; //todo: add to game data
   			
   			
	  		// may not need the if loop
			if (!wasFilled) {
	  			allBoxes[newBoxIndex].styles.background = boxColor; //todo: add to game data
	  			allBoxes[newBoxIndex].styles.border = boxBorder; //todo: add to game data
		 	} else {
				allBoxes[newBoxIndex].classList.add("filled");
				allBoxes[newBoxIndex].styles.background = backgroundColor;
	  			allBoxes[newBoxIndex].styles.border = border;
   			}
  		
		}
   	});
}

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
