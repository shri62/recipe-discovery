import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

// Small component: loads ONE favorite recipe from its id.
// We only saved ids, so we must fetch the details of each one.
function FavoriteItem({ id }) {
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  )

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  // If the recipe no longer exists, show nothing
  if (!data.meals) return null

  const meal = data.meals[0]
  return (
    <RecipeCard id={meal.idMeal} name={meal.strMeal} image={meal.strMealThumb} />
  )
}

export default function Favorites() {
  // The list of favorite ids
  const { favorites } = useFavorites()

  // No favorites yet: show a friendly message with a link
  if (favorites.length === 0) {
    return (
      <p>
        No favorites yet. <Link to="/">Browse recipes</Link> and add some!
      </p>
    )
  }

  return (
    <div>
      <h1>Your Favorites</h1>
      <div className="grid">
        {/* One FavoriteItem for each saved id */}
        {favorites.map((id) => (
          <FavoriteItem key={id} id={id} />
        ))}
      </div>
    </div>
  )
}
