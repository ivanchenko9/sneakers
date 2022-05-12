import axios from 'axios'
import ENDPOINTS from '../constans/endpoints'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const fetchData = async (
  setIsLoading,
  setCartItems,
  setFavorites,
  setItems
) => {
  try {
    const [cartResponce, favoritesResponce, itemResponce] = await Promise.all([
      axios.get(ENDPOINTS.CART),
      await axios.get(ENDPOINTS.FAVORITES),
      axios.get(ENDPOINTS.ITEMS),
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

export const onAddToCart = async (obj, cartItems, setCartItems) => {
  try {
    const findItem = cartItems.find(
      (item) => Number(item.parentId) === Number(obj.id)
    )
    if (findItem) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.parentId) !== Number(obj.id))
      )
      await axios.delete(`${ENDPOINTS.CART}/${findItem.id}`)
    } else {
      setCartItems((prev) => [...prev, obj])
      const { data } = await axios.post(ENDPOINTS.CART, obj)
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

export const onAddToFavorite = async (obj, favorites, setFavorites) => {
  try {
    if (favorites.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`${ENDPOINTS.FAVORITES}/${obj.id}`)
      setFavorites((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      )
    } else {
      const { data } = await axios.post(ENDPOINTS.FAVORITES, obj)
      setFavorites((prev) => [...prev, data])
    }
  } catch (error) {
    alert('Не удалось добавить в избранное!')
    console.error(error)
  }
}

export const onRemoveItemFromCart = (id, setCartItems) => {
  try {
    axios.delete(`${ENDPOINTS.CART}/${id}`)
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    )
  } catch (error) {
    alert('Не удалось удалить товар из корзины')
    console.error(error)
  }
}

export const fetchOrdersData = async (setIsLoading, setOrders) => {
  setIsLoading(true)
  const { data } = await axios.get(ENDPOINTS.ORDERS)
  setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
  setIsLoading(false)
}

export const onMakeOrderClick = async (
  cartItems,
  setIsLoading,
  setOrderId,
  setIsOrderCompleted,
  setCartItems
) => {
  setIsLoading(true)
  try {
    const { data } = await axios.post(ENDPOINTS.ORDERS, { items: cartItems })
    setOrderId(data.id)
    setIsOrderCompleted(true)
    setCartItems([])

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i]
      await axios.delete(`${ENDPOINTS.CART}/${item.id}`)
      await delay(1000)
    }
  } catch (error) {
    alert(
      'Во время оформления заказа произошла ошибка, пожалуйста, повторите попытку позже!'
    )
  }
  setIsLoading(false)
}
