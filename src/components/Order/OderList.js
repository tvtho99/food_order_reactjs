import { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../store/auth-context'
import Card from '../../components/UI/Card'
import OrderItem from './OderItem'
import classes from './OrderList.module.css'

const OderList = () => {
  const authContext = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(false)
  const getOrder = useCallback(async () => {
    try {
      const response = await fetch(
        'https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json'
      )
      if (!response.ok) {
        throw new Error('Somthing went wrong!')
      }
      const data = await response.json()

      const ordersArr = Object.keys(data).map((key) => {
        return {
          ...data[key],
          id: key,
        }
      })
      const filteredOrders = ordersArr.filter((order) => {
        return order.email === authContext.email
      })

      setOrders(filteredOrders)
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Something went wrong!')
        return
      }
      setError(error.message)
    }
  }, [authContext])

  const orderChangeHandler = () => {
    setReload((prev) => !prev)
  }

  useEffect(() => {
    getOrder()
  }, [getOrder, reload])

  console.log(reload)

  let ordersList = (
    <div className={classes['no-order']}>
      <p className={classes.notify}>You have no orders yet!</p>
      <Link to='/home'>Place an order now!</Link>
    </div>
  )
  if (orders.length > 0) {
    ordersList = (
      <ul>
        {orders.map((order) => {
          return (
            <OrderItem
              order={order}
              key={order.id}
              orderChange={orderChangeHandler}
            />
          )
        })}
      </ul>
    )
  }

  return (
    <Card>
      <h1>Your Orders:</h1>
      {error ? <p className={classes.error}>{error} </p> : ordersList}
    </Card>
  )
}

export default OderList
