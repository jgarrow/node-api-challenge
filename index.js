/*
play this: https://www.youtube.com/watch?v=d-diB65scQU

Sing along:

here's a little code I wrote, please read the README word for word, don't worry, you got this
in every task there may be trouble, but if you worry you make it double, don't worry, you got this
ain't got no sense of what is REST? just concentrate on learning Express, don't worry, you got this
your file is getting way too big, bring a Router and make it thin, don't worry, be crafty
there is no data on that route, just write some code, you'll sort it out… don't worry, just hack it…
I need this code, but don't know where, perhaps should make some middleware, don't worry, just hack it

Go code!
*/

const express = require("express");
const logger = require("morgan");
// const cors = require("cors");
// const projects = "./data/lambda.db3";
const projects = require("./data/helpers/projectModel");

const server = express();
("");
const port = 5000;
const baseUrl = "/";

server.use(express.json());

const validateUserId = async (req, res, next) => {
    const { id } = req.params;
    console.log("id in validateUserId: ", id);

    const projectsArray = await projects.get();
    console.log("projectsArray: ", projectsArray);
    const projectIndex = projectsArray.findIndex(project => project.id === id);
    console.log("projectIndex: ", projectIndex);

    if (projectIndex > -1) {
        req.user = projectsArray[projectIndex];
        next();
    } else {
        res.status(400).json({ errorMessage: "Invalid user id" });
    }
};

server.get("/", (req, res) => {
    projects
        .get()
        .then(resp => {
            res.status(200).send(resp);
        })
        .catch(err =>
            res
                .status(500)
                .json({ errorMessage: "Error retrieving projects from server" })
        );
});

server.get("/:id", (req, res) => {
    const { id } = req.params;

    projects
        .get(id)
        .then(resp => res.status(200).send(resp))
        .catch(err =>
            res.status(500).json({
                errorMessage: `Error retrieving projects for id ${id} from server`
            })
        );
});

server.post("/", (req, res) => {
    const project = req.body;

    if (!project || Object.keys(project).length === 0) {
        res.status(400).json({ errorMessage: "Missing project data" });
    } else if (!project.name || !project.description) {
        res.status(400).json({
            errorMessage: "Please include a name and description"
        });
    } else {
        projects
            .insert(project)
            .then(resp => res.status(200).send(resp))
            .catch(err =>
                res
                    .status(500)
                    .json({ errorMessage: "Error posting new project" })
            );
    }
});

server.put("/:id", (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;

    projects
        .update(id, updatedProject)
        .then(response => {
            response
                ? res
                      .status(200)
                      .json(`Successfully updated project with id ${id}`)
                : res.status(404).json({
                      errorMessage: `Project with id ${id} does not exist`
                  });
        })
        .catch(err =>
            res
                .status(500)
                .json({ errorMessage: `Error updating project with id ${id}` })
        );
});

server.delete("/:id", (req, res) => {
    const { id } = req.params;

    projects
        .remove(id)
        .then(resp => {
            resp > 0
                ? res
                      .status(200)
                      .json({
                          message: `Project ${id} was successfully deleted`
                      })
                : res
                      .status(400)
                      .json({
                          errorMessage: `No project with id ${id} was found`
                      });
        })
        .catch(err =>
            res
                .status(500)
                .json({ errorMessage: `Error deleting project ${id}` })
        );
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
