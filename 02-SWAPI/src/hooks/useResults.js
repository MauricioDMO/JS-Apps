import { useContext, useMemo } from 'react'
import { SearchContext } from '../context/seach'

export function useResults () {
  const { results, loading, filter, setFilter, sort } = useContext(SearchContext)

  const moreResults = () => {
    setFilter(prev => {
      return {
        ...prev,
        page: prev.page + 1
      }
    }
    )
  }

  const sortedResults = useMemo(() => ({
    ...results,
    results: sort ? results.results.toSorted((a, b) => a.name.localeCompare(b.name)) : results.results
  }), [results, sort])

  return { results: sortedResults, loading, filter, moreResults }
}
