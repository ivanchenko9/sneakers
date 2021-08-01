import Drawer from './components/Drawer/Drawer.jsx'
import Header from './components/Header/Header.jsx'
import Card from './components/Card/Card.jsx'

const sneakers = [
  {
    id: 1,
    name: 'Мужские Кроссовки Nike Biazer Mid Suede',
    price: 12999,
    imagePath: '/img/sneakers/1.jpg',
  },
  {
    id: 2,
    name: 'Мужские Кроссовки Nike Air Max 270',
    price: 12799,
    imagePath: '/img/sneakers/2.jpg',
  },
  {
    id: 3,
    name: 'Мужские Кроссовки Nike Blazer Mid Suede',
    price: 8999,
    imagePath: '/img/sneakers/3.jpg',
  },
  {
    id: 4,
    name: 'Кроссовки Puma X Aka Boku Future Rider',
    price: 8999,
    imagePath: '/img/sneakers/4.jpg',
  },
]

function App() {
  return (
    <div className='wrapper clear'>
      <Drawer />
      <Header />
      <div className='content p-40'>
        <div className='d-flex justify-between align-center mb-40'>
          <h1>Все кроссовки</h1>
          <div className='search__block d-flex'>
            <img src='/img/search.svg' alt='Searchr' />
            <input placeholder='Поиск...' />
          </div>
        </div>

        <div className='d-flex'>
          {sneakers.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              price={item.price}
              path={item.imagePath}
              onClick={() => console.log(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
