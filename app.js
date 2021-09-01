const grid = document.querySelector('.grid')
const clearBtn = document.querySelector('#clear')
const slider = document.querySelector('input[type="range"]')

let gridSize = 16
let penMode = 'custom-color'
setUp()
let squares = document.querySelectorAll('.square')


function setUp() {
    createGrid(gridSize)
    displayGridSize()

    const brushes = document.querySelectorAll('.brush')
    for (let brush of brushes) {
        brush.addEventListener('click', function () {
            penMode = brush.dataset.name
        })
    }

    clearBtn.addEventListener('click', clearGrid)
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
        else {
            const colorPicker = document.querySelector('input[type="color"]')
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
