import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../store/auth-context'
import classes from './UserAction.module.css'
import user from '../../assets/user.png'
import edit from '../../assets/edit.png'
import bag from '../../assets/shopping-bag.png'
import logout from '../../assets/log-out.png'

const UserAction = () => {
  const [showMenu, setShowMenu] = useState(false)

  const authContext = useContext(AuthContext)

  const toggleMenuHandler = () => {
    setShowMenu((prevState) => !prevState)
  }

  const logoutHandler = () => {
    authContext.logout()
  }
  return (
    <div className={classes.action}>
      <div className={classes.profile} onClick={toggleMenuHandler}>
        <img src={user} alt='profile' />
      </div>
      <div
        className={
          showMenu ? `${classes.active} ${classes.menu}` : classes.menu
        }
      >
        <p>
          {authContext.displayName
            ? authContext.displayName
            : authContext.email}
        </p>
        <ul>
          <li>
            <img src={edit} alt='edit' />
            <Link onClick={toggleMenuHandler} to='/profile'>
              Edit Profile
            </Link>
          </li>
          <li>
            <img src={bag} alt='bag' />
            <Link onClick={toggleMenuHandler} to='/orders'>
              Orders
            </Link>
          </li>
          <li>
            <img src={logout} alt='logout' />
            <Link to='/home' onClick={logoutHandler}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserAction
