import React from 'react'
import ContentLoader from 'react-content-loader'
import { useState } from 'react'
import clasess from './Card.module.scss'
import { AppContext } from '../../App.jsx'
const Card = ({
  id,
  name,
  price,
  imagePath,
  onFavoriteClick,
  onPlusButtonClick,
  favorited = false,
  isLoading = false,
}) => {
  const itemObj = { id, parentId: id, name, price, imagePath }
  const { isItemAdded } = React.useContext(AppContext)

  const [isFavorite, setIsFavorite] = useState(favorited)

  const handlePlusButtonClick = () => {
    onPlusButtonClick(itemObj)
  }

  const handleFavoriteButtonClick = () => {
    onFavoriteClick(itemObj)
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={clasess.card}>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={150}
          height={187}
          viewBox='0 0 150 187'
          backgroundColor='#f3f3f3'
          foregroundColor='#ecebeb'>
          <rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
          <rect x='0' y='97' rx='5' ry='5' width='150' height='15' />
          <rect x='0' y='118' rx='5' ry='5' width='100' height='15' />
          <rect x='0' y='154' rx='5' ry='5' width='80' height='25' />
          <rect x='116' y='147' rx='10' ry='10' width='32' height='32' />
        </ContentLoader>
      ) : (
        <>
          <div className={clasess.favorite}>
            {onFavoriteClick && (
              <img
                src={isFavorite ? '/img/liked.svg' : '/img/unliked.svg'}
                alt={isFavorite ? 'Liked' : 'Unliked'}
                onClick={handleFavoriteButtonClick}
              />
            )}
          </div>
          <img width='100%' height={120} src={imagePath} alt='Sneaker' />
          <h5>{name}</h5>
          <div
            className={`${clasess.card__bottom} d-flex justify-between align-center`}>
            <div className='d-flex flex-column'>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlusButtonClick && (
              <img
                className={clasess.plus}
                src={
                  isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'
                }
                alt='Plus'
                onClick={handlePlusButtonClick}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
