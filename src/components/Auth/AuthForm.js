import { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import wave from '../../assets/wave.png'
import bg from '../../assets/bg.svg'
import avatar from '../../assets/avatar.svg'
import classes from './AuthForm.module.css'
import AuthContext from '../../store/auth-context'

const AuthForm = () => {
  const history = useHistory()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authContext = useContext(AuthContext)

  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const [emailClasses, setEmailClasses] = useState(
    `${classes['input-div']} ${classes.one}`
  )
  const [passClasses, setPassClasses] = useState(
    `${classes['input-div']} ${classes.pass}`
  )

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitFormHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    //optional: Add validation here

    setIsLoading(true)
    let url
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyARt8BEr8Z2chVOoNwt0c7cRedSO8uftfU'
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyARt8BEr8Z2chVOoNwt0c7cRedSO8uftfU'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json()
        } else {
          const data = await res.json()
          let errorMessage = 'Authentication failed!'
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message
          }
          throw new Error(errorMessage)
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        )
        authContext.login(
          data.idToken,
          data.email,
          expirationTime.toISOString()
        )

        history.replace('/')
      })
      .catch((error) => {
        alert(error.message)
      })
  }

  const emailFocusHandler = () => {
    setEmailClasses(`${classes['input-div']} ${classes.one} ${classes.focus}`)
  }
  const emailBlurHandler = () => {
    setEmailClasses(`${classes['input-div']} ${classes.one}`)
  }

  const passFocusHandler = () => {
    setPassClasses(`${classes['input-div']} ${classes.pass} ${classes.focus}`)
  }
  const passBlurHandler = () => {
    setPassClasses(`${classes['input-div']} ${classes.pass}`)
  }

  return (
    <>
      <img className={classes.wave} src={wave} alt='wave' />
      <div className={classes.container}>
        <div className={classes.img}>
          <img src={bg} alt='background' />
        </div>
        <div className={classes['login-content']}>
          <form onSubmit={submitFormHandler}>
            <img src={avatar} alt='avatar' />
            <h2 className={classes.title}>Welcome</h2>
            <div className={emailClasses}>
              <div className={classes.i}>
                <i className='fas fa-user'></i>
              </div>
              <div className={classes.div}>
                <h5>Email</h5>
                <input
                  type='email'
                  id='email'
                  className={classes.input}
                  ref={emailInputRef}
                  onFocus={emailFocusHandler}
                  onBlur={emailBlurHandler}
                />
              </div>
            </div>
            <div className={passClasses}>
              <div className={classes.i}>
                <i className='fas fa-lock'></i>
              </div>
              <div className={classes.div}>
                <h5>Password</h5>
                <input
                  type='password'
                  id='password'
                  className={classes.input}
                  ref={passwordInputRef}
                  onFocus={passFocusHandler}
                  onBlur={passBlurHandler}
                />
              </div>
            </div>
            {!isLoading && (
              <button className={classes.btn}>
                {isLogin ? 'Login' : 'Create Account'}{' '}
              </button>
            )}
            {isLoading && (
              <p style={{ fontWeight: 'bold', fontSize: 20 }}>
                Sending request...
              </p>
            )}
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthForm
