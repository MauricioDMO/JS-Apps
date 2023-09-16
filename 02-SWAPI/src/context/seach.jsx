import { createContext, useState } from 'react'
import { INITIAL_FILTER, INITIAL_RESULTS } from '../config'

export const SearchContext = createContext()

export function SearchProvider ({ children }) {
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(INITIAL_FILTER)
  const [results, setResults] = useState(INITIAL_RESULTS)
  const [sort, setSort] = useState(false)

  return (
    <SearchContext.Provider value={
      { loading, setLoading, filter, setFilter, results, setResults, sort, setSort }
    }>
      {children}
    </SearchContext.Provider>
  )
}
