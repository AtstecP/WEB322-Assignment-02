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

projectData.initialize();
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '/views/home.html'));});

app.get("/solutions/projects", (req, res) => {
  projectData
    .getAllProjects()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err));
});

app.get("/solutions/projects/id-demo", (req, res) => {
    let idDemo = 25
    projectData
    .getProjectById(idDemo)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})


app.get("/solutions/projects/sector-demo", (req, res) => {
    let sectorDemo = 'Agriculture'
    projectData
    .getProjectsBySector(sectorDemo)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})


app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));
