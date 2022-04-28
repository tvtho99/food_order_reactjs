import { useState } from 'react'

import LoaderGif from '../../assets/loader.gif'
import classes from './Loading.module.css'

const Loading = () => {
  const [loaderClasses, setLoaderClasses] = useState(
    classes['loader-container']
  )

  const hideLoaderHandler = () => {
    console.log('hideLoaderHandler')
    document.title = 'What2Eat'
    setLoaderClasses(`${classes['loader-container']} ${classes['fade-out']}`)
  }

  window.onload = () => {
    console.log('window.onload')
    document.title = 'Loading...'
    setTimeout(hideLoaderHandler, 3000)
  }
  return (
    <div className={loaderClasses}>
      <img src={LoaderGif} alt='loader' />
    </div>
  )
}

export default Loading
