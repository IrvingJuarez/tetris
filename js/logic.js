class Figure {
    constructor(){
        this.x = Math.floor(Math.random() * 8)
        this.y = yAxis
        this.shape = Math.floor(Math.random() * 5)
        this.firstAppear()
    }

    firstAppear(){
        switch(this.shape){
            case 0:
                this.color = `#ff0000`
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x], 
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 2]
                ]
            break;
            case 1:
                this.color = `#0000ff`
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x]
                ]
            break;
            case 2:
                this.color = `#00ff00`
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1]
                ]
            break;
            case 3:
                this.color = `#ffff00`
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x]
                ]
            break;
            case 4:
                this.color = `#00ffff`
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1]
                ]
            break;
        }

        currentPosition.forEach(cell => {
            cell.style.backgroundColor = this.color
        })

        this.down()
    }

    down(){
        this.setExpectedPosition()
        
        setTimeout(() => {
            let nextAvailable = expectedPosition.filter(position => {
                if(position.dataset.value == 0){
                    return null
                }else {
                    return 1
                }
            })

            if(nextAvailable.length === 0){
                if(this.shape === 0 && this.y === 16){
                    this.movement()
                }else if(this.shape === 1 && this.y === 14){
                    this.movement()
                }else if(this.shape === 2 && this.y === 15){
                    this.movement()
                }else if(this.shape === 3 && this.y === 15){
                    this.movement()
                }else if(this.shape === 4 && this.y === 15){
                    this.movement()
                }else{
                    currentPosition.forEach(position => {position.style.backgroundColor = "transparent"})
    
                    expectedPosition.forEach(position => {position.style.backgroundColor = this.color})

                    for(let i = 0; i < currentPosition.length; i++){currentPosition[i] = expectedPosition[i]}
                    
                    this.y++
                    this.down()
                }
            }else{
                currentPosition.forEach(position => {position.dataset.value = 1})

                if(this.updateMatrix()){
                    if(score.length === 20){
                        this.win = true
                        this.giveResult()
                    }else{
                        this.newFigure()
                    }
                }else{
                    this.lose = true
                    this.giveResult()
                }
            }
        }, 1000)
    }

    setExpectedPosition(){
        switch(this.shape){
            case 0:
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x], 
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 2]
                ]
            break;
            case 1:
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 3].childNodes[this.x]
                ]
            break;
            case 2:
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x + 1]
                ]
            break;
            case 3:
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x]
                ]
            break;
            case 4:
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x + 1]
                ]
            break;
        }
    }

    movement(){
        currentPosition.forEach(position => {position.style.backgroundColor = "transparent"})

        expectedPosition.forEach(position => {position.style.backgroundColor = this.color})

        expectedPosition.forEach(position => {position.dataset.value = 1})

        if(this.updateMatrix()){
            if(score.length === 20){
                this.win = true
                this.giveResult()
            }else{
                this.newFigure()
            }
        }else{
            this.lose = true
            this.giveResult()
        }
    }

    giveResult(){
        if(this.win === true){
            RESULT.innerHTML = `You win. Congrats 🥳`
            setTimeout(() => {
                FIRST_LAYER.style.display = "flex"
            }, 2000)
        }else if(this.lose === true){
            RESULT.innerHTML = `You lose. 😿`
            FIRST_LAYER.style.display = "flex"
        }
    }    

    newFigure(){figure = new Figure()}

    updateMatrix(){
        for(let i = 0; i < ROWS; i++){
            for(let j = 0; j < COLS; j++){
                matrix[i][j] = BOARD_GAME.childNodes[i + 3].childNodes[j].dataset.value
            }
        }

        let row2Available = 0
        for(let i = 0; i < COLS; i++){
            row2Available += Number(matrix[2][i])
        }

        if(row2Available === 0){
            this.isNewLine()
            return true
        }else{
            return false
        }
    }

    isNewLine(){
        let i = ROWS - 1
        let sumOfLine = 0

        while(sumOfLine < 10){
            for(let j = 0; j < COLS; j++){
                sumOfLine += Number(matrix[i][j])
            }

            if(sumOfLine == 10){
                nextLines = []
                score.push(0)
                gameLines++
                LINES_NUMBER.innerHTML = gameLines
                LINES_CHART.style.strokeDashoffset = `calc(125 - (${gameLines} * 125)/20 )`
                LINES_NUMBER2.innerHTML = gameLines
                LINES_CHART2.style.strokeDashoffset = `calc(125 - (${gameLines} * 125)/20 )`
                this.newLine(i + 3, i + 2)
            }else{
                sumOfLine = 0
                i--

                if(i === 2){
                    sumOfLine = 10
                }
            }
        }
    }

    newLine(currentLine, aboveLine){
        let areAboveCells = 0

        for(let i = 0; i < COLS; i++){
            let aboveCell = BOARD_GAME.childNodes[aboveLine].childNodes[i]
            areAboveCells += Number(aboveCell.dataset.value)
        }

        if(areAboveCells === 0){
            nextLines.push(aboveLine)

            for(let i = 0; i < COLS; i++){
                let cell = BOARD_GAME.childNodes[Number(nextLines[0] + 1)].childNodes[i]
                cell.style.backgroundColor = "transparent"
                cell.dataset.value = 0
            }

            setTimeout(this.cellsDown, 1000)
        }else{
            nextLines.push(aboveLine)
            this.newLine(aboveLine, aboveLine - 1)
        }
    }

    cellsDown(){
        for(let i = 0; i < nextLines.length; i++){
            for(let j = 0; j < COLS; j++){
                let cellBelow = BOARD_GAME.childNodes[Number(nextLines[i]) + 1].childNodes[j]
                let currentCell = BOARD_GAME.childNodes[Number(nextLines[i])].childNodes[j]

                cellBelow.style.backgroundColor = currentCell.style.backgroundColor
                cellBelow.dataset.value = currentCell.dataset.value

                currentCell.dataset.value = 0
            }
        }
        nextLines = []
    }
}

