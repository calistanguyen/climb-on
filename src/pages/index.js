import React from 'react';
import 'express';

const express = require('express')
const app = express()
const user_model = require('../../user_model')
const port = 8000

app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  user_model.getUsers()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const Home = () => {
  function getUsers() {
    fetch('http://localhost:8000')
      .then(response => {
        return response.text();
      })
  }
  return (

    < div > {getUsers()}</div >
  );
}

export default Home; 