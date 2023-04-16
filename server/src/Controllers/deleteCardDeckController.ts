import { Request, Response } from 'express'
import Deck from "../Models/Deck"

export async function deleteCardDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const index = req.params.index

    const deck = await Deck.findById(deckId)
    if (!deck) return res.status(400).send('no deck can be found for this id')

    deck.cards.splice(parseInt(index), 1)
    await deck.save()
    res.json(deck)
}
