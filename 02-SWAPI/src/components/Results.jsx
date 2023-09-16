import './results.css'
import './modal.css'
import { useRef, useState } from 'react'
import { useResults } from '../hooks/useResults'
import { Result } from './Result'
import { timeout } from '../services/timeout'

export function Results () {
  const { results, loading, filter, moreResults } = useResults()
  const [modal, setModal] = useState(null)
  const modalContainer = useRef()

  const closeModal = async (e) => {
    if (!(e.target.className === 'modal-container' || e.target.className === 'close-modal')) return
    modalContainer.current.classList.add('fade-out')
    await timeout(100)
    setModal(null)
  }

  return <>
  <div className='results-container'>
    <p className='n-results' style={{ visibility: !loading || filter.page > 1 ? 'visible' : 'hidden' }}>Number of results {results.count}</p>

    <main className='main'>
      <ul className='main-results'>
        {
          results.results.map((result) => <li
          className='result'
          onClick={() => setModal(result)}
          key={result.created}>
            <Result result={result} />
          </li>)
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
    <div ref={modalContainer} className='modal-container' onClick={closeModal}>
      <section className='modal'>
        <div className='close-modal'></div>
        <Result result={modal} all />
      </section>
    </div>
  }
</>
}
