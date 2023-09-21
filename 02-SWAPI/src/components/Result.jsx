import { useRef } from 'react'
import { ResultText } from './ResultText'
import { getRandomImg } from '../services/getRandomImg'

export function Result ({ result, onClick }) {
  const style = useRef(getRandomImg())
  return <li
  className='result'
  onClick={onClick}
  style={style.current}
  >
    <ResultText result={result} />
  </li>
}
