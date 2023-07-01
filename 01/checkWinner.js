'use strict';

const vertical = ({grid, color, x, y}) => {
  let descended = 0
  while (y > 0) {
    y--
    descended++
    if (!grid[x][y].classList.contains(color)) return false
    if (descended == 3) return color
  }
  return false
}

const diagonal = ({grid, color, x, y}) => {
  let connect = 1
  let [tempX, tempY] = [x, y]
  
  for (let i = 0; i < 3; i++) {
    if (tempX < 6) ++tempX;
    else break
    if (tempY < 5) ++tempY;
    else break

    if (grid[tempX][tempY].classList.contains(color)) {
      connect++
    } else break
  }

  [tempX, tempY] = [x, y]

  for (let i = 0; i < 3; i++) {
    if (tempX > 0) --tempX;
    else break
    if (tempY > 0) --tempY;
    else break

    if (grid[tempX][tempY].classList.contains(color)) {
      connect++
    } else break
  }

  if (connect >= 4) return color

  connect = 1;
  [tempX, tempY] = [x, y]
  
  for (let i = 0; i < 3; i++) {
    if (tempX > 0) --tempX;
    else break
    if (tempY < 5) ++tempY;
    else break

    if (grid[tempX][tempY].classList.contains(color)) {
      connect++
    } else break
  }

  [tempX, tempY] = [x, y]

  for (let i = 0; i < 3; i++) {
    if (tempX < 6) ++tempX;
    else break
    if (tempY > 0) --tempY;
    else break
    
    if (grid[tempX][tempY].classList.contains(color)) {
      connect++
    } else break
  }

  if (connect >= 4) return color
  return false
}

const horizontal = ({grid, color, x, y}) => {
  let connect = 1
  let tempX = x

  for (let i = 0; i < 3; i++) {
    if (tempX > 0) --tempX;
    else break

    if (grid[tempX][y].classList.contains(color)) {
      connect++
    } else break
  }
  tempX = x
  for (let i = 0; i < 3; i++) {
    if (tempX < 6) ++tempX;
    else break
    if (grid[tempX][y].classList.contains(color)) {
      connect++
    } else break
  }
  if (connect >= 4) return color
  return false

}

const checkWinner = ({grid, currentColor: color, currentX: x, currentY: y}) => {

  let winner = vertical({grid, color, x, y})
  if (winner) return winner

  winner = horizontal({grid, color, x, y})
  if (winner) return winner

  winner = diagonal({grid, color, x, y})
  return winner
}