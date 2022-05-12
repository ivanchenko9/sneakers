import React, { useState } from 'react'
import CardContentLoader from './CardContentLoader'
import clasess from './Card.module.scss'
import { AppContext } from '../../contexts/AppContext'
import staticImgsAndSvgs from '../../../public/img'
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
        <CardContentLoader />
      ) : (
        <>
          <div className={clasess.favorite}>
            {onFavoriteClick && (
              <img
                src={
                  isFavorite
                    ? `${staticImgsAndSvgs.liked}`
                    : `${staticImgsAndSvgs.unliked}`
                }
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
                  isItemAdded(id)
                    ? `${staticImgsAndSvgs.btnChecked}`
                    : `${staticImgsAndSvgs.btnPlus}`
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
