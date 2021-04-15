var startTouch, endTouch

MAIN.addEventListener("touchstart", evt => {
    startTouch = evt.touches[0].clientX
})

MAIN.addEventListener("touchend", evt => {
    endTouch = evt.changedTouches[0].clientX
})

if(startTouch > endTouch){
    console.log(`Left`)
}else{
    console.log(`Right`)
}


getRide1stLayer = () => {
    FIRST_LAYER.style.display = "none"
}

startGame = () => {
    var game = new Game()
}