import { useState, useCallback, useEffect } from 'react'

import Dish from './MealItem/Dish'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './AvailableDishes.module.css'

const AvailableDishes = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const fecthMeals = useCallback(async () => {
    try {
      const response = await fetch(
        'https://react-http-requests-f261a-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
      )
      if (!response.ok) {
        throw new Error('Something went wrong!')
      }
      const responseData = await response.json()

      const mealsList = Object.keys(responseData).map((key) => ({
        id: key,
        ...responseData[key],
      }))

      const mealItemList = mealsList
        .filter((meal) => {
          if (searchTerm === '') {
            return true
          } else
            return meal.name
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase())
        })
        .map((meal) => (
          <Dish
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            image={meal.image}
          />
        ))
      setMeals(mealItemList)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }, [searchTerm])

  useEffect(() => {
    fecthMeals()
  }, [fecthMeals])

  const toggleSearchHandler = () => {
    if (showSearch) {
      setSearchTerm('')
    }
    setShowSearch((prev) => !prev)
  }

  if (isLoading) {
    return (
      <div className={classes.DishesLoading}>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    return <div className={classes.DishesError}>{error}</div>
  }

  let searchClasses = classes.search
  if (showSearch) {
    searchClasses = [classes.search, classes.active].join(' ')
  }

  return (
    <section className={classes.dishes} id='dishes'>
      <label
        htmlFor='search'
        onClick={toggleSearchHandler}
        className={classes['search-toggle-label']}
      >
        {showSearch ? (
          <i class='fa-solid fa-xmark'></i>
        ) : (
          <i className='fa fa-search'></i>
        )}
      </label>
      <input
        type='text'
        id='search'
        name='keywords'
        placeholder='Search for a dish...'
        value={searchTerm}
        className={searchClasses}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <h1 className={classes.heading}>Today's Choices</h1>
      <div className={classes['box-container']}>{meals}</div>
    </section>
  )
}

export default AvailableDishes
