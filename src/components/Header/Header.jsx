import classes from './Header.module.scss'

const Header = (props) => {
  return (
    <header
      className={`${classes.header__my} d-flex justify-between align-center p-40`}>
      <div className='d-flex align-center'>
        <img
          width={40}
          height={40}
          src='/img/logo.png'
          alt=''
          className='mr-10'
        />
        <div>
          <h3 className='text-uppercase'>Sneakers</h3>
          <p className='opacity-5'>Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className='d-flex'>
        <li className='mr-30'>
          <img
            width={18}
            height={18}
            src='/img/cart.svg'
            alt=''
            className='mr-10'
          />
          <span>1205 руб.</span>
        </li>
        <li>
          <img width={18} height={18} src='/img/user.svg' alt='' />
        </li>
      </ul>
    </header>
  )
}

export default Header
