import { useState, useCallback, useEffect } from 'react'

import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'
import LoadingSpinner from '../UI/LoadingSpinner'

const AvailableMeals = () => {
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
        <MealItem
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
      <div className={classes.MealsLoading}>
        <LoadingSpinner />
      </div>
    )
  }
  if (error) {
    return <div className={classes.MealsError}>{error}</div>
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
