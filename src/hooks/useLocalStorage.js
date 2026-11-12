import { useState, useEffect } from 'react'

// Works like useState, but also saves the value in the browser.
// key = the name we save it under, initialValue = value if nothing saved
export default function useLocalStorage(key, initialValue) {
  // The function inside useState runs only once, when the app starts
  const [value, setValue] = useState(() => {
    try {
      // Look for a saved value in the browser
      const saved = localStorage.getItem(key)
      // If found, turn the text back into real data. If not, use the start value.
      return saved !== null ? JSON.parse(saved) : initialValue
    } catch {
      // If reading fails, just use the start value
      return initialValue
    }
  })

  // Every time value changes, save it in the browser
  useEffect(() => {
    // localStorage only saves text, so JSON.stringify turns data into text
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Same shape as useState: [value, function to change it]
  return [value, setValue]
}
