import clasess from './CartItem.module.scss'

const CartItem = ({ id, path, name, price, onRemoveItemFromCart }) => {
  return (
    <div className={`${clasess.cart__item} d-flex align-center mb-20`}>
      <div
        style={{ backgroundImage: `url(${path})` }}
        className={clasess.cart__item__img}></div>
      <div className='mr-20 flex'>
        <p className='mb-5'>{name}</p>
        <b>{price} руб.</b>
      </div>
      <img
        className={clasess.remove__btn}
        src='img/btn-remove.svg'
        alt='Remove'
        onClick={() => onRemoveItemFromCart(id)}
      />
    </div>
  )
}

export default CartItem
