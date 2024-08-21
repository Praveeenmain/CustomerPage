import './index.css'
import {Link} from 'react-router-dom'

const CheckOut = () => (
  <div className="checkOut-container">
    <img
      src="https://media.istockphoto.com/id/1283050796/vector/flat-design-under-construction-concept.jpg?s=612x612&w=0&k=20&c=CATQe8sEl7YdpwxZ4VHwYh5FjHY9MkbyRNhALyslZwA="
      alt="construction"
    />
    <Link to="/">
      <button type="button" className="home-button">
        Home
      </button>
    </Link>
  </div>
)
export default CheckOut
