import React from 'react'
import Card from '../components/Card/Card.jsx'
import { AppContext } from '../App.jsx'

const Favorites = ({
  searchValue,
  onClearSearchClick,
  onSearchInputChange,
  onAddToFavorite,
  onAddToCart,
}) => {
  const { favorites } = React.useContext(AppContext)

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Мои закладки'}
        </h1>
        <div className='search__block d-flex'>
          <img src='/img/search.svg' alt='Searchr' />
          {searchValue && (
            <img
              className='clear cu-p'
              src='/img/btn-remove.svg'
              alt='Close'
              onClick={onClearSearchClick}
            />
          )}
          <input
            placeholder='Поиск...'
            onChange={onSearchInputChange}
            value={searchValue}
          />
        </div>
      </div>
      <div className='d-flex flex-wrap'>
        {favorites
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imagePath={item.imagePath}
              onFavoriteClick={(obj) => onAddToFavorite(obj)}
              onPlusButtonClick={(obj) => onAddToCart(obj)}
              favorited={true}
            />
          ))}
      </div>

      <div className='d-flex flex-wrap'></div>
    </div>
  )
}

export default Favorites
