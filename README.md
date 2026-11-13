# Recipe Discovery

A React app that uses TheMealDB API (free, no key needed). You can browse
recipes by category, search recipes by name, see recipe details, and save
your favorite recipes. Favorites are saved in the browser, so they stay
after you refresh the page.

## Features
- See all recipe categories on the home page
- See all recipes of one category (/category/Seafood)
- See recipe details: image, ingredients, and instructions (/recipe/52772)
- Add or remove favorites (/favorites)
- Search recipes by name (/search?query=Arrabiata)
- Loading message, error message, and "not found" messages

## Tech used
- React
- React Router (for pages and links)
- Vite (to run and build the project)
- Plain CSS

## How to run
```bash
npm install
npm run dev
```
Then open the link shown in the terminal (usually http://localhost:5173).

## Project structure
```
src/
  hooks/       useFetch.js, useLocalStorage.js
  context/     FavoritesContext.jsx
  components/  Navbar, RecipeCard, Spinner, ErrorMessage
  pages/       Home, Category, RecipeDetail, Favorites, SearchResults
```

## Reflection

**Q: What was the most challenging part of the project?**

A: The most challenging part was understanding how all the pieces connect.
At first I did not know how `useFetch`, the context, and the routes work
together. I also made small mistakes that stopped the app, like spelling
`BrowserRouter` wrong and leaving a stray letter in a file. Reading the
error message and going to the file and line it showed helped me fix them.
Another hard part was the Favorites page. The context only saves recipe
ids, so I had to fetch the details of each recipe from its id.

**Q: Why did you make `useFetch` a custom hook?**

A: Five pages need to get data from the API, and each one needs data,
loading, and error. A custom hook lets me write that code one time and
use it everywhere. It also keeps the pages short and easy to read.

**Q: Why does `useFetch` accept `null` as the url?**

A: On the search page, the search text can be empty. If the url is `null`,
the hook does nothing. This means I can still call the hook every time,
which is a rule of hooks, but it does not fetch when there is nothing to
search.

**Q: Why does `useFetch` cancel old requests?**

A: If the user moves to another page before the first request finishes,
the old answer should not replace the new data. The hook cancels the old
request when the url changes or when the page closes.

**Q: Why did you use Context for favorites?**

A: The navbar, the recipe page, and the favorites page all need the same
list of favorites. Context shares the list with all of them, so I do not
have to pass it down through many components. The context also uses
`useLocalStorage`, so the list is saved in the browser.

**Q: Why does the favorites list only store ids?**

A: Ids are small and easy to save. The full recipe data can always be
fetched again from the API, so I do not need to store it.

**Q: How did you handle loading and errors?**

A: Every page checks three things in the same order: loading, then error,
then data. While loading, it shows a spinner. If the request fails, it shows
an error message. I also handle empty results, because the API returns
`null` when nothing is found.

**Q: What would you improve next?**

A: I would load all favorites with fewer requests, add a "clear all
favorites" button, and make the design look better.
