const Card = (props) => {
  return (
    <div className='card'>
      <div className='favorite'>
        <img src='/img/unliked.svg' alt='Unliked' />
      </div>
      <img width={133} height={112} src='/img/sneakers/1.jpg' alt='Sneaker' />
      <h5>Мужские Кроссовки Nike Biazer Mid Suede</h5>
      <div className='card__bottom d-flex justify-between align-center'>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>12 999 руб.</b>
        </div>
        <button className='button'>
          <img width={11} height={11} src='/img/plus.svg' alt='Plus' />
        </button>
      </div>
    </div>
  )
}

export default Card
