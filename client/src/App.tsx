import React, { useState, useEffect } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import { deleteDecks } from './API/deleteDecks'
import { TDeck, getDecks } from './API/getDecks'
import { createDecks } from './API/createDecks'


function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([])

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault()

    const deck = await createDecks(title)
    setDecks([...decks, deck])
    setTitle('')
  }

  const handleDeleteDeck = async (deckId: string) => {

    await deleteDecks(deckId)
    // delete the current deckId object
    setDecks(decks.filter((deck) => deck._id != deckId))
  }

  useEffect(() => {
    async function fetchDecks() {

      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className='decks'>
        {decks.map((deck) => <li key={deck._id}>
          <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
          <Link to={`decks/${deck._id}`}>{deck.title}</Link>
        </li>
        )}
      </ul>
      <form onSubmit={handleCreateDeck} className="appForm">
        <label htmlFor="">Deck Title</label>
        <input id="deck-title" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { //Generic typescript assignment
          // TODO: save what you typed
          setTitle(e.target.value)
        }
        } />
        <button id='formButton'>Create Deck</button>
      </form>
    </div>
  )
}

export default App
