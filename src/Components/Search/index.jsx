import React, { useState } from 'react'
import * as _ from 'underscore'
import './search.css'

const Search = ({
  mobileClass,
  searchFunc,
  optionsData,
  pageSize
}) => {

  const [selectedFilter, setFilter] = useState('')
  const searchProducts = (val, code) => {
    console.log(val)
    if (code === 13) {
      searchFunc(pageSize, 0, val)
    } else if (code === 8 && val === '') {
      searchFunc(pageSize, 0, val)
    }
  }
  const debouncedSearch = e => {
    e.persist()
    _.debounce(searchProducts, 1000)(e.currentTarget.value, e.which)
  }

  let options = ''
  if (optionsData && optionsData.length) {
    options = (
      optionsData.map((el, index) => (
        <option key={`${el}_${index}`} value={el}>{el}</option>
      ))
    )
  }

  const filterData = e => {
    setFilter(e.target.value)
    searchFunc(pageSize, 0, '', e.target.value)
  }

  return (
    <div className='search-input'>
      <div className={`${mobileClass ? mobileClass: ''}`}>
        <input type="text" id="search-input" placeholder="Search" onKeyUp={debouncedSearch} />
      </div>
      <div className="filter">
        <div>Category: </div>
        <select name="" id="" value={selectedFilter} onChange={e => filterData(e)}>
          <option value="">
            Select a category
          </option>
          {options}
        </select>
      </div>
    </div>
  )
}

export default Search