import './header.css'
import { useRef } from 'react'

export function Header () {
  const audio = useRef(new Audio('/Darth-vader-breathing.mp3'))
  audio.current.volume = 0.4

  const handleSound = () => {
    audio.current.play()
  }

  return <header className='star-wars-tittle-container'>
    <div className='title-image'></div>
    <div className='vader' onClick={handleSound}></div>
    <div className='stormtrooper'></div>
    <h1 className='star-wars-tittle'>Explore Star Wars</h1>
  </header>
}
