import { Link } from 'react-router-dom'
import classes from './Header.module.scss'

const Header = (props) => {
  return (
    <header
      className={`${classes.header__my} d-flex justify-between align-center p-40`}>
      <div className='d-flex align-center'>
        <Link to='/'>
          <img
            width={40}
            height={40}
            src='/img/logo.png'
            alt='Logotype'
            className='mr-10'
          />
          <div>
            <h3 className='text-uppercase'>Sneakers</h3>
            <p className='opacity-5'>Магазин лучших кроссовок</p>
          </div>
        </Link>
      </div>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={props.onCartClick}>
          <img
            width={18}
            height={18}
            src='/img/cart.svg'
            alt='Корзина'
            className='mr-10'
          />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to='/favorites'>
            <img
              width={18}
              height={18}
              src='/img/heart.svg'
              alt='Закладки'
              className='cu-p mr-15'
            />
          </Link>
        </li>
        <li>
          <img
            width={18}
            height={18}
            src='/img/user.svg'
            alt='Пользователь'
            className='cu-p'
          />
        </li>
      </ul>
    </header>
  )
}

export default Header
