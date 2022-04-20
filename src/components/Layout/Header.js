import { useContext } from 'react'
import { Link } from 'react-router-dom'

import UserAction from './UserAction'
import AuthContext from '../../store/auth-context'
import HeaderCartButton from './HeaderCartButton'
import mealsImage from '../../assets/Restaurant Background.jpg'
import classes from './Header.module.css'

const Header = (props) => {
  const authContext = useContext(AuthContext)

  return (
    <>
      <header className={classes.header}>
        <i className='fas fa-utensils'></i>
        <Link to='/' className={classes.logo}>
          What2Eat
        </Link>
        <div className={classes.nav}>
          {authContext.isLoggedIn && (
            <HeaderCartButton onClick={props.onShowCart} />
          )}
          {authContext.isLoggedIn && <UserAction />}

          {!authContext.isLoggedIn && (
            <Link className={classes.login} to='/auth'>
              Login Now
            </Link>
          )}
        </div>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='test' />
      </div>
    </>
  )
}

export default Header
