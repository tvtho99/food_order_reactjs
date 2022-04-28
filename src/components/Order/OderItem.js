import React from 'react'

import Card from '../UI/Card'
import classes from './OrderItem.module.css'

const OderItem = ({ order, onShowNotification }) => {
  return (
    <Card styles={{ margin: '2rem' }}>
      <div className={classes.item}>
        <li key={order.id}>
          <h3>
            Fullname:{' '}
            <span className={classes.info}>
              {order.lastName} {order.firstName}
            </span>{' '}
            / Phone: <span className={classes.info}>{order.phonenumber}</span> /
            Add: <span className={classes.info}>{order.address}</span>
          </h3>

          <h3>Items: </h3>
          <ul className={classes.dish}>
            {order.items.map((item) => {
              return (
                <li key={item.id}>
                  {item.amount} x {item.name} (${item.price})
                </li>
              )
            })}
          </ul>
          <h3>
            Created At: <span className={classes.info}> {order.date}</span>
          </h3>
          <h3>
            Total Price:{' '}
            <span className={classes.info}>{order.totalPrice}</span>
          </h3>
        </li>
        <button
          className={`${classes.button} ${classes.primary} ${classes.delete}`}
          onClick={() => {
            onShowNotification(order.id)
          }}
        >
          Delete
        </button>
      </div>
    </Card>
  )
}

export default OderItem
