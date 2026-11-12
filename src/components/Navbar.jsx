import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  // term = what the user types in the search box
  const [term, setTerm] = useState('')
  // navigate lets us go to another page with code
  const navigate = useNavigate()
  // We only need the favorites list, to show how many there are
  const { favorites } = useFavorites()

  // Runs when the user submits the search form
  const handleSubmit = (e) => {
    e.preventDefault() // stop the page from reloading
    // Only search if the box is not empty
    if (term.trim()) {
      // Go to the search page, e.g. /search?query=pasta
      navigate(`/search?query=${encodeURIComponent(term.trim())}`)
    }
  }

  return (
    <header className="navbar">
      <Link to="/">Recipe Discovery</Link>

      <form onSubmit={handleSubmit}>
        <input
          value={term} // box shows what is in state
          onChange={(e) => setTerm(e.target.value)} // update state when typing
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Show how many favorites there are */}
      <Link to="/favorites">Favorites ({favorites.length})</Link>
    </header>
  )
}
