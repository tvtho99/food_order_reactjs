import { useContext, useState } from 'react'

import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import CartItem from './CartItem'
import OrderForm from './OderForm'
import classes from './Cart.module.css'

const Cart = (props) => {
  const [showOderForm, setShowOderForm] = useState(false)
  const cartContext = useContext(CartContext)

  const totalPrice = `$${cartContext.totalPrice.toFixed(2)}`
  const hasItems = cartContext.items.length > 0

  const cartItemAddHandler = (item) => {
    cartContext.addItem({ ...item, amount: 1 })
  }

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const onShowOrderForm = () => {
    setShowOderForm(true)
  }

  return (
    <Modal onClose={props.onHideCart}>
      {showOderForm ? (
        <OrderForm />
      ) : (
        <div>
          {cartItems}
          <div className={classes.total}>
            <span>Total Price</span>
            <span>{totalPrice}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes['button--alt']}
              onClick={props.onHideCart}
            >
              Close
            </button>
            {hasItems && (
              <button className={classes.button} onClick={onShowOrderForm}>
                Order
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  )
}

export default Cart
