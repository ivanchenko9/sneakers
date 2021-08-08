import { Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Drawer from './components/Drawer/Drawer.jsx'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'
import Orders from './pages/Orders.jsx'

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
      try {
        const [cartResponce, favoritesResponce, itemResponce] =
          await Promise.all([
            axios.get('https://61090c8ed71b670017639708.mockapi.io/cart'),
            await axios.get(
              'https://61090c8ed71b670017639708.mockapi.io/favorites'
            ),
            axios.get('https://61090c8ed71b670017639708.mockapi.io/items'),
          ])

        setIsLoading(false)
        setCartItems(cartResponce.data)
        setFavorites(favoritesResponce.data)
        setItems(itemResponce.data)
      } catch (error) {
        alert('Ошибка при получении данных!')
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://61090c8ed71b670017639708.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          'https://61090c8ed71b670017639708.mockapi.io/cart',
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert('Не удалось добавть элемент в корзину')
      console.error(error)
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
      console.error(error)
    }
  }

  const onRemoveItemFromCart = (id) => {
    try {
      axios.delete(`https://61090c8ed71b670017639708.mockapi.io/cart/${id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
    } catch (error) {
      alert('Не удалось удалить товар из корзины')
      console.error(error)
    }
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
      }}>
      <div className='wrapper clear'>
        <Drawer
          onRemoveItemFromCart={onRemoveItemFromCart}
          cartItems={cartItems}
          opened={cartOpened}
        />
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
        <Route path='' exact>
          <Home
            searchValue={searchValue}
            onClearSearchClick={onClearSearchClick}
            onSearchInputChange={onSearchInputChange}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path='/orders' exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  )
}

export default App
