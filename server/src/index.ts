import { config } from 'dotenv'
config()
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './Models/Deck';


// Defining the server Port #
const PORT = 3000;

const app = express();

app.use(cors({
  origin: '*'
}))
app.use(express.json())

app.get('/decks', async (req: Request, res: Response) => {
  // fetch all deck
  const decks = await Deck.find()
  // return the decks to the user
  res.json(decks)

})

app.post('/decks', async (req: Request, res: Response) => {
  // create a new Deck class obj
  const newDeck = new Deck({
    title: req.body.title,
  });

  // save the newly created deck obj the mongo database
  const createdDeck = await newDeck.save()

  // return the newly created deck obj to the user
  res.json(createdDeck)
});

app.delete('/decks/:deckId', async (req: Request, res: Response) => {
  // Get the deck id from the url

  const deckId = req.params.deckId;
  // delete from the mongo database
  const deck = await Deck.findByIdAndDelete(deckId)
  // return the deleted deck back to the user who made the request
  res.json(deck)
})

// connecting to the mongoose db
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
