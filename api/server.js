const express = require('express')
const cors = require('cors');
const server = express();


server.use(express.json());

server.use(cors());

const projectRouter = require('../projects/projectRouter.js');

const actionRouter = require('../actions/actionRouter.js')

server.get('/', logger, (req, res) => {
  res.send('<h1>API running</h1>')
})

server.use('/api/projects', logger, projectRouter)

server.use('/api/actions', logger, actionRouter)

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} with body ${req.body} at ${new Date().toISOString()}`);
  next();
}

module.exports = server;