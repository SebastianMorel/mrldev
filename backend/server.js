// server.js
const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://mrldev:' + process.env.MONGODB_PASSWORD + '@mrldbcluster.4aixyfa.mongodb.net/?retryWrites=true&w=majority'
, { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

const isProduction = process.env.NODE_ENV === 'production';
const origin = {
  origin: isProduction ? 'https://mrl.dev' : 'http://localhost:3000',
};
app.use(cors(origin));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/check-status', async (req, res) => {
  const url = req.query.url;
  try {
    await axios.get(url);
    res.json({ status: 'up' });
  } catch (error) {
    console.error(error);  // Log the error
    res.json({ status: 'down' });
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, function() {
  console.log('Server is running on port ' + port);
});

app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (error) {
    res.status(400).send(error);
  }
});