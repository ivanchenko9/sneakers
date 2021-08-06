import React from 'react'
import { AppContext } from '../App.jsx'
import Card from '../components/Card/Card.jsx'

const Home = ({
  // items,
  // cartItems,
  // favorites,
  searchValue,
  onClearSearchClick,
  onSearchInputChange,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const { items, favorites } = React.useContext(AppContext)

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        // id={item.id}
        // name={item.name}
        // price={item.price}
        // imagePath={item.imagePath}
        onFavoriteClick={(obj) => onAddToFavorite(obj)}
        onPlusButtonClick={(obj) => onAddToCart(obj)}
        //isAddedToCart={isItemAdded(item && item.id)}
        favorited={favorites.some((obj) => Number(obj.id) === Number(item.id))}
        isLoading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}
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

      <div className='d-flex flex-wrap'>{renderItems()}</div>
    </div>
  )
}

export default Home
