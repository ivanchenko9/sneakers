import React from 'react'
import { AppContext } from '../../App'
import clasess from './Info.module.scss'

const Info = (props) => {
  const { onCloseCartClick } = React.useContext(AppContext)

  return (
    <div
      className={`${clasess.cart__empty} d-flex align-center flex-column flex`}>
      <img
        className='mb-20'
        width={120}
        src={props.imagePath}
        alt='Cart is empty!'
      />
      <h2>{props.title}</h2>
      <p className='opacity-6'>{props.subtitle}</p>
      <button className={clasess.green__button} onClick={onCloseCartClick}>
        <img src={props.buttonImage} alt='Arrow' />
        {props.buttonText}
      </button>
    </div>
  )
}

export default Info
