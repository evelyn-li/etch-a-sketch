const grid = document.querySelector('.grid')
let gridSize = 16
createGrid(gridSize)

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size)

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
    }
}