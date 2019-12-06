const express = require('express');
const projects = require("../data/helpers/projectModel.js");
const actions = require('../data/helpers/actionModel.js');

const router = express.Router()

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action)
})

router.get("/", (req, res) => {
  actions.get()
    .then(actionList => res.status(200).json(actionList))
    .catch(err => res.status(500).json({errMsg: 'error getting actions'}))
})

router.delete("/:id", validateActionId, (req, res) => {
  actions.remove(req.action.id)
    .then(action => res.status(200).json(req.action))
    .catch(err => res.status(500).json({errMsg: 'error deleting action'}))
})

router.post("/user/:userId", validateAction, validateProjectId, (req, res) => {
  actions.insert(req.body)
    .then(action => res.status(201).json(action))
    .catch(err => res.status(500).json({errMsg: 'error adding action'}))
})

router.put("/:id", validateActionId, validateAction, (req, res) => {
  actions.update(req.action.id, {...req.body, project_id: req.action.project_id})
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({errMsg: 'error updating action'}))
})

function validateActionId(req, res, next) {
  actions.get(req.params.id)
    .then(action => {
      if (action) {
        req.action = action
        next()
      } else {
        res.status(404).json({errMsg: 'action not found'})
      }
    })
    .catch(err => res.status(500).json({errMsg: 'error validating action'}))
}

function validateProjectId(req, res, next) {
  projects.get(req.params.userId)
    .then(project => {
      if (project) {
        req.body.project_id = project.id
        next()
      } else {
        res.status(404).json({errMsg: 'project not found'})
      }
    })
    .catch(err => res.status(500).json({errMsg: 'error validating project id'}))
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({errMsg: 'missing action info'})
  } 
  if (!req.body.description) {
    res.status(400).json({errMsg: `description field is required`})
  } 

  if (req.body.description.length > 128) {
    res.status(400).json({errMsg: `description must be no more than 128 characters`})
  }
  
  if (!req.body.notes) {
    res.status(400).json({errMsg: `notes field is required`})
  }

  next();
}

module.exports = router;