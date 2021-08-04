import clasess from './Drawer.module.scss'
import CartItem from './CartItems/CartItem.jsx'

const Drawer = ({ onCloseCartClick, onRemoveItemFromCart, cartItems = [] }) => {
  return (
    <div className={clasess.overlay}>
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
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className={clasess.green__button}>
                Офромить заказ <img src='/img/arrow.svg' alt='Arrow' />
              </button>
            </div>
          </>
        ) : (
          <div
            className={`${clasess.cart__empty} d-flex align-center flex-column flex`}>
            <img
              className='mb-20'
              width={120}
              height={120}
              src='/img/empty-cart.jpg'
              alt='Cart is empty!'
            />
            <h2>Корзина пустая</h2>
            <p className='opacity-6'>
              Добавть хотя бы одну пару кроссовок, что бы сделать заказ
            </p>
            <button
              className={clasess.green__button}
              onClick={onCloseCartClick}>
              <img src='/img/arrow.svg' alt='Arrow' />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Drawer
