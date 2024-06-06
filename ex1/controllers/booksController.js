const Book = require('../models/Book');

// GET /books: devolve uma lista com todos os registos
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/:id: devolve o registo com identificador id
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books?character=EEEE: devolve a lista dos livros em que EEEE faz parte do nome de um dos personagens
exports.getBooksByCharacter = async (req, res) => {
  try {
    const books = await Book.find({ characters: { $regex: req.query.character, $options: 'i' } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books?genre=AAA: devolve a lista dos livros associados ao género (genre) AAA
exports.getBooksByGenre = async (req, res) => {
  try {
    const books = await Book.find({ genres: { $regex: req.query.genre, $options: 'i' } });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/genres: devolve a lista de géneros ordenada alfabeticamente e sem repetições
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Book.distinct('genres');
    res.json(genres.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /books/characters: devolve a lista dos personagens ordenada alfabeticamente e sem repetições
exports.getAllCharacters = async (req, res) => {
  try {
    const characters = await Book.distinct('characters');
    res.json(characters.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /books: acrescenta um registo novo à BD
exports.addBook = async (req, res) => {
  const book = new Book({
    bookId: req.body.bookId,
    title: req.body.title,
    series: req.body.series,
    author: req.body.author,
    rating: req.body.rating,
    description: req.body.description,
    language: req.body.language,
    isbn: req.body.isbn,
    genres: req.body.genres,
    characters: req.body.characters,
    bookFormat: req.body.bookFormat,
    edition: req.body.edition,
    pages: req.body.pages,
    publisher: req.body.publisher,
    publishDate: req.body.publishDate,
    firstPublishDate: req.body.firstPublishDate,
    awards: req.body.awards,
    numRatings: req.body.numRatings,
    ratingsByStars: req.body.ratingsByStars,
    likedPercent: req.body.likedPercent,
    setting: req.body.setting,
    coverImg: req.body.coverImg,
    bbeScore: req.body.bbeScore,
    bbeVotes: req.body.bbeVotes,
    price: req.body.price
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /books/:id: elimina da BD o registo com o identificador id
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }
    await book.remove();
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /books/:id: altera o registo com o identificador id
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (req.body.bookId != null) {
      book.bookId = req.body.bookId;
    }
    if (req.body.title != null) {
      book.title = req.body.title;
    }
    if (req.body.series != null) {
      book.series = req.body.series;
    }
    if (req.body.author != null) {
      book.author = req.body.author;
    }
    if (req.body.rating != null) {
      book.rating = req.body.rating;
    }
    if (req.body.description != null) {
      book.description = req.body.description;
    }
    if (req.body.language != null) {
      book.language = req.body.language;
    }
    if (req.body.isbn != null) {
      book.isbn = req.body.isbn;
    }
    if (req.body.genres != null) {
      book.genres = req.body.genres;
    }
    if (req.body.characters != null) {
      book.characters = req.body.characters;
    }
    if (req.body.bookFormat != null) {
      book.bookFormat = req.body.bookFormat;
    }
    if (req.body.edition != null) {
      book.edition = req.body.edition;
    }
    if (req.body.pages != null) {
      book.pages = req.body.pages;
    }
    if (req.body.publisher != null) {
      book.publisher = req.body.publisher;
    }
    if (req.body.publishDate != null) {
      book.publishDate = req.body.publishDate;
    }
    if (req.body.firstPublishDate != null) {
      book.firstPublishDate = req.body.firstPublishDate;
    }
    if (req.body.awards != null) {
      book.awards = req.body.awards;
    }
    if (req.body.numRatings != null) {
      book.numRatings = req.body.numRatings;
    }
    if (req.body.ratingsByStars != null) {
      book.ratingsByStars = req.body.ratingsByStars;
    }
    if (req.body.likedPercent != null) {
      book.likedPercent = req.body.likedPercent;
    }
    if (req.body.setting != null) {
      book.setting = req.body.setting;
    }
    if (req.body.coverImg != null) {
      book.coverImg = req.body.coverImg;
    }
    if (req.body.bbeScore != null) {
      book.bbeScore = req.body.bbeScore;
    }
    if (req.body.bbeVotes != null) {
      book.bbeVotes = req.body.bbeVotes;
    }
    if (req.body.price != null) {
      book.price = req.body.price;
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
