// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mrldb', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

app.use(cors({
  origin: 'https://mrldev-5537abc1f826.herokuapp.com/' // replace with the URL of your frontend
}));

// Add these two lines
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
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

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});
