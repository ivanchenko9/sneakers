import React from 'react'
import Card from '../components/Card/Card.jsx'
import axios from 'axios'

const Orders = ({ onAddToFavorite, onAddToCart }) => {
  const [orders, setOrders] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const { data } = await axios.get(
        'https://61090c8ed71b670017639708.mockapi.io/orders'
      )
      setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
      setIsLoading(false)
    }

    fetchData()
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
