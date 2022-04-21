import React, { useState, useRef, useContext } from 'react'

import AuthContext from '../../store/auth-context'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './EditProfile.module.css'

export const EditProfile = () => {
  const [isLoading, setIsLoading] = useState(false)

  const passwordInputRef = useRef()
  const passwordConfirmInputRef = useRef()

  const { login, token } = useContext(AuthContext)

  const submitFormHandler = (e) => {
    e.preventDefault()

    setIsLoading(true)
    // optional: Add validation here

    if (
      passwordInputRef.current.value !== passwordConfirmInputRef.current.value
    ) {
      alert('Passwords do not match')
      return
    }

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyARt8BEr8Z2chVOoNwt0c7cRedSO8uftfU',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          password: passwordInputRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then(async (res) => {
        setIsLoading(false)
        if (res.ok) {
          alert('Password changed successfully')
          const data = await res.json()
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          )
          login(data.idToken, data.email, expirationTime.toLocaleString())
        } else {
          const data = await res.json()
          let errorMessage = 'Authentication failed!'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
            // errorMessage = data?.error?.message
          }
          throw new Error(errorMessage)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.cardStyle}>
        <form onSubmit={submitFormHandler} id='signupForm'>
          <h2 className={classes.formTitle}>Change password</h2>

          <div className={classes.inputDiv}>
            <label className={classes.inputLabel}>New Password</label>
            <input
              type='password'
              id='password'
              name='password'
              minLength={6}
              ref={passwordInputRef}
              required
            />
          </div>

          <div className={classes.inputDiv}>
            <label className={classes.inputLabel}>Confirm Password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              minLength={6}
              ref={passwordConfirmInputRef}
            />
          </div>

          <div className={classes.buttonWrapper}>
            {isLoading ? (
              <div style={{ textAlign: 'center' }}>
                <LoadingSpinner />
              </div>
            ) : (
              <button
                className={`${classes.submitButton} ${classes['pure-button']} ${classes['pure-button-primary']}`}
              >
                <span>Change</span>
                <span id='loader'></span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
