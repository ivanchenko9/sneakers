import React from 'react'
import clasess from './Drawer.module.scss'
import CartItem from './CartItems/CartItem.jsx'
import Info from '../Info/Info.jsx'
import { AppContext } from '../../contexts/AppContext'
import { onMakeOrderClick } from '../../api'
import staticImgsAndSvgs from '../../../public/img'

const Drawer = ({ onRemoveItemFromCart, cartItems = [], opened }) => {
  const { onCloseCartClick, setCartItems } = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

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
            src={`${staticImgsAndSvgs.btnRemove}`}
            alt='Close'
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
                onClick={() =>
                  onMakeOrderClick(
                    cartItems,
                    setIsLoading,
                    setOrderId,
                    setIsOrderCompleted,
                    setCartItems
                  )
                }>
                Офромить заказ{' '}
                <img src={`${staticImgsAndSvgs.arrow}`} alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <Info
            imagePath={
              isOrderCompleted
                ? `${staticImgsAndSvgs.completeOrder}`
                : `${staticImgsAndSvgs.emptyCart}`
            }
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            subtitle={
              isOrderCompleted
                ? `Ваш заказ #${orderId} отправлен на оброботку`
                : 'Добавть хотя бы одну пару кроссовок, что бы сделать заказ'
            }
            buttonImage={`${staticImgsAndSvgs.arrow}`}
            buttonText={'Вернуться назад'}
            onCloseCartClick={onCloseCartClick}
          />
        )}
      </div>
    </div>
  )
}

export default Drawer
