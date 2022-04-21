import React, { useRef, useContext } from 'react'

import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'
import AuthContext from '../../../store/auth-context'

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = React.useState(true)
  const amountInputRef = useRef()

  const authContext = useContext(AuthContext)

  const submitHandler = (e) => {
    e.preventDefault()

    const enterdAmount = amountInputRef.current.value
    const enterdAmountNumber = +enterdAmount

    if (
      enterdAmount.trim().length === 0 ||
      enterdAmountNumber < 1 ||
      enterdAmount > 5
    ) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enterdAmountNumber)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
        disabled={!authContext.isLoggedIn}
      />
      <button type='submit' disabled={!authContext.isLoggedIn}>
        Add
      </button>
      {!amountIsValid && <p>Please enter a valid amount (1-5)</p>}
    </form>
  )
}

export default MealItemForm