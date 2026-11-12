import { createContext, useContext } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

// Make an empty "box" that can hold shared data
const FavoritesContext = createContext(null)

// This component holds the favorites and shares them with its children
export function FavoritesProvider({ children }) {
  // favorites = list of recipe ids. It is saved in the browser.
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  // Add a recipe id to the list
  const addFavorite = (id) => {
    // prev = the current list. If id is already there, keep the list the same.
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  // Remove a recipe id from the list
  const removeFavorite = (id) => {
    // filter keeps every id EXCEPT the one we want to remove
    setFavorites((prev) => prev.filter((favId) => favId !== id))
  }

  // Check: is this id in the list? Gives true or false
  const isFavorite = (id) => favorites.includes(id)

  return (
    // Everything inside can read these 4 things
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

// A shortcut: components call useFavorites() to get the shared data
export function useFavorites() {
  return useContext(FavoritesContext)
}
