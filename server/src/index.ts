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
  // TODO: fetch all deck and send back to the user
  const decks = await Deck.find()
  res.json(decks)

})

app.post('/decks', async (req: Request, res: Response) => {

  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
});

// connecting to the mongoose db
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
