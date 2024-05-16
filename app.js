const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');
const categoriesRouter = require('./routes/categories');

const connectToDatabase = require('./database/connect');
const cors = require('./middlewares/cors');
const apiRouter = require('./routes/apiRouter');

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(
  cors, 
  bodyParser.json(),
  express.static(path.join(__dirname, 'public')),
  apiRouter
);

console.log(`HOSTED AT: http://localhost:${PORT}/`);

app.listen(PORT);