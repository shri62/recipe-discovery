import { useState, useEffect } from 'react'

// This hook gets data from a url.
// It gives back: data, loading (true/false), error (message or null)
export default function useFetch(url) {
  // data = the result from the API (empty at first)
  const [data, setData] = useState(null)
  // loading = true while we wait for the answer
  const [loading, setLoading] = useState(true)
  // error = text of the problem, if something fails
  const [error, setError] = useState(null)

  // useEffect runs after the page shows. It runs again if url changes.
  useEffect(() => {
    // If there is no url, there is nothing to fetch
    if (!url) {
      setLoading(false)
      return
    }

    // This lets us cancel the request if we leave the page early
    const controller = new AbortController()

    // Start fresh: we are loading and there is no error yet
    setLoading(true)
    setError(null)

    // Ask the server for the data
    fetch(url, { signal: controller.signal })
      .then((res) => {
        // If the server says it failed, jump to .catch
        if (!res.ok) throw new Error('Request failed')
        // Turn the answer into a JavaScript object
        return res.json()
      })
      .then((json) => {
        // Save the data and stop loading
        setData(json)
        setLoading(false)
      })
      .catch((err) => {
        // If WE cancelled it, it is not a real error, so do nothing
        if (err.name === 'AbortError') return
        // Save the error message and stop loading
        setError(err.message)
        setLoading(false)
      })

    // Cleanup: cancel the old request when url changes or page closes
    return () => controller.abort()
  }, [url]) // [url] = run this again only when url changes

  // Give these 3 values to the page that uses this hook
  return { data, loading, error }
}
