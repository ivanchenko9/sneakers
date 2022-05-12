import React from 'react'
import { AppContext } from '../contexts/AppContext'
import Card from '../components/Card/Card.jsx'
import staticImgsAndSvgs from '../../public/img'

const Home = ({
  searchValue,
  onClearSearchClick,
  onSearchInputChange,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) => {
  const { items, favorites, setCartItems, setFavorites } =
    React.useContext(AppContext)

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onFavoriteClick={(obj) => onAddToFavorite(obj, favorites, setFavorites)}
        onPlusButtonClick={(obj) => onAddToCart(obj, items, setCartItems)}
        favorited={favorites.some(
          (obj) => Number(obj.parentId) === Number(item.id)
        )}
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
          <img src={`${staticImgsAndSvgs.search}`} alt='Search' />
          {searchValue && (
            <img
              className='clear cu-p'
              src={`${staticImgsAndSvgs.btnRemove}`}
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
