import clasess from './Drawer.module.scss'

const Drawer = () => {
  return (
    <div style={{ display: 'none' }} className={clasess.overlay}>
      <div className={clasess.drawer}>
        <h2 className='d-flex justify-between mb-30'>
          Корзина{' '}
          <img
            className={`${clasess.remove__btn}  cu-p `}
            src='/img/btn-remove.svg'
            alt='Remove'
          />
        </h2>
        <div className={clasess.items}>
          <div className={`${clasess.cart__item} d-flex align-center mb-20`}>
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className={clasess.cart__item__img}></div>
            <div className='mr-20 flex'>
              <p className='mb-5'>Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className={clasess.remove__btn}
              src='/img/btn-remove.svg'
              alt='Remove'
            />
          </div>

          <div className={`${clasess.cart__item} d-flex align-center mb-20`}>
            <div
              style={{ backgroundImage: 'url(/img/sneakers/1.jpg)' }}
              className={clasess.cart__item__img}></div>
            <div className='mr-20 flex'>
              <p className='mb-5'>Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб.</b>
            </div>
            <img
              className={clasess.remove__btn}
              src='/img/btn-remove.svg'
              alt='Remove'
            />
          </div>
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
      </div>
    </div>
  )
}

export default Drawer
