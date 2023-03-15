import { Link } from 'react-router-dom'

// the same page but without being logged in
const Public = () => {
  return (
    <div>
      <h1>Public</h1>
      <Link to='/'>Home</Link>
    </div>
  )
}

export default Public