import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import GoogleButton from 'react-google-button'

import { auth, provider } from '../../firebase'
import wave from '../../assets/wave.png'
import avatar from '../../assets/avatar.svg'
import classes from './AuthForm.module.css'
import AuthContext from '../../store/auth-context'
import { Link } from 'react-router-dom'

const AuthForm = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showEmail, setShowEmail] = useState(true)
  const [showPassword, setShowPassword] = useState(true)

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

    const enteredEmail = email
    const enteredPassword = password

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
          data.displayName,
          expirationTime.toLocaleString()
        )

        history.replace('/')
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

  const passFocusHandler = () => {
    setPassClasses(`${classes['input-div']} ${classes.pass} ${classes.focus}`)
    setShowPassword(true)
  }
  const passBlurHandler = () => {
    setPassClasses(`${classes['input-div']} ${classes.pass}`)
    if (password) {
      setShowPassword(false)
    }
  }

  return (
    <>
      <img className={classes.wave} src={wave} alt='wave' />
      <div className={classes.container}>
        <div className={classes.img}>{/* <img src={bg} alt='bg' /> */}</div>
        <div className={classes['login-content']}>
          <form onSubmit={submitFormHandler}>
            <img src={avatar} alt='avatar' />
            <h2 className={classes.title}>Welcome</h2>
            <div className={emailClasses}>
              <div className={classes.i}>
                <i className='fas fa-user'></i>
              </div>
              <div className={classes.div}>
                {showEmail && <h5>Email</h5>}
                <input
                  type='email'
                  id='email'
                  className={classes.input}
                  onFocus={emailFocusHandler}
                  onBlur={emailBlurHandler}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className={passClasses}>
              <div className={classes.i}>
                <i className='fas fa-lock'></i>
              </div>
              <div className={classes.div}>
                {showPassword && <h5>Password</h5>}
                <input
                  type='password'
                  id='password'
                  className={classes.input}
                  onFocus={passFocusHandler}
                  onBlur={passBlurHandler}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
            {!isLoading && (
              <button className={classes.btn}>
                {isLogin ? 'Login' : 'Create Account'}{' '}
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
                Logging in...
              </p>
            )}
            <Link to='/auth/reset-password'>Forgot Password?</Link>
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            <div className={classes['google-btn']}>
              <GoogleButton
                onClick={() => {
                  console.log('google')
                  signInWithPopup(auth, provider)
                    .then((result) => {
                      console.log(result)
                      const user = result.user
                      const expirationTime = new Date(
                        new Date().getTime() +
                          +user.stsTokenManager.expirationTime
                      )
                      authContext.login(
                        user.accessToken,
                        user.email,
                        user.displayName,
                        expirationTime.toLocaleString()
                      )

                      history.replace('/')
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default AuthForm
