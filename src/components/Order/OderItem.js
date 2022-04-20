import React from 'react'

import classes from './OrderItem.module.css'

const OderItem = ({ order, orderChange }) => {
  const deleteOrderHandler = () => {
    fetch(
      `https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${order.id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        orderChange()
        if (!res.ok) {
          throw new Error('Something went wrong!')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <li key={order.id}>
        <h3>
          {order.lastName} {order.firstName} / Phone: {order.phonenumber} / Add:{' '}
          {order.address}
        </h3>

        <h3>Items: </h3>
        <ul>
          {order.items.map((item) => {
            return (
              <li key={item.id}>
                {item.amount} x {item.name} (${item.price})
              </li>
            )
          })}
        </ul>
        <h3>Total Price: {order.totalPrice}</h3>
      </li>
      <button
        className={`${classes.button} ${classes.primary} ${classes.delete}`}
        onClick={deleteOrderHandler}
      >
        Delete
      </button>
    </>
  )
}

export default OderItem
