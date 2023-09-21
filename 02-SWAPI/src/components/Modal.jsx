import { useRef } from 'react'
import { getRandomImg } from '../services/getRandomImg'
import { ResultText } from './ResultText'

export function Modal ({ onClick, result }) {
  const style = useRef(getRandomImg())

  return <section className='modal-container' onClick={onClick}>
  <div className='modal' style={style.current}>
    <div className='close-modal'></div>
      <ResultText result={result} all />
  </div>
</section>
}
