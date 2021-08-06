import { Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Drawer from './components/Drawer/Drawer.jsx'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'

export const AppContext = React.createContext({})

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const cartResponce = await axios.get(
        'https://61090c8ed71b670017639708.mockapi.io/cart'
      )
      const favoritesResponce = await axios.get(
        'https://61090c8ed71b670017639708.mockapi.io/favorites'
      )
      const itemResponce = await axios.get(
        'https://61090c8ed71b670017639708.mockapi.io/items'
      )
      setIsLoading(false)
      setCartItems(cartResponce.data)
      setFavorites(favoritesResponce.data)
      setItems(itemResponce.data)
    }

    fetchData()
  }, [])

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://61090c8ed71b670017639708.mockapi.io/cart/${obj.id}`
        )
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        axios.post('https://61090c8ed71b670017639708.mockapi.io/cart', obj)
        setCartItems((prev) => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавть элемент в корзину')
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(
          `https://61090c8ed71b670017639708.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        )
      } else {
        const { data } = await axios.post(
          'https://61090c8ed71b670017639708.mockapi.io/favorites',
          obj
        )
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное!')
    }
  }

  const onRemoveItemFromCart = (id) => {
    axios.delete(`https://61090c8ed71b670017639708.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

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
    return cartItems.some((obj) => Number(obj.id) === Number(id))
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
      }}>
      <div className='wrapper clear'>
        {cartOpened && (
          <Drawer
            onRemoveItemFromCart={onRemoveItemFromCart}
            cartItems={cartItems}
          />
        )}
        <Header onCartClick={() => setCartOpened(true)} />

        <Route path='/favorites'>
          <Favorites
            searchValue={searchValue}
            onClearSearchClick={onClearSearchClick}
            onSearchInputChange={onSearchInputChange}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
          />
        </Route>
        <Route path='/' exact>
          <Home
            // items={items}
            // cartItems={cartItems}
            // favorites={favorites}
            searchValue={searchValue}
            onClearSearchClick={onClearSearchClick}
            onSearchInputChange={onSearchInputChange}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
      </div>
    </AppContext.Provider>
  )
}

export default App
