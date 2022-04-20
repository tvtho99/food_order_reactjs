import { useContext, useState } from 'react'

import useInput from '../../hooks/use-input'
import AuthContext from '../../store/auth-context'
import CartContext from '../../store/cart-context'
import classes from './Checkout.module.css'

const Checkout = (props) => {
  const [error, setError] = useState(null)
  const [placeOrder, setPlaceOrder] = useState(false)
  // get cart context
  const cartContext = useContext(CartContext)
  // get auth context
  const authContext = useContext(AuthContext)
  const totalPrice = `$${cartContext.totalPrice.toFixed(2)}`
  const cartItems = (
    <ul>
      {cartContext.items.map((item) => (
        <li key={item.id}>
          {item.name} (${item.price}) x {item.amount}
        </li>
      ))}
    </ul>
  )

  // use-input custom hook
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput((value) => value.trim() !== '')
  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput((value) => value.trim() !== '')
  const {
    value: enteredPhonenumber,
    isValid: enteredPhonenumberIsValid,
    hasError: phonenumberInputHasError,
    valueChangeHandler: phonenumberChangeHandler,
    inputBlurHandler: phonenumberBlurHandler,
  } = useInput((value) => value.trim() !== '')
  const {
    value: enteredAddress,
    isValid: enteredAddressIsValid,
    hasError: addressInputHasError,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput((value) => value.trim() !== '')
  let formIsValid = false

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredAddressIsValid &&
    enteredPhonenumberIsValid
  ) {
    formIsValid = true
  }

  const submitOrder = async () => {
    try {
      const response = await fetch(
        'https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        {
          method: 'POST',
          body: JSON.stringify({
            firstName: enteredFirstName,
            lastName: enteredLastName,
            email: authContext.email,
            address: enteredAddress,
            phonenumber: enteredPhonenumber,
            items: cartContext.items,
            totalPrice: totalPrice,
          }),
        }
      )
      if (!response.ok) {
        throw new Error('Somthing went wrong!')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const submitFormHandler = (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }

    submitOrder()
    setPlaceOrder(true)

    cartContext.clearCart()
  }

  const firstNameInputClasses = firstNameInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control']
  const lastNameInputClasses = lastNameInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control']
  const addressInputClasses = addressInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control']
  const phonenumberInputClasses = phonenumberInputHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control']

  let notification

  if (error) {
    notification = error
  } else {
    notification = (
      <>
        <div className={classes['success-msg']}>
          <i className='fa fa-check'></i>
          Successfully sent the order!
        </div>
        <div className={classes['form-actions']}>
          <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      {placeOrder ? (
        notification
      ) : (
        <form onSubmit={submitFormHandler}>
          <div style={{ overflowY: 'scroll', maxHeight: 440 }}>
            <div className={classes['control-group']}>
              <div className={firstNameInputClasses}>
                <label htmlFor='name'>First Name</label>
                <input
                  type='text'
                  id='name'
                  value={enteredFirstName}
                  onChange={firstNameChangeHandler}
                  onBlur={firstNameBlurHandler}
                />
                {firstNameInputHasError && (
                  <p className={classes['error-text']}>
                    First Name must not be empty!
                  </p>
                )}
              </div>
              <div className={lastNameInputClasses}>
                <label htmlFor='name'>Last Name</label>
                <input
                  type='text'
                  id='name'
                  value={enteredLastName}
                  onChange={lastNameChangeHandler}
                  onBlur={lastNameBlurHandler}
                />
                {lastNameInputHasError && (
                  <p className={classes['error-text']}>
                    Last Name must not be empty!
                  </p>
                )}
              </div>
            </div>
            <div className={classes['control-group']}>
              <div className={phonenumberInputClasses}>
                <label htmlFor='phonenumber'>Phone Number</label>
                <input
                  type='text'
                  id='phonenumber'
                  value={enteredPhonenumber}
                  onChange={phonenumberChangeHandler}
                  onBlur={phonenumberBlurHandler}
                />
                {phonenumberInputHasError && (
                  <p className={classes['error-text']}>
                    Phone number must be entered!
                  </p>
                )}
              </div>
            </div>
            <div className={addressInputClasses}>
              <label htmlFor='address'>Address</label>
              <input
                type='text'
                id='address'
                value={enteredAddress}
                onChange={addressChangeHandler}
                onBlur={addressBlurHandler}
              />
              {addressInputHasError && (
                <p className={classes['error-text']}>
                  Adress must not be empty!
                </p>
              )}
            </div>
            <div className={classes['order-details']}>
              <h3>Order Details:</h3>
              <div>{cartItems}</div>
              <h3>
                Total Price: <span>{totalPrice}</span>
              </h3>
            </div>
          </div>
          <div className={classes['form-actions']}>
            <button className={classes.button} disabled={!formIsValid}>
              SUBMIT
            </button>
          </div>
        </form>
      )}
    </>
  )
}

export default Checkout
