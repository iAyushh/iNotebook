const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/iNotebook');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
  }
};

module.exports = connectToMongo;