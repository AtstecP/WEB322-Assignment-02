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
require("dotenv").config();
const projectData = require("./modules/projects");
const developerData = require("./data/developerData");

const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

app.use(express.static("public"));

projectData
  .initialize()
  .then(() => {
    app.get("/", (req, res) => {
      projectData
        .getAllProjects()
        .then((data) => res.render("home", { 
          projects: data.slice(0, 3),
          route: "/"
        }))
        .catch((err) => res.status(500).send(err));
    });

    app.get("/about", (req, res) => {
      res.render("about", { 
        developer: developerData,
        route: "/about"
       });
    });

 
    app.get("/solutions/projects", (req, res) => {
      const { sector } = req.query;
      if (sector) {
        projectData
          .getProjectsBySector(sector)
          .then((data) => res.render("projects", {
            projects: data,
            route: "/solutions/projects"
          }))
          .catch((err) => res.status(404).render("404", {
            error: `No projects found for sector: ${sector}`,
            route: "/solutions/projects"
          }));
      } else {
        projectData
          .getAllProjects()
          .then((data) => res.render("projects", {
            projects: data,
            route: "/solutions/projects"
          }))
          .catch((err) => res.status(500).send(err));
      }
    });


    app.get("/solutions/projects/:projectId", (req, res) => {
      const { projectId } = req.params;
      projectData
        .getProjectById(projectId)
        .then((data) => res.render("project", {
          project: data,
          route: "/solutions/projects"
        }))
        .catch((err) => res.status(404).render("404", {
          error: "Unable to find requested project.",
          route: "/solutions/projects"
        }));
    });

    app.use((req, res, next) => {
      res.status(404).render("404", {
        error: "I'm sorry, we're unable to find what you're looking for.",
        route: "/solutions/projects"
      });
    });

    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on port ${HTTP_PORT}`);
      console.log(`Serving static files from:`, path.join(__dirname, "public"));
    });
  })
  .catch((err) => {
    console.error("Failed to initialize project data:", err);
    process.exit(1);
  });
