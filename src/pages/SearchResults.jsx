import { useSearchParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

export default function SearchResults() {
  // Read the text after ?query= in the url
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''

  // If there is a query, search for it. If not, pass null (do nothing).
  const { data, loading, error } = useFetch(
    query
      ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`
      : null
  )

  // Nothing typed yet
  if (!query) return <p>Type a recipe name in the search bar.</p>
  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />

  // data?.meals is safe even if data is null. No match gives null, so use [].
  const meals = data?.meals || []

  return (
    <div>
      <h1>Results for "{query}"</h1>
      {meals.length === 0 && <p>No recipes found.</p>}
      <div className="grid">
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
