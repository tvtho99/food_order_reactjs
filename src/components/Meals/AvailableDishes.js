import { useState, useCallback, useEffect } from 'react'

import Dish from './MealItem/Dish'
import LoadingSpinner from '../UI/LoadingSpinner'
import classes from './AvailableDishes.module.css'

const AvailableDishes = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

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

      const mealItemList = mealsList.map((meal) => (
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
  }, [])

  useEffect(() => {
    fecthMeals()
  }, [fecthMeals])

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

  return (
    <section className={classes.dishes} id='dishes'>
      <h1 className={classes.heading}>Today's Choices</h1>

      <div className={classes['box-container']}>{meals}</div>
    </section>
  )
}

export default AvailableDishes
