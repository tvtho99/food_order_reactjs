import React from 'react'
import { Link } from 'react-router-dom'

import classes from './Navbar.module.css'

const Navbar = () => {
  return (
    <>
      {' '}
      <header className={classes.header}>
        <Link to='/' className={classes.logo}>
          <span>
            <i className='fa-solid fa-house'></i>
          </span>
        </Link>
      </header>
      <section className={classes.blank}></section>
    </>
  )
}

export default Navbar
