import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { deleteDecks } from './API/deleteDecks'
import { TDeck, getDecks } from './API/getDecks'
import { createDecks } from './API/createDecks'
import './App.css'


const Deck = () => {
    const [cards, setCards] = useState<string[]>([]);
    const [text, setText] = useState('');
    const { deckId } = useParams();

    const handleCreateCard = async (e: React.FormEvent) => {
        e.preventDefault()

        const deck = await createDecks(deckId!, text);
        // setDecks([...decks, deck])
        setText('')
    }

    return (
        <div className="App">
            <form onSubmit={handleCreateCard} className="appForm">
                <label htmlFor="deck-title">Deck text</label>
                <input id="card-text" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {

                    setText(e.target.value)
                }
                } />
                <button id='formButton'>Create Card</button>
            </form>
        </div>
    )
}

export default Deck
