import { Link } from 'react-router-dom'

// One recipe box with a picture and a name.
// Clicking it opens that recipe's page.
export default function RecipeCard({ id, name, image }) {
  return (
    // Link works like <a> but does not reload the page
    <Link to={`/recipe/${id}`} className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
    </Link>
  )
}
