import React from 'react'

const Search = ({search,setSearch,handleSearch}) => {
  return (
    <div className='search-engine'>
        <input
        type='text'
        placeholder='Enter City Name'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>
            search
        </button>
    </div>
  )
}

export default Search