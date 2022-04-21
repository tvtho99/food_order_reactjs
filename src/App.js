import { useState, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import Navbar from './components/Layout/Navbar'
import AuthForm from './components/Auth/AuthForm'

import Orders from './pages/Oders'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound/NotFound'

import { CartProvider } from './store/cart-context'
import AuthContext from './store/auth-context'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const authContext = useContext(AuthContext)

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  const showCartHandler = () => {
    if (cartIsShown) {
      hideCartHandler()
    } else setCartIsShown(true)
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
          <Footer />
        </Route>

        <Route path='/auth' exact>
          <AuthForm />
        </Route>

        <Route path='/cart' exact>
          <Header onShowCart={showCartHandler} />
          {!authContext.isLoggedIn && <Redirect to='/auth' />}
          {cartIsShown ? (
            <Cart onHideCart={hideCartHandler} />
          ) : (
            <Redirect to='/home' />
          )}
        </Route>

        <Route path='/orders' exact>
          <Navbar />
          {authContext.isLoggedIn ? <Orders /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        <Route path='/profile' exact>
          <Navbar />
          {authContext.isLoggedIn ? <Profile /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </CartProvider>
  )
}

export default App
