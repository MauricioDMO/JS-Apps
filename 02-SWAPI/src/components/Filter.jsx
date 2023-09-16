import { categories } from '../config'
import { useSearch } from '../hooks/useSearch'
import { capitalize } from '../services/capitalize'
import './filter.css'

export function Filter () {
  const { changeSearch, changeCategory, changeFilter, changeSort } = useSearch()

  const handleSearch = (e) => {
    const text = e.target.value
    changeSearch(text)
  }

  const handleCategory = (e) => {
    const category = e.target.value
    changeCategory(category)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    changeFilter({
      category: data.get('category'),
      search: data.get('search')
    })
  }

  return <form onSubmit={handleSubmit} className='filter'>
    <label className='search'>
      Search: <input name="search"
        autoComplete='off'
        onChange={handleSearch}
        placeholder="Luke, Vader..."
        type="text"
        />
    </label>
    <label className='category'>
      Category: <select
        name="category"
        onChange={handleCategory}>{
          Object.getOwnPropertyNames(categories)
            .map(category => (
            <option
            key={category}
            value={category}
            >
              {capitalize(category)}
            </option>
            ))}
      </select>
    </label>
    <label className='sort' htmlFor='sort'>
      Sort by name:
      <input name="sort" id='sort' onChange={changeSort} type='checkbox' />
      <div className='checkbox' tabIndex='0'></div>
    </label>

    <input type="submit" />
  </form>
}
