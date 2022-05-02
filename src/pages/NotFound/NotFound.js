import React from 'react'
import { Link } from 'react-router-dom'

import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <>
      <div id='notfound'>
        <div className={classes.notfound}>
          <div className={classes['notfound-404']}>
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>Page you are looking for does not exist.</p>
          <Link to='/'>Go To Homepage</Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
