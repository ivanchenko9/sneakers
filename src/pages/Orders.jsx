import React from 'react'
import Card from '../components/Card/Card.jsx'
import { fetchOrdersData } from '../api/index.js'

const Orders = ({ onAddToFavorite, onAddToCart }) => {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetchOrdersData(setIsLoading, setOrders)
  }, [])
  return (
    <div className='content p-40'>
      <div className='d-flex justify-between align-center mb-40'>
        <h1>Мои заказы</h1>
      </div>
      <div className='d-flex flex-wrap'>
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} isLoading={isLoading} {...item} />
        ))}
      </div>

      <div className='d-flex flex-wrap'></div>
    </div>
  )
}

export default Orders
