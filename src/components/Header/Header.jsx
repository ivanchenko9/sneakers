import React from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../contexts/AppContext'
import classes from './Header.module.scss'
import staticImgsAndSvgs from '../../../public/img'

const Header = (props) => {
  const { cartItems } = React.useContext(AppContext)
  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header
      className={`${classes.header__my} d-flex justify-between align-center p-40`}>
      <Link to={process.env.PUBLIC_URL + '/'}>
        <div className='d-flex align-center'>
          <img
            width={40}
            height={40}
            src={`${staticImgsAndSvgs.logo}`}
            alt='Logotype'
            className='mr-10'
          />
          <div>
            <h3 className='text-uppercase'>Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={props.onCartClick}>
          <img
            width={18}
            height={18}
            src={`${staticImgsAndSvgs.cart}`}
            alt='Корзина'
            className='mr-10'
          />
          <span>{totalPrice} руб.</span>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/favorites'}>
            <img
              width={18}
              height={18}
              src={`${staticImgsAndSvgs.heart}`}
              alt='Закладки'
              className='cu-p mr-15'
            />
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + '/orders'}>
            <img
              width={18}
              height={18}
              src={`${staticImgsAndSvgs.user}`}
              alt='Пользователь'
              className='cu-p'
            />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
