// Shows an error message when something goes wrong.
// message = the text to show (the page gives it to us)
export default function ErrorMessage({ message }) {
  return <p className="error">Error: {message}</p>
}
