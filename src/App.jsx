import { Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import Drawer from './components/Drawer/Drawer.jsx'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import Orders from './pages/Orders.jsx'
import {
  fetchData,
  onAddToCart,
  onAddToFavorite,
  onRemoveItemFromCart,
} from './api/index.js'
import AppContext from './contexts/AppContext'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData(setIsLoading, setCartItems, setFavorites, setItems)
  }, [])

  const onSearchInputChange = (event) => {
    setSearchValue(event.target.value)
  }

  const onClearSearchClick = () => {
    setSearchValue('')
  }

  const onCloseCartClick = () => {
    return setCartOpened(false)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onCloseCartClick,
        setCartItems,
        setFavorites,
      }}>
      <div className='wrapper clear'>
        <Drawer
          onRemoveItemFromCart={onRemoveItemFromCart}
          cartItems={cartItems}
          opened={cartOpened}
        />
        <Header onCartClick={() => setCartOpened(true)} />

        <Route path={process.env.PUBLIC_URL + '/favorites'} exact>
          <Favorites
            searchValue={searchValue}
            onClearSearchClick={onClearSearchClick}
            onSearchInputChange={onSearchInputChange}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        </Route>
        <Route path={process.env.PUBLIC_URL + '/'} exact>
          <Home
            searchValue={searchValue}
            onClearSearchClick={onClearSearchClick}
            onSearchInputChange={onSearchInputChange}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path={process.env.PUBLIC_URL + '/orders'} exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  )
}

export default App
