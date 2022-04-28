import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import wave from '../../assets/wave.png'
import classes from './ResetPassForm.module.css'

const ResetPassForm = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')

  const [showEmail, setShowEmail] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const [isSended, setIsSended] = useState(false)

  const [emailClasses, setEmailClasses] = useState(
    `${classes['input-div']} ${classes.one}`
  )

  const submitFormHandler = (event) => {
    event.preventDefault()

    if (isSended) {
      history.push('/auth')
      return
    }

    const enteredEmail = email

    //optional: Add validation here

    setIsLoading(true)

    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyARt8BEr8Z2chVOoNwt0c7cRedSO8uftfU'

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: enteredEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        setIsLoading(false)
        if (res.ok) {
          setIsSended(true)
        } else {
          const data = await res.json()
          let errorMessage = 'Reset password failed!'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const emailFocusHandler = () => {
    setEmailClasses(`${classes['input-div']} ${classes.one} ${classes.focus}`)
    setShowEmail(true)
  }
  const emailBlurHandler = () => {
    setEmailClasses(`${classes['input-div']} ${classes.one}`)
    if (email) {
      setShowEmail(false)
    }
  }

  return (
    <>
      <img className={classes.wave} src={wave} alt='wave' />
      <div className={classes.container}>
        <div className={classes.img}>{/* <img src={bg} alt='bg' /> */}</div>
        <div className={classes['login-content']}>
          <form onSubmit={submitFormHandler}>
            {isSended ? null : <h2>Reset Password</h2>}
            {isSended ? (
              <div>
                <h3>We sent you an email!</h3>
                <p> Please check your email for reseting your email </p>{' '}
              </div>
            ) : (
              <div className={emailClasses}>
                <div className={classes.i}>
                  <i className='fa-regular fa-envelope'></i>
                </div>

                <div className={classes.div}>
                  {showEmail && <h5>Your Email</h5>}
                  <input
                    type='email'
                    id='email'
                    className={classes.input}
                    onFocus={emailFocusHandler}
                    onBlur={emailBlurHandler}
                    value={email}
                    required
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>
            )}
            {!isLoading && (
              <button className={classes.btn}>
                {isSended ? 'Login Now' : 'Reset Password'}
              </button>
            )}
            {isLoading && (
              <p
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
              >
                Sending request...
              </p>
            )}
            {!isSended && <Link to='/auth'>Return to Login</Link>}
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetPassForm
