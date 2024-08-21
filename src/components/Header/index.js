import {Link, withRouter} from 'react-router-dom'

import {useState} from 'react'
import CartContext from '../../context/CartContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import {FaUserCircle} from 'react-icons/fa' // Import the profile icon from react-icons

const Header = props => {
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onSearchSubmit = event => {
    event.preventDefault()
    // Implement search functionality or redirect to search results page
    console.log('Search Input:', searchInput)
  }

  const onClickProfile = () => {
    // Implement profile redirection or dropdown functionality
    const {history} = props
    history.push('/profile')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="badge bg-danger rounded-pill ms-2">
                {cartList.length}
              </span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-header">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center text-white">
          <img
            src={require('../../assets/Logo.png')}
            alt="website logo"
            className="me-2"
            style={{ height: '50px' }}
          />
          <span>EvoBuz</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="d-flex ms-auto align-items-center">
            <form className="d-flex me-3" onSubmit={onSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search for services"
                value={searchInput}
                onChange={onChangeSearchInput}
              />
            </form>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link text-white">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/cart" className="nav-link text-white">
                  Cart
                  {renderCartItemsCount()}
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="btn text-white ms-3"
              onClick={onClickProfile}
            >
              <FaUserCircle size={28} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
