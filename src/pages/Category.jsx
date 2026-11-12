import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

export default function Category() {
  // Read the category name from the url (e.g. "Seafood")
  const { categoryName } = useParams()

  // Get all recipes in that category
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  // If nothing is found, the API does not give a list, so we use an empty list
  const meals = Array.isArray(data.meals) ? data.meals : []

  return (
    <div>
      <h1>{categoryName}</h1>
      {/* Show a message if the list is empty */}
      {meals.length === 0 && <p>No recipes found.</p>}
      <div className="grid">
        {/* One card for each recipe */}
        {meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
          />
        ))}
      </div>
    </div>
  )
}
