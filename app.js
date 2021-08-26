const grid = document.querySelector('.grid')
const clearBtn = document.querySelector('#clear')
const slider = document.querySelector('input[type="range"]')

let gridSize = 16
createGrid(gridSize)
displayGridSize()

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
    this.style.backgroundColor = 'black'
}
