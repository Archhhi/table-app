import React from 'react'
import './styles.css'

interface SearchPropsTypes {
  searchValue: string
  setSearchValue: (searchValue: string) => void
}

function Search({ searchValue, setSearchValue }: SearchPropsTypes) {
  const onChangeSearchValue = (searchValue: string) => {
    setSearchValue(searchValue)
  }

  return (
    <div className={'searchWrapper'}>
      <input
        type={'text'}
        value={searchValue}
        placeholder={'Введите название товара...'}
        onChange={(e) => onChangeSearchValue(e.target.value)}
      />
    </div>
  )
}

export default Search
