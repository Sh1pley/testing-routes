import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'

let app = express();
let port = 8080;
let book = require('./routes/book');
let config = require('config');

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if ( config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (request, response) => response.json({ message: "Welcome!"}));

app.route('/book')
  .get(book.getBooks)
  .post(book.postBook);

app.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log('listening on port ' + port);

module.exports = app;