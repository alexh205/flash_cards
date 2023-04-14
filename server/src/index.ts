import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import Deck from './Models/Deck';

const app = express();

// Defining the server Port #
const PORT = 3000;

// connecting to the mongoose db
mongoose.connect(
  'mongodb+srv://demoflashCard:zk8o6EctXg3gLSqq@cluster0.el0lfdh.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
  console.log(`listening on port ${PORT}`)
})

app.use(express.json())

app.post('/decks', async (req: Request, res: Response) => {
  console.log(req.body)
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save()
  res.json(createdDeck)
});

app.listen(PORT);
