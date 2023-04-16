import { Request, Response } from 'express'
import Deck from "../Models/Deck"

export async function getDeckController(req: Request, res: Response) {
    const { deckId } = req.params;
    const deck = await Deck.findById(deckId)
    res.json(deck)
}
