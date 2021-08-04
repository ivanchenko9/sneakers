import { Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Drawer from './components/Drawer/Drawer.jsx'
import Header from './components/Header/Header.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Favorites.jsx'

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    axios
      .get('https://61090c8ed71b670017639708.mockapi.io/items')
      .then((res) => setItems(res.data))
    axios
      .get('https://61090c8ed71b670017639708.mockapi.io/cart')
      .then((res) => setCartItems(res.data))
    axios
      .get('https://61090c8ed71b670017639708.mockapi.io/favorites')
      .then((res) => setFavorites(res.data))
  }, [])

  const onAddToCart = (obj) => {
    axios.post('https://61090c8ed71b670017639708.mockapi.io/cart', obj)
    setCartItems((prev) => [...prev, obj])
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((item) => item.id === obj.id)) {
        axios.delete(
          `https://61090c8ed71b670017639708.mockapi.io/favorites/${obj.id}`
        )
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id))
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

  return (
    <div className='wrapper clear'>
      {cartOpened && (
        <Drawer
          onRemoveItemFromCart={onRemoveItemFromCart}
          onCloseCartClick={() => setCartOpened(false)}
          cartItems={cartItems}
        />
      )}
      <Header onCartClick={() => setCartOpened(true)} />

      <Route path='/favorites'>
        <Favorites
          favorites={favorites}
          searchValue={searchValue}
          onClearSearchClick={onClearSearchClick}
          onSearchInputChange={onSearchInputChange}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>
      <Route path='/' exact>
        <Home
          items={items}
          searchValue={searchValue}
          onClearSearchClick={onClearSearchClick}
          onSearchInputChange={onSearchInputChange}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
        />
      </Route>
    </div>
  )
}

export default App
