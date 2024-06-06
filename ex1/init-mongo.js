const mongoose = require('mongoose');
const Book = require('./models/Book');
const fs = require('fs');

// URL do MongoDB
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/livros';

// Conectar ao MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Conectado ao MongoDB');

    // Ler o arquivo de dataset
    const data = JSON.parse(fs.readFileSync('dataset.json', 'utf8'));

    // Limpar a coleção antes de importar novos dados
    await Book.deleteMany({});

    // Inserir os dados
    await Book.insertMany(data);

    console.log('Dados importados com sucesso');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB ou importar dados', err);
  });
