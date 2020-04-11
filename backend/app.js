const express = require('express');
const app = express();


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
