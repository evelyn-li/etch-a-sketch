const grid = document.querySelector('.grid')
const clearBtn = document.querySelector('#clear')

let gridSize = 16
createGrid(gridSize)

clearBtn.addEventListener('click', function () {
    const squares = document.querySelectorAll('.square')
    for (let square of squares) {
        square.style.backgroundColor = ''
    }
})

function createGrid(size) {
    document.documentElement.style.setProperty('--grid-size', size)

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        square.addEventListener('mouseenter', changeColor)
    }
}

function changeColor() {
    this.style.backgroundColor = 'black'
}