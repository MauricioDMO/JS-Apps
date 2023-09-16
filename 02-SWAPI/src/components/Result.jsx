import './result.css'
import { capitalize } from '../services/capitalize'

export function Result ({ result, all }) {
  const { name } = result
  const currentEntries = Object.entries(result)
    .filter(entry => !['name', 'created', 'edited'].includes(entry[0]))
  return <>
    <h2 className="name">{name}</h2>
    {all
      ? currentEntries.map(([prop, value]) => <p key={prop}>
          <b>{capitalize(prop.split('_').join(' '))}:</b> {value}
        </p>)
      : currentEntries.slice(0, 2).map(([prop, value]) => <p key={prop}>
      <b>{capitalize(prop.split('_').join(' '))}:</b> {value}
    </p>)
      }
  </>
}
