import ContentLoader from 'react-content-loader'

const CardContentLoader = () => (
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
)

export default CardContentLoader
