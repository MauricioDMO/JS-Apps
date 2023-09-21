import './results.css'
import './modal.css'
import { useState } from 'react'
import { useResults } from '../hooks/useResults'
import { timeout } from '../services/timeout'
import { Result } from './Result'
import { Modal } from './Modal'

export function Results () {
  const { results, loading, filter, moreResults } = useResults()
  const [modal, setModal] = useState(null)

  const closeModal = async (e) => {
    if (!(e.target.className === 'modal-container' || e.target.className === 'close-modal')) return
    document.querySelector('.modal-container').classList.add('fade-out')
    await timeout(100)
    setModal(null)
  }

  return <>
  <div className='results-container'>
    <p
    className='n-results'
    style={{
      visibility: !loading || filter.page > 1
        ? 'visible'
        : 'hidden'
    }}>
      Number of results {results.count}
    </p>

    <main className='main'>
      <ul className='main-results'>
        {
          results.results.map((result) => (
            <Result
              onClick={() => { setModal(result) }}
              key={result.created}
              result={result}
            />
          ))
        }
      </ul>
    </main>
  </div>
  {!loading && results.next &&
    <button className='more-results' onClick={moreResults}>More results</button>
  }
  {loading &&
    <div className='loader'></div>
  }
  {modal &&
    <Modal onClick={closeModal} result={modal} />
  }
</>
}
