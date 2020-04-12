require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post')

const app = express();


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@${process.env.MONGO_CLUSTER}.mongodb.net/node-angular?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed")
  })

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
  console.log("on create", post)
  post.save();
  res.status(201).json({
    message: 'Post added successfully'
  })
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: documents
      })
    })
    .catch((error) => console.log(error))
});

app.delete("/api/posts/:id", (req, res, next) => {
  console.log("onDelete", req.params)
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post deleted"})
    })
    .catch(error => console.log(error))
});

module.exports = app;
