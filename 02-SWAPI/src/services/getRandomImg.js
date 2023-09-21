import { getRandomInt } from './getRandomInt'

export function getRandomImg () {
  return {
    '--image': `url("/random-bg/${getRandomInt(1, 10)}.svg")`
  }
}
