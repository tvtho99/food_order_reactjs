import { useState } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'
import AuthForm from './components/Auth/AuthForm'
import Orders from './pages/Oders'
import Profile from './pages/Profile'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const history = useHistory()

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
    history.replace('/home')
  }

  return (
    <CartProvider>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home' exact>
          <Header onShowCart={showCartHandler} />
          <main>
            <Meals />
          </main>
        </Route>
        <Route path='/auth'>
          <AuthForm />
        </Route>
        <Route path='/cart'>
          <Header onShowCart={showCartHandler} />
          {cartIsShown && <Cart onHideCart={hideCartHandler} />}
        </Route>
        <Route path='/orders'>
          <Orders />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </CartProvider>
  )
}

export default App
