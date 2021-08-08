import React from 'react'
import clasess from './Drawer.module.scss'
import CartItem from './CartItems/CartItem.jsx'
import Info from '../Info/Info.jsx'
import { AppContext } from '../../App'
import axios from 'axios'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({ onRemoveItemFromCart, cartItems = [], opened }) => {
  const { onCloseCartClick, setCartItems } = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  const onMakeOrderClick = async () => {
    setIsLoading(true)
    try {
      const { data } = await axios.post(
        'https://61090c8ed71b670017639708.mockapi.io/orders',
        { items: cartItems }
      )
      setOrderId(data.id)
      setIsOrderCompleted(true)
      setCartItems([])

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i]
        await axios.delete(
          `https://61090c8ed71b670017639708.mockapi.io/cart/${item.id}`
        )
        await delay(1000)
      }
    } catch (error) {
      alert(
        'Во время оформления заказа произошла ошибка, пожалуйста, повторите попытку позже!'
      )
    }
    setIsLoading(false)
  }
  return (
    <div
      className={`${clasess.overlay} ${
        opened ? clasess.overlay__visible : ''
      }`}>
      <div className={clasess.drawer}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина
          <img
            className={`${clasess.remove__btn}  cu-p `}
            src='/img/btn-remove.svg'
            alt='Close_cart'
            onClick={onCloseCartClick}
          />
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className={clasess.items}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  path={item.imagePath}
                  onRemoveItemFromCart={onRemoveItemFromCart}
                />
              ))}
            </div>

            <div className={clasess.cart__total__block}>
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={`${clasess.green__button} ${clasess.button__loading}`}
                onClick={onMakeOrderClick}>
                Офромить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            imagePath={
              isOrderCompleted
                ? '/img/complete-order.jpg'
                : '/img/empty-cart.jpg'
            }
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            subtitle={
              isOrderCompleted
                ? `Ваш заказ #${orderId} отправлен на оброботку`
                : 'Добавть хотя бы одну пару кроссовок, что бы сделать заказ'
            }
            buttonImage={'/img/arrow.svg'}
            buttonText={'Вернуться назад'}
            onCloseCartClick={onCloseCartClick}
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
