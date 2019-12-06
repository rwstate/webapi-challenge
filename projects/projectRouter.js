const express = require('express');
const projects = require("../data/helpers/projectModel.js");
const actions = require('../data/helpers/actionModel.js');

const router = express.Router()

router.post("/", validateProject, (req, res) => {
  projects.insert(req.body)
    .then(project => res.status(201).json(project))
    .catch(err => res.status(500).json({errMsg: 'error adding project'}))
})

router.get("/", (req, res) => {
  projects.get()
    .then(projectList => res.status(200).json(projectList))
    .catch(err => res.status(500).json({errMsg: 'error getting projects'}))
})

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project)
})

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  projects.update(req.project.id, req.body)
  .then(project => res.status(200).json(project))
  .catch(err => res.status(500).json({errMsg: 'error updating project'}))
})

router.delete("/:id", validateProjectId, (req, res) => {
  projects.remove(req.project.id)
    .then(project => res.status(200).json(req.project))
    .catch(err => res.status(500).json({errMsg: 'error deleting project'}))
})

router.get("/:id/actions", validateProjectId, (req, res) => {
  projects.getProjectActions(req.project.id)
    .then(actions => res.status(200).json(actions))
    .catch(err => res.status(500).json({errMsg: 'error getting project actions'}))
})

function validateProjectId(req, res, next) {
  projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project
        next()
      } else {
        res.status(404).json({errMsg: 'project not found'})
      }
    })
    .catch(err => res.status(500).json({errMsg: 'error validating project id'}))
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({errMsg: 'missing project info'})
  } 
  if (!req.body.name) {
    res.status(400).json({errMsg: `name field is required`})
  } 
  
  if (!req.body.description) {
    res.status(400).json({errMsg: `description field is required`})
  }

  next();
}



module.exports = router;