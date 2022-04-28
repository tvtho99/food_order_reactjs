import { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Store } from 'react-notifications-component'

import AuthContext from '../../store/auth-context'
import Card from '../../components/UI/Card'
import LoadingSpinner from '../../components/UI/LoadingSpinner'
import Dialog from '../UI/Dialog'
import OrderItem from './OderItem'
import classes from './OrderList.module.css'

const OderList = () => {
  const authContext = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(null)
  const [isOrderChanged, setIsOrderChanged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [orderDeleteId, setOrderDeleteId] = useState(null)

  const getOrder = useCallback(async () => {
    try {
      setIsLoading(true)
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
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      if (error.message === 'Failed to fetch') {
        setError('Something went wrong!')
        return
      }
      setError(error.message)
    }
  }, [authContext])

  const deleteOrderHandler = (orderId) => {
    fetch(
      `https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${orderId}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong!')
        }
        Store.addNotification({
          title: 'Successfully!',
          message: 'Delete order successfully!',
          type: 'success',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 3000,
            onScreen: true,
          },
        })
        setIsOrderChanged((prev) => !prev)
      })
      .catch((error) => {
        Store.addNotification({
          title: 'Failed!',
          message: error.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__bounceIn'],
          animationOut: ['animate__animated', 'animate__bounceOut'],
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
          },
        })
      })
  }

  const showDialogHandler = (orderId) => {
    setShowDialog(true)
    setOrderDeleteId(orderId)
  }

  const closeDialogHandler = () => {
    setShowDialog(false)
  }

  useEffect(() => {
    getOrder()
  }, [getOrder, isOrderChanged])

  let ordersList = (
    <div className={classes['no-order']}>
      <p className={classes.notify}>You have no orders yet!</p>
      <Link to='/home'>Place an order now!</Link>
    </div>
  )
  if (orders.length > 0) {
    ordersList = (
      <ul className={classes.list}>
        {orders.map((order) => {
          return (
            <OrderItem
              order={order}
              key={order.id}
              onShowNotification={showDialogHandler}
            />
          )
        })}
      </ul>
    )
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', paddingTop: 150, paddingBottom: 150 }}>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className={classes.error}>{error} </p>
  }

  return (
    <Card>
      {showDialog && (
        <Dialog onClose={closeDialogHandler}>
          <div className={classes['modal-content']}>
            <div
              className={`${classes['modal-header']} ${classes['flex-column']}`}
            >
              <div className={classes['icon-box']}>
                <i className='fa-solid fa-trash-can'></i>
              </div>
              <h4 className={classes['modal-title']}>Are you sure?</h4>
              <button onClick={closeDialogHandler} className={classes.close}>
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>
            <div className={classes['modal-body']}>
              <p>
                Do you really want to delete this order? <br /> This process
                cannot be undone.
              </p>
            </div>
            <div
              className={`${classes['modal-footer']} ${classes['justify-content-center']}`}
            >
              <button
                className={`${classes.btn} ${classes['btn-secondary']}`}
                onClick={closeDialogHandler}
              >
                Cancel
              </button>
              <button
                className={`${classes.btn} ${classes['btn-danger']}`}
                onClick={() => {
                  deleteOrderHandler(orderDeleteId)
                  setShowDialog(false)
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
      <h1 className={classes.title}>Your Orders: {orders.length}</h1>
      {ordersList}
    </Card>
  )
}

export default OderList
