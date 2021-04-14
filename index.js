const FIRST_LAYER = document.getElementById("first-layer"), BOARD_GAME = document.getElementById("boardGame")
const START_BUTTON = document.getElementById("startButton")
const ROWS = 15, COLS = 10
const SHAPES = [
    [
        [1,1],
        [1,1]
    ]
]

class Game {
    constructor(){
        this.createGrid()
    }

    createGrid(){
        START_BUTTON.style.display = "none"
        this.grid = []
        for(let i = 0; i < ROWS; i++){
            this.grid.push([])
            for(let j = 0; j < COLS; j++){
                this.grid[this.grid.length - 1].push(0)
            }
        }
        this.renderGrid()
        // console.log(this.grid)
    }

    renderGrid(){
        for(let i = 0; i < ROWS; i++){
            let row = document.createElement("section")
            BOARD_GAME.appendChild(row)
            for(let j = 0; j < COLS; j++){
                let col = document.createElement("div")
                col.dataset.yIndex = i
                col.dataset.xIndex = j
                col.dataset.value = 0
                row.appendChild(col)
            }
        }
        this.drawShape()
    }

    drawShape(x = Math.floor(Math.random() * 7), y = 5){
        console.log()
        let selectedDiv = BOARD_GAME.childNodes[y].childNodes[x]
        return selectedDiv.style.backgroundColor = "red"
    }
}


getRide1stLayer = () => {
    FIRST_LAYER.style.display = "none"
}

startGame = () => {
    var game = new Game()
}