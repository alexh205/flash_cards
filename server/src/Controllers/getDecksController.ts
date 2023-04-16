import { Request, Response } from "express";
import Deck from "../Models/Deck"

export async function getDecksController(req: Request, res: Response) {
    const decks = await Deck.find();
    res.json(decks)
}
