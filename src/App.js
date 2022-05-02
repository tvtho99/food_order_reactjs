import { useState, useContext } from 'react'
import { useHistory, Route, Switch, Redirect } from 'react-router-dom'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import AuthForm from './components/Auth/AuthForm'
import ResetPassForm from './components/Auth/ResetPassForm'

import Orders from './pages/Oders'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'

import { CartProvider } from './store/cart-context'
import AuthContext from './store/auth-context'
import Loading from './components/Loading/Loading'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)
  const authContext = useContext(AuthContext)

  const history = useHistory()

  const hideCartHandler = () => {
    history.replace('/')
    setCartIsShown(false)
  }

  const showCartHandler = () => {
    if (cartIsShown) {
      hideCartHandler()
    } else setCartIsShown(true)
  }

  return (
    <CartProvider>
      <ReactNotifications />
      <Loading />
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

        <Route path='/auth/reset-password'>
          <ResetPassForm />
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
          <Header onShowCart={showCartHandler} />
          {authContext.isLoggedIn ? <Orders /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        <Route path='/profile' exact>
          <Header onShowCart={showCartHandler} />
          {authContext.isLoggedIn ? <Profile /> : <Redirect to='/auth' />}
          <Footer />
        </Route>

        {/* <Route path='/about' exact>
          <Header onShowCart={showCartHandler} />
          <About />
        </Route>

        <Route path='/contact' exact>
          <Header onShowCart={showCartHandler} />
          <Contact />
        </Route> */}

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </CartProvider>
  )
}

export default App
