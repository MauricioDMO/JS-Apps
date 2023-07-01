"use strict";


const column0 = [...document.querySelectorAll(".casilla:nth-child(7n + 1) .ficha")].reverse()
const column1 = [...document.querySelectorAll(".casilla:nth-child(7n + 2) .ficha")].reverse()
const column2 = [...document.querySelectorAll(".casilla:nth-child(7n + 3) .ficha")].reverse()
const column3 = [...document.querySelectorAll(".casilla:nth-child(7n + 4) .ficha")].reverse()
const column4 = [...document.querySelectorAll(".casilla:nth-child(7n + 5) .ficha")].reverse()
const column5 = [...document.querySelectorAll(".casilla:nth-child(7n + 6) .ficha")].reverse()
const column6 = [...document.querySelectorAll(".casilla:nth-child(7n) .ficha")].reverse()
const grid = [column0, column1, column2, column3, column4, column5, column6]

const mask = document.querySelector(".mask")
// const gridContainer = document.querySelector(".grid-container")
const resultsContainer = document.querySelector('.results-container')
const results = document.querySelector('.results')

let currentColor = 'red'
let moves = 0

grid.forEach((col) => { // Dar la funcionalidad a cada ficha
  col.forEach((element) => {
    element.addEventListener('click', (e) => {

      const element = e.target
      const x = element.attributes.getNamedItem('x').value
      const y = element.attributes.getNamedItem('y').value

      const [currentElement, currentX, currentY] = getCurrentElement({element, x, y})
      if (!currentElement) return

      currentElement.classList.add(currentColor, 'fall')

      const winner = checkWinner({grid, currentColor, currentX, currentY})
      if (winner) {
        showWinner(winner)
        return
      }
      

      currentColor = (currentColor == 'red') ? 'yellow' : 'red'
      toggleShadow();
      moves++;
      if (moves >= 42) reset();
    })
  })
})

const showWinner = (winner) => {
  const color = winner == 'red' ? 'Rojo' : 'Amarillo'
  results.innerHTML = `<h2 class="ganador ${winner}">¡Gana el jugador ${color}!</h2>
  <p>Movimientos totales: ${moves}</p>`
  resultsContainer.classList.remove("hidden")
}

const toggleShadow = () => {
  mask.classList.toggle('red-border')
  mask.classList.toggle('yellow-border')
}

const reset = () => {
  grid.forEach((col) => {
    col.forEach((element) => {
      element.classList.add('vanish')
    })
  })
  setTimeout(() => {
    grid.forEach(col => {
    col.forEach(element => {
      element.classList.add('vanish')
        element.classList.remove('red', 'yellow', 'fall', 'vanish')
      })
    })
  }, 100)
  resultsContainer.classList.add("hidden")
  mask.classList.remove('yellow-border')
  mask.classList.add('red-border')
  currentColor = 'red'
  moves = 0
}
resultsContainer.addEventListener("click", reset)

const resetButton = document.getElementById('reset')
resetButton.addEventListener('click', reset)