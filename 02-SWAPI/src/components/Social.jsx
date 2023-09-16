import './social.css'

export function Social ({ link, social }) {
  return <a className='social' href={link} title={`${social} of MauricioDMO`} target="_blank" rel="noreferrer">
  <svg>
    <use href={`/social.svg#${social}`} />
  </svg>
  </a>
}
