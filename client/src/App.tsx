import React, { useState, useEffect } from 'react'
import './App.css'

type TDeck = {
  title: string
  _id: string
}
function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([])

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const deck = await response.json()
    setDecks([...decks, deck])
    setTitle('')
  }

  const handleDeleteDeck = async (deckId: string) => {

    await fetch(`http://localhost:3000/decks/${deckId}`, {
      method: "DELETE"
    })
    // refetch all the decks (not optimal)
    // only delete the current deckId object
    setDecks(decks.filter((deck) => deck._id != deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:3000/decks')
      const newDecks = await response.json()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className='decks'>
        {decks.map((deck) => <li key={deck._id}>{deck.title}
          <button onClick={() => handleDeleteDeck(deck._id)}>X</button></li>)}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="">Deck Title</label>
        <input id="deck-title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { //Generic typescript assignment
          // TODO: save what you typed
          setTitle(e.target.value)
        }
        } />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
