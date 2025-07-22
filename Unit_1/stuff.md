can try using em for fonts. see if relative to parent div.

fallback for fonts, body

main page
  -play
    -40 clear
    -marathon
  -settings
  -how to play

do feats: rotate left, line up (div), hold (div), hold (div) antispam function, line clear 

CODE FROM OFFICE ----------------------

  function checkLineCLear() {
    const allBoxes = document.querySelectorAll(".box");
    const playPieces = document.querySelectorAll(".playPiece");
    const linesToClear = []; //may need to move to global scope. maybe game data
    const linesToCheck = [];

    playPieces.forEach((box) => {
      const lineStart = Math.floor((parseInt(box.id.slice(5))-1)/10)*10;
      if (!linesToCheck.includes(lineStart)) {
        linesToCheck.push(lineStart);
      }
    })

    linesToCheck.forEach((line) => {
      let gap = false;
      for (i=0; i<10; i++) {
        if (!allboxes[i].classList.contains("filled")) {
          gap = true;
          break;
        }
      }
      
      if (!gap) {
        linesToClear.push(line); //may need to move to global scope. maybe game data
      } 
    
    
      if (linesToClear) { //may need global scope game data
        clearLines(); //remember to reset linesToClear
      }
    }) 
  }

  function clearLines() {
    
  }
