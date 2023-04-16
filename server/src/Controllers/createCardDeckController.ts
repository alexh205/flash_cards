import { Request, Response } from "express";
import Deck from "../Models/Deck"

export async function createCardDeckController(req: Request, res: Response) {
    // obtain the deckId from the url
    const deckId = req.params.deckId
    // locate the deck within mongo
    const deck = await Deck.findById(deckId)

    // if deck doesn't exist, handle error
    if (!deck) return res.status(400).send('no deck of this id exists')

    // destruct the text from the req.body
    const { text } = req.body

    // save the text to the deck
    deck.cards.push(text)
    await deck.save()

    // return the modified deck to the requester
    res.json(deck)
}
