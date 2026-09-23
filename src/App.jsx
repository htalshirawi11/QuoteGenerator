import { useState, useEffect } from "react"
import "./App.css"

function App() {
  // Background colors
  const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ]

  const [background, setBackground] = useState(backgrounds[0])

  // Display quote
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")

  // Adding in your own quotes
  const [quoteInput, setQuoteInput] = useState("")
  const [authorInput, setAuthorInput] = useState("")
  const [myQuote, setMyQuote] = useState([])

  // Quote Generator main method
  async function getRandomQuote() { 
    // Deciding to use a random quote or your own quote
    const useMyQuotes = myQuote.length > 0 && Math.random() < 0.5

    // Use your own quotes
    if (useMyQuotes) {
      const randomIndex = Math.floor(Math.random() * myQuote.length)
      setQuote(myQuote[randomIndex].quote)
      setAuthor(myQuote[randomIndex].author)
    } 
    // Use the APU to get a random quote
    else {
      const response = await fetch("https://api.api-ninjas.com/v2/randomquotes", {
        headers: {
          "X-Api-Key": "fqCjzKkwiuCA5ydFjkWsiRhzcAglFVmluzP1XGHP"
        }
      })
      const data = await response.json()
      setQuote(data[0].quote)
      setAuthor(data[0].author)
    }

    // Chainging the background color each time a new quote is generated
    const backgroundColour = backgrounds[Math.floor(Math.random() * backgrounds.length)]
    setBackground(backgroundColour)
  }

  // Calling the method when the page loads
  useEffect(() => {
    getRandomQuote()
  }, [])

  // Getting your quotes
  function handleMyQuotes(e) {
    e.preventDefault();
    if (quoteInput.trim() === "" || authorInput.trim() === "") return

    const newQuote = {quote: quoteInput, author: authorInput}
    setMyQuote([...myQuote, newQuote])
    setQuoteInput("")
    setAuthorInput("")
  }

  // This is the hardcoded way i started with to get the layout correct first
  // const quotes = [
  //   "I'll spread my wings I will learn how to fly, I'll do what it takes till I touch the sky.",
  //   "Failure is not an option.",
  //   "Perfection is not attainable, but if we chase perfection we can catch excellence.",
  //   "Do the best you can until you know better. Then when you know better, do better."
  // ]

  // function getRandomQuote() {o
  //   const randomIndex = Math.floor(Math.random() * quotes.length)
  //   setQuote(quotes[randomIndex])
  // }

  // Display
  return (
    <div className="page" style={{ background }}>
      <div className="card">
        <h1>Quote Generator</h1>
        {/* The quote generator */}
        <p>{quote}</p>
        <p><em>- {author}</em></p>

        <button onClick={getRandomQuote}>New Quote</button>

        <hr />

        {/* Section to add your own quotes */}
        <h2>Add Your Own Quote</h2>
        <form onSubmit={handleMyQuotes}>
          <input
            type = "text"
            placeholder="Quote"
            value={quoteInput}
            onChange={(e) => setQuoteInput(e.target.value)}
          />

          <input
            type = "text"
            placeholder = "Author"
            value={authorInput}
            onChange={(e) => setAuthorInput(e.target.value)}
          />

          <button type="submit">Add Quote</button>
        </form>

        {/* Listing your quotes */}
        {myQuote.length > 0 && (
          <div className="my-quotes">
            <h3>Your Quotes</h3>
            <ul>
              {myQuote.map((q, index) => (
                <li key={index}>"{q.quote}" - {q.author}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default App