import { useContext, useEffect, useRef } from 'react'
import { SearchContext } from '../context/seach'
import debounce from 'just-debounce-it'
import { API, INITIAL_RESULTS } from '../config'
import { formatJson } from '../services/formatJson'

export function useSearch () {
  const context = useContext(SearchContext)
  if (context === undefined) throw new Error('useSearch must be used within a SearchProvider')
  const { filter, setLoading, setResults, setFilter, setSort } = context

  const prevFetch = useRef(null)
  const prevSearch = useRef()

  const changeSearch = debounce((newSearch) => {
    setFilter(prev => ({
      ...prev,
      search: newSearch,
      page: 1
    }))
    setResults({ ...INITIAL_RESULTS })
  }, 500)

  const changeCategory = (newCategory) => {
    setFilter(prev => ({
      ...prev,
      category: newCategory,
      page: 1
    }))
    setResults({ ...INITIAL_RESULTS })
  }

  const changeSort = () => {
    setSort(prev => !prev)
  }

  const changeFilter = ({ category, search }) => {
    setFilter({
      search,
      category,
      page: 1
    })
    setResults({ ...INITIAL_RESULTS })
  }

  useEffect(() => {
    if (filter === prevSearch.current) return
    prevSearch.current = filter

    if (prevFetch.current) {
      prevFetch.current.abort()
      prevFetch.current = null
    }
    const controller = new AbortController()
    prevFetch.current = controller

    const url = `${API}/${filter.category}/?page=${filter.page}&search=${filter.search}`

    setLoading(true)
    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(res)
        return res.json()
      })
      .then(json => {
        const currentJson = formatJson(json)
        setResults(prev => ({
          next: currentJson.next,
          count: currentJson.count,
          results: prev.results.concat(currentJson.results)
        }))
        setLoading(false)
      })
      .catch(error => {
        if (error.name === 'AbortError') return
        console.error(error)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return { changeSearch, changeCategory, changeFilter, changeSort }
}
