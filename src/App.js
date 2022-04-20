import { useState, useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import Navbar from './components/Layout/Navbar'
import CartProvider from './store/CartProvider'
import AuthForm from './components/Auth/AuthForm'
import Orders from './pages/Oders'
import Profile from './pages/Profile'
import AuthContext from './store/auth-context'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const authContext = useContext(AuthContext)

  console.log(authContext.email)
  console.log(authContext.isLoggedIn)

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

        <Route path='/auth'>
          <AuthForm />
        </Route>

        <Route path='/cart'>
          <Header onShowCart={showCartHandler} />
          {!authContext.isLoggedIn && <Redirect to='/auth' />}
          {cartIsShown ? (
            <Cart onHideCart={hideCartHandler} />
          ) : (
            <Redirect to='/home' />
          )}
          <Footer />
        </Route>

        <Route path='/orders'>
          <Navbar />
          {authContext.isLoggedIn ? <Orders /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        <Route path='/profile'>
          <Navbar />
          {authContext.isLoggedIn ? <Profile /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        <Route path='*'>
          <Redirect to='/home' />
        </Route>
      </Switch>
    </CartProvider>
  )
}

export default App
