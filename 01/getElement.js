'use strict';

const getCurrentElement = ({element, x, y}) => { // Retornar el elemento mas bajo de la col
  let currentElement = element
  if (element.classList.contains('red') ||
      element.classList.contains('yellow')) return [false, x, y]
  
  while (y > 0) {
    --y
    if (grid[x][y].classList.contains('red') ||
    grid[x][y].classList.contains('yellow')) return [currentElement, x, ++y]
    currentElement = grid[x][y]
  }
  return [currentElement, x, y]
}