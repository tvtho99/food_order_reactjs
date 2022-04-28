import React, { useContext } from 'react'

import CartContext from '../../../store/cart-context'
import AuthContext from '../../../store/auth-context'

import classes from './Dish.module.css'

const Dish = (props) => {
  const cartContext = useContext(CartContext)
  const authContext = useContext(AuthContext)

  const addToCartHandler = () => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: 1,
      price: props.price,
      image: props.image,
    })
  }
  return (
    <div className={classes.box}>
      <img src={props.image} alt='' />
      <h3>{props.name}</h3>
      <div className={classes.stars}>
        <i className='fas fa-star'></i>
        <i className='fas fa-star'></i>
        <i className='fas fa-star'></i>
        <i className='fas fa-star'></i>
        <i className='fas fa-star-half-alt'></i>
      </div>
      <span>${props.price}</span>
      <button
        style={!authContext.isLoggedIn ? { display: 'none' } : null}
        onClick={addToCartHandler}
        className={classes.btn}
      >
        Add To Cart
      </button>
    </div>
  )
}

export default Dish
