const FIRST_LAYER = document.getElementById("first-layer"), BOARD_GAME = document.getElementById("boardGame")
const START_BUTTON = document.getElementById("startButton")
const ROWS = 15, COLS = 10
const MAIN = document.getElementById("main")
const LEVEL_NUMBER = document.getElementById("number-level"), LEVEL_CHART = document.getElementById("graph-level")
const LINES_NUMBER = document.getElementById("number-lines"), LINES_CHART = document.getElementById("graph-lines")
const LINES_NUMBER2 = document.getElementById("number-lines2"), LINES_CHART2 = document.getElementById("graph-lines2")
const RESULT = document.getElementById("giveResult")
let currentPosition, expectedPosition
let firstTouch, lastTouch
let matrix
var yAxis = 3
var figure
var nextLines, score
var gameLines