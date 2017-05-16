let express = require('express')
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
let config = require('./config/dev');
let book = require('./routes/book');

let app = express();
let port = 8080;

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000} }
};

mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (request, response) => {
  response.send({ message: "Welcome!"});
});

app.route('/books')
  .get(book.getBooks)
  .post(book.postBook);

app.route('/book/:id')
  .get(book.getBook)
  .delete(book.deleteBook)
  .put(book.updateBook);

app.listen(port);
console.log('listening on port ' + port);

module.exports = app;