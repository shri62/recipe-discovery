import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import ErrorMessage from '../components/ErrorMessage'

export default function Home() {
  // Get the list of all categories from the API
  const { data, loading, error } = useFetch(
    'https://www.themealdb.com/api/json/v1/1/categories.php'
  )

  // 1. Still waiting? Show the spinner
  if (loading) return <Spinner />
  // 2. Something failed? Show the error
  if (error) return <ErrorMessage message={error} />

  // 3. Data is ready, show it
  return (
    <div>
      <h1>Categories</h1>
      <div className="grid">
        {/* map = make one box for each category */}
        {data.categories.map((cat) => (
          <Link
            key={cat.idCategory} // key helps React track each item
            to={`/category/${cat.strCategory}`} // go to that category page
            className="card"
          >
            <img src={cat.strCategoryThumb} alt={cat.strCategory} />
            <h3>{cat.strCategory}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
