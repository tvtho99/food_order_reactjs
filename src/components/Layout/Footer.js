import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Footer.module.css'

const Footer = () => {
  return (
    <section className={classes.footer}>
      <div className={classes['box-container']}>
        <div className={classes.box}>
          <h3>locations</h3>
          <p>Vietnam</p>
          <p>japan</p>
          <p>Singapore</p>
          <p>USA</p>
        </div>

        <div className={classes.box}>
          <h3>quick links</h3>
          <Link to='/home'>home</Link>
          <Link to='/profile'>profile</Link>
          <Link to='/orders'>orders</Link>
        </div>

        <div className={classes.box}>
          <h3>contact info</h3>
          <p>+84357793584</p>
          <p>tvtho99@gmail.com</p>
          <p>Hanoi, Vietnam</p>
        </div>

        <div className={classes.box}>
          <h3>follow me</h3>
          <a href='/'>facebook</a>
          <a href='/'>twitter</a>
          <a href='/'>github</a>
          <a href='/'>linkedin</a>
        </div>
      </div>

      <div className={classes.credit}>
        {' '}
        copyright @ 2022 by <span>tvtho</span>{' '}
      </div>
    </section>
  )
}

export default Footer
