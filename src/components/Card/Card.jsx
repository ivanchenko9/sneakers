import { useState } from 'react'
import clasess from './Card.module.scss'
const Card = ({
  id,
  name,
  price,
  imagePath,
  onFavoriteClick,
  onPlusButtonClick,
  favorited = false,
}) => {
  const [isAdded, setIsAdded] = useState(false)
  const [isFavorite, setIsFavorite] = useState(favorited)

  const handlePlusButtonClick = () => {
    onPlusButtonClick({ id, name, price, imagePath })
    setIsAdded(!isAdded)
  }

  const handleFavoriteButtonClick = () => {
    onFavoriteClick({ id, name, price, imagePath })
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={clasess.card}>
      <div className={clasess.favorite}>
        <img
          src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
          alt={isFavorite ? 'Liked' : 'Unliked'}
          onClick={handleFavoriteButtonClick}
        />
      </div>
      <img width={133} height={112} src={imagePath} alt='Sneaker' />
      <h5>{name}</h5>
      <div
        className={`${clasess.card__bottom} d-flex justify-between align-center`}>
        <div className='d-flex flex-column'>
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={clasess.plus}
          src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt='Plus'
          onClick={handlePlusButtonClick}
        />
      </div>
    </div>
  )
}

export default Card
