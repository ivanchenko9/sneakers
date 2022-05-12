import { useContext } from 'react'
import clasess from './CartItem.module.scss'
import staticImgsAndSvgs from '../../../../public/img'
import { AppContext } from '../../../contexts/AppContext'

const CartItem = ({ id, path, name, price, onRemoveItemFromCart }) => {
  const { setCartItems } = useContext(AppContext)
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
        src={`${staticImgsAndSvgs.btnRemove}`}
        alt='Remove'
        onClick={() => onRemoveItemFromCart(id, setCartItems)}
      />
    </div>
  )
}

export default CartItem
