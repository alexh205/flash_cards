import { config } from 'dotenv'
config()
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { getDecksController } from './Controllers/getDecksController';
import { createDecksController } from './Controllers/createDecksController';
import { deleteDecksController } from './Controllers/deleteDecksController';
import { createCardDeckController } from './Controllers/createCardDeckController';
import { getDeckController } from './Controllers/getDeckController';
import { deleteCardDeckController } from './Controllers/deleteCardDeckController';


// Defining the server Port #
const PORT = 3000;

const app = express();

app.use(cors({
  origin: '*'
}))

app.use(express.json())

app.get('/decks', getDecksController)
app.get('/decks/:deckId', getDeckController)

app.post('/decks', createDecksController);
app.post('/decks/:deckId/cards', createCardDeckController);

app.delete('/decks/:deckId', deleteDecksController)
app.delete('/decks/:deckId/cards/:index', deleteCardDeckController)
// connecting to the mongoose db
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});