class Game {
    constructor(){
        this.createGrid()
        score = []
        LEVEL_NUMBER.innerHTML = 1
        LEVEL_CHART.style.strokeDashoffset = 0
        gameLines = 0
    }

    createGrid(){
        START_BUTTON.style.display = "none"
        matrix = []

        for(let i = 0; i < ROWS; i++){
            let row = document.createElement("section")
            BOARD_GAME.appendChild(row)

            let rowMatrix = []
            matrix.push(rowMatrix)

            for(let j = 0; j < COLS; j++){
                let col = document.createElement("div")
                col.dataset.x = j
                col.dataset.y = i
                col.dataset.value = 0
                row.appendChild(col)

                rowMatrix.push(col.dataset.value)
            }
        }

        figure = new Figure()
        this.controls()
    }

    setCurrentPosition(){
        for(let i = 0; i < currentPosition.length; i++){
            currentPosition[i] = expectedPosition[i]
        }
        return currentPosition
    }

    move(){
        currentPosition.forEach(cell => {
            cell.style.backgroundColor = "transparent"
        })
        expectedPosition.forEach(cell => {
            cell.style.backgroundColor = figure.color
        })

        this.setCurrentPosition()
        figure.setExpectedPosition()
    }

    comprobation(){
        let comprobation = expectedPosition.filter(position => {

            if(position.dataset.value == 0){
                return null
            }else {
                return 1
            }
        })

        if(comprobation.length === 0){
            switch(this.side){
                case `right`:
                    figure.x++
                break;
                case `left`:
                    figure.x--
                break;
            }

            this.move()
        }else{
            figure.setExpectedPosition()
        }
    }

    expectedRight(){
        
        switch(figure.shape){
            case 0:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 2],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 3]
                ]
            break;
            case 1:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y + 2].childNodes[figure.x + 1]
                ]
            break;
            case 2:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 2],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 2]
                ]
            break;
            case 3:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 2],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 1]
                ]
            break;
            case 4:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 2],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x + 2]
                ]
            break;
        }

        this.side = `right`
        this.comprobation()
    }

    expectedLeft(){
        
        switch(figure.shape){
            case 0:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x + 1]
                ]
            break;
            case 1:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y + 2].childNodes[figure.x - 1]
                ]
            break;
            case 2:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x]
                ]
            break;
            case 3:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x - 1]
                ]
            break;
            case 4:
                expectedPosition = [
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x - 1],
                    BOARD_GAME.childNodes[figure.y].childNodes[figure.x],
                    BOARD_GAME.childNodes[figure.y + 1].childNodes[figure.x]
                ]
            break;
        }

        this.side = `left`
        this.comprobation()
    }

    leftBorder() {
        (figure.x === 0) ? console.log(`No left`) : this.expectedLeft()
    }

    rightBorder() {
        if(figure.shape === 0){
            if(figure.x === 7){
                // console.log(`No right`)
            }else{
                this.expectedRight()
            }
        }else if(figure.shape === 1){
            if(figure.x === 9){
                // console.log(`No right`)
            }else{
                this.expectedRight()
            }
        }else if(figure.shape === 2){
            if(figure.x === 8){
                // console.log(`No right`)
            }else{
                this.expectedRight()
            }
        }else if(figure.shape === 3){
            if(figure.x === 8){
                // console.log(`No right`)
            }else{
                this.expectedRight()
            }
        }else if(figure.shape === 4){
            if(figure.x === 8){
                // console.log(`No right`)
            }else{
                this.expectedRight()
            }
        }
    }

    direction(){
        if(firstTouch === lastTouch){
            console.log(`Tap.`)
        }else if(firstTouch > lastTouch) {
            this.leftBorder()
        }else{
            this.rightBorder()
        }
    }

    controls(){
        MAIN.addEventListener("touchstart", evt => {
            firstTouch = evt.touches[0].clientX
        })
        
        MAIN.addEventListener("touchend", evt => {
            lastTouch = evt.changedTouches[0].clientX
            this.direction()
        })

        document.addEventListener("keyup", evt => {
            if(evt.keyCode === 37){
                this.leftBorder()
            }else if(evt.keyCode === 39){
                this.rightBorder()
            }
        })
    }

}