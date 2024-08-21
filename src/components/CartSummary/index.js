// Write your code here
import './index.css'
import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0

      cartList.forEach(each => {
        total += each.price * each.quantity
      })

      return (
        <div className="cart-summary-container">
          <h1 className="summary-heading">Order Total :Rs {total}</h1>

          <p className="summary-paragraph">
            <span> {cartList.length} </span>items in the cart
          </p>
          <Link to="/checkout">
            {' '}
            <button type="button" className="checkout">
              CheckOut
            </button>{' '}
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
