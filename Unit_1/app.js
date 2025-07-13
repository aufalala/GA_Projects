window.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");

    for (let i = 0; i < 230; i++) {
        const div = document.createElement("div");
        div.classList.add("box");
        // div.textContent = `#${i + 1}`;
        gameArea.appendChild(div);
    }
    const allBoxes = gameArea.querySelectorAll(".box");
    for (let i = 0; i < 30; i++) {
        allBoxes[i].style.background = "none";
        allBoxes[i].style.border = "none";
    }
})