const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next()
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post)
  res.status(201).json({
    message: 'Post added successfully'
  })
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {id: '1', title: 'first server-side post', content: 'this is coming from the server'},
    {id: '2', title: 'second server-side post', content: 'this is coming from the server!'}
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  })
});

module.exports = app;
