import { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserAction from './UserAction'
import AuthContext from '../../store/auth-context'
import HeaderCartButton from './HeaderCartButton'
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'

const Header = (props) => {
  const authContext = useContext(AuthContext)

  const logoutHandler = () => {
    authContext.logout()
  }
  return (
    <>
      <header className={classes.header}>
        <h1>What2Eat</h1>
        <div className={classes.nav}>
          {authContext.isLoggedIn && (
            <HeaderCartButton onClick={props.onShowCart} />
          )}
          {authContext.isLoggedIn && <UserAction />}

          {!authContext.isLoggedIn && <Link to='/auth'>Login</Link>}
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </>
  )
}

export default Header
