let mongoose = require('mongoose')
let Book = require('../models/book')

getBooks = (req, res) => {
  let query = Book.find();

  query.exec( (err, books) => {
    if (err) { 
      res.send(err);
    } else {
      res.json(books);
    }
  });
}

postBook = (req, res) => {
  let newBook = new Book(req.body);

  newBook.save((err, book)=> {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Book added', book });
    }
  });
}

getBook = (req, res) => {
  Book.find({_id: req.params.id}, (err, book) => {
    if (err) res.send(err);

    res.json(book);
  });
}

deleteBook = (req, res) => {
  Book.remove({_id: req.params.id}, (err, result) => {
    res.json({ message: 'Book deleted!', result });
  })
}

updateBook = (req, res) => {
  Book.find({_id: req.params.id}, (err, book) => {
    if (err) res.send(err);

    Object.assign(book, req.body).save((err, book) => {
      if(err) res.send(err);

      res.json({ message: 'Book updated!', book });
    })
  })
}

module.exports = {
  getBooks,
  postBook,
  getBook,
  deleteBook,
  updateBook
}
