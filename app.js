const grid = document.querySelector('.grid')
const colorPicker = document.querySelector('#custom-color')
const clearBtn = document.querySelector('#clear')
const gridLinesSwitch = document.querySelector('#grid-lines')
const slider = document.querySelector('input[type="range"]')

let gridSize = 16
let penMode = 'custom-color'
let gridLinesOn = true
setUp()
let squares = document.querySelectorAll('.square')


function setUp() {
    createGrid(gridSize)
    displayGridSize()

    const brushes = document.querySelectorAll('.brush')
    for (let brush of brushes) {
        brush.addEventListener('click', function () {
            document.querySelector('.active').classList.remove('active')
            penMode = brush.dataset.name
            brush.classList.add('active')
        })
    }

    colorPicker.classList.add('active')
    clearBtn.addEventListener('click', clearGrid)
    gridLinesSwitch.addEventListener('change', toggleGridLines)
    slider.addEventListener('input', displayGridSize)
    slider.addEventListener('change', changeGridSize)
}

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size)

    // prevent "no-drop" cursor from showing up on some clicks
    grid.addEventListener('mousedown', function (e) {
        e.preventDefault()
    })

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)

        square.addEventListener('mouseover', changeColor)
        square.addEventListener('mousedown', changeColor)

        if (gridLinesOn) {
            square.classList.add('grid-lines')
        }
    }
}

function changeGridSize() {
    for (let square of squares) {
        square.remove()
    }
    gridSize = slider.value
    createGrid(gridSize)
    squares = document.querySelectorAll('.square')
}

function displayGridSize() {
    const gridSizeDisplay = document.querySelector('label[for="grid-size"]')
    gridSizeDisplay.textContent = `Grid Size: ${slider.value} x ${slider.value}`
}

function toggleGridLines() {
    gridLinesOn = !gridLinesOn
    for (let square of squares) {
        square.classList.toggle('grid-lines')
    }
    grid.classList.toggle('grid-lines')
}

function clearGrid() {
    for (let square of squares) {
        square.style.backgroundColor = ''
    }
}

// draw when mouse button is down
function changeColor(event) {
    if (event.buttons === 1) {
        if (penMode === 'random-color') {
            this.style.backgroundColor = getRandomColor()
        }
        else if (penMode === 'eraser') {
            this.style.backgroundColor = ''
        }
        else if (penMode === 'background-color') {
            changeBackgroundColor()
        }
        else {
            this.style.backgroundColor = colorPicker.value
        }
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgb(${r}, ${g}, ${b})`
}

function changeBackgroundColor() {
    const bgColorPicker = document.querySelector('#background-color')
    for (let square of squares) {
        if (!square.style.backgroundColor) {
            square.style.backgroundColor = bgColorPicker.value
        }
    }
}
