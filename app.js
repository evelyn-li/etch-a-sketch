const grid = document.querySelector('.grid')
const colorPicker = document.querySelector('input[type="color"]')
const randomColorBtn = document.querySelector('#random-color')
const clearBtn = document.querySelector('#clear')
const slider = document.querySelector('input[type="range"]')

let gridSize = 16
let randomColor = false
createGrid(gridSize)
displayGridSize()

randomColorBtn.addEventListener('click', function () {
    randomColor = !randomColor
})
clearBtn.addEventListener('click', clearGrid)
slider.addEventListener('input', displayGridSize)
slider.addEventListener('change', changeGridSize)

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size)

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        square.addEventListener('mouseenter', changeColor)
    }
}

function changeGridSize() {
    gridSize = slider.value
    const squares = document.querySelectorAll('.square')
    for (let square of squares) {
        square.remove()
    }
    createGrid(gridSize)
}

function displayGridSize() {
    document.querySelector('label').textContent = `Grid Size: ${slider.value} x ${slider.value}`
}

function clearGrid() {
    const squares = document.querySelectorAll('.square')
    for (let square of squares) {
        square.style.backgroundColor = ''
    }
}

function changeColor() {
    if (randomColor) {
        this.style.backgroundColor = getRandomColor()
    }
    else {
        this.style.backgroundColor = colorPicker.value
    }
}

function getRandomColor() {
    const rgbValues = []
    for (let i = 0; i < 3; i++) {
        rgbValues.push(Math.floor(Math.random() * 256))
    }
    const [r, g, b] = rgbValues
    return `rgb(${r}, ${g}, ${b})`
}
