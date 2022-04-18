import React, { useContext } from 'react'

import CartContext from '../../../store/cart-context'
import MealItemForm from './MealItemForm.js'
import classes from './MealItem.module.css'
import sushiImg from '../../../assets/sushi.jpg'

const MealItem = (props) => {
  const cartContext = useContext(CartContext)

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    })
  }

  return (
    <li className={classes.meal}>
      <div className={classes['item-info']}>
        <div>
          <img src={sushiImg} alt='item' />
        </div>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{`$${props.price.toFixed(2)}`}</div>
        </div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem
