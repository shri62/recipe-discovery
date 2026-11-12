import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useFavorites } from '../context/FavoritesContext'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function RecipeDetail() {
  // Read the recipe id from the url (e.g. 52772)
  const { recipeId } = useParams()

  // Get the full details of this one recipe
  const { data, loading, error } = useFetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  )
  // Get the favorites tools from the context
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  if (loading) return <Spinner />
  if (error) return <ErrorMessage message={error} />
  // If the id is wrong, the API gives no meals
  if (!data.meals) return <p>Recipe not found.</p>

  // The API gives a list with one recipe, so take the first one
  const meal = data.meals[0]

  // Ingredients are stored as strIngredient1, strIngredient2 ... up to 20.
  // We loop and collect the ones that are not empty.
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`)
    }
  }

  // true if this recipe is already a favorite
  const favorited = isFavorite(meal.idMeal)

  return (
    <div>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} width="300" />
      <p>
        {meal.strCategory} - {meal.strArea}
      </p>

      {/* If it is a favorite, remove it. If not, add it. */}
      <button
        onClick={() =>
          favorited ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal)
        }
      >
        {/* Button text changes too */}
        {favorited ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p className="instructions">{meal.strInstructions}</p>
    </div>
  )
}
