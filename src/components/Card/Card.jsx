import clasess from './Card.module.scss'
const Card = (props) => {
  return (
    <div className={clasess.card}>
      <div className={clasess.favorite}>
        <img src='/img/unliked.svg' alt='Unliked' />
      </div>
      <img width={133} height={112} src={props.path} alt='Sneaker' />
      <h5>{props.name}</h5>
      <div
        className={`${clasess.card__bottom} d-flex justify-between align-center`}>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{props.price} руб.</b>
        </div>
        <button className={clasess.button} onClick={props.onClick}>
          <img width={11} height={11} src='/img/plus.svg' alt='Plus' />
        </button>
      </div>
    </div>
  )
}

export default Card
