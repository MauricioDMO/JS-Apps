import { Filter } from './components/Filter'
import { Results } from './components/Results'
import { SearchProvider } from './context/seach'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App () {
  return (
    <>
      <Header />
      <SearchProvider>
        <Filter />
        <Results />
      </SearchProvider>
      <Footer />
    </>
  )
}

export default App
