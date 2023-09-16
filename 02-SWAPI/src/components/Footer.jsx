import './footer.css'
import { Social } from './Social'

export function Footer () {
  return <footer>
  <div className='social'>
    <Social link='https://www.linkedin.com/in/mauriciodmo/' social='linkedin' />
    <Social link='https://github.com/MauricioDMO' social='github' />
  </div>
  <span>
    Made By MauricioDMO
  </span>
</footer>
}
