import { Request, Response } from 'express'
import Deck from "../Models/Deck"

export async function deleteDecksController(req: Request, res: Response) {

    // Get the deck id from the url

    const deckId = req.params.deckId;
    // delete from the mongo database
    const deck = await Deck.findByIdAndDelete(deckId)
    // return the deleted deck back to the user who made the request
    res.json(deck)
}
