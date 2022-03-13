import { useContext, useEffect, useState } from 'react'

import CartContext from '../../store/cart-context'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {
  const [btnIsClicked, setBtnIsClicked] = useState(false)
  const cartContext = useContext(CartContext)
  const { items } = cartContext

  const numberOfCartItems = items.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsClicked ? classes.bump : ''}`

  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnIsClicked(true)

    const timer = setTimeout(() => {
      setBtnIsClicked(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
