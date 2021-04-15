class Figure {
    constructor(){
        this.x = Math.floor(Math.random() * 7)
        this.y = 3
        this.shape = Math.floor(Math.random() * 3)
        this.firstAppear()
    }

    firstAppear(){
        switch(this.shape){
            case 0:
                this.color = `#ff0000`
                BOARD_GAME.childNodes[this.y].childNodes[this.x].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y].childNodes[this.x + 2].style.backgroundColor = this.color
            break;
            case 1:
                this.color = `#0000ff`
                BOARD_GAME.childNodes[this.y].childNodes[this.x].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y + 1].childNodes[this.x].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y + 2].childNodes[this.x].style.backgroundColor = this.color
            break;
            case 2:
                this.color = `#00ff00`
                BOARD_GAME.childNodes[this.y].childNodes[this.x].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y].childNodes[this.x + 1].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y + 1].childNodes[this.x].style.backgroundColor = this.color
                BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1].style.backgroundColor = this.color
            break;
        }

        this.down()
    }

    down(){
        let currentPosition
        let expectedPosition
        switch(this.shape){
            case 0:
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x], 
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 2]
                ]
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x], 
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 2]
                ]
            break;
            case 1:
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x]
                ]
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 3].childNodes[this.x]
                ]
            break;
            case 2:
                currentPosition = [
                    BOARD_GAME.childNodes[this.y].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1]
                ]
                expectedPosition = [
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 1].childNodes[this.x + 1],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x],
                    BOARD_GAME.childNodes[this.y + 2].childNodes[this.x + 1]
                ]
            break;
        }

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
                    this.movement(currentPosition, expectedPosition)
                }else if(this.shape === 1 && this.y === 14){
                    this.movement(currentPosition, expectedPosition)
                }else if(this.shape === 2 && this.y === 15){
                    this.movement(currentPosition, expectedPosition)
                } else{
                    currentPosition.forEach(position => {
                        position.style.backgroundColor = "transparent"
                    })
    
                    expectedPosition.forEach(position => {
                        position.style.backgroundColor = this.color
                    })

                    this.y++
                    this.down()
                }
            }else{
                currentPosition.forEach(position => {
                    position.dataset.value = 1
                })

                console.log(`Floor reached`)

                var figure = new Figure()
            }
        }, 1000)
    }

    movement(current, expected){
        current.forEach(position => {
            position.style.backgroundColor = "transparent"
        })

        expected.forEach(position => {
            position.style.backgroundColor = this.color
        })

        expected.forEach(position => {
            position.dataset.value = 1
        })

        console.log(`Floor reached`)

        var figure = new Figure()
    }
}

class Game {
    constructor(){
        this.createGrid()
    }

    createGrid(){
        START_BUTTON.style.display = "none"

        for(let i = 0; i < ROWS; i++){
            let row = document.createElement("section")
            BOARD_GAME.appendChild(row)

            for(let j = 0; j < COLS; j++){
                let col = document.createElement("div")
                col.dataset.x = j
                col.dataset.y = i
                col.dataset.value = 0
                row.appendChild(col)
            }
        }

        var figure = new Figure()
    }
}