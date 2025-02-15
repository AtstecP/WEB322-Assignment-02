/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Viktor Makarov Student ID: 121659221 Date: 1/31/2025*
********************************************************************************/
require("dotenv").config()
const projectData = require("./modules/projects");
const express = require("express");
const app = express(); 
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080; 

app.use(express.static('public'));
console.log('Serving static files from:', path.join(__dirname, 'public'));
projectData.initialize();

app.get("/", (req, res) => {
  console.log('Serving static files from:', path.join(__dirname, 'public'));
  res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get("/solutions/projects", (req, res) => {
    const {sector} = req.query;
    if (sector){
      projectData
      .getProjectsBySector(sector)
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
    }else{
      projectData
      .getAllProjects()
      .then(data => res.send(data))
      .catch(err => res.status(500).send(err))
    } 
   
})

app.get("/solutions/projects/:projectId", (req, res) => {
  const { projectId } = req.params;
  projectData
    .getProjectById(projectId)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
});

app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}\n`+ `Serving static files from:`, path.join(__dirname, 'public')));
