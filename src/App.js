import { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Checkout from './components/CheckOut'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import CartContext from './context/CartContext'
import Signup from './components/Signup'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({ cartList: [] })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (id === each.id) {
          const updatedQuantity = each.quantity + 1
          return { ...each, quantity: updatedQuantity }
        }
        return each
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const { cartList } = this.state
    const productObject = cartList.find(each => each.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (id === each.id) {
            const updatedQuantity = each.quantity - 1
            return { ...each, quantity: updatedQuantity }
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const { cartList } = this.state
    const updatedList = cartList.filter(each => each.id !== id)
    this.setState({ cartList: updatedList })
  }

  addCartItem = product => {
    const { cartList } = this.state

    const productObject = cartList.find(
      eachCardItem => eachCardItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachObject => {
          if (productObject.id === eachObject.id) {
            const updatedQuantity = eachObject.quantity + product.quantity
            return { ...eachObject, quantity: updatedQuantity }
          }
          return eachObject
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({ cartList: updatedCartList })
    }
  }

  render() {
    const { cartList } = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={LoginForm} />
         
          <Route exact path="/" component={Home} />
         <Route exact path="/products" component={Products} />
          <Route exact path="/products/:id" component={ProductItemDetails} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} /> 
           <Route path="/not-found" component={NotFound} /> 
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
