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

const {
    validateProjectId,
    validateActionId
} = require("./middleware/validateProjectId");
// const validateActionId = require("./middleware/validateProjectId")
const express = require("express");
const logger = require("morgan");
// const cors = require("cors");
const projects = require("./data/helpers/projectModel");
// const actionRoutes = require("./routes/actionRoutes");
const actions = require("./data/helpers/actionModel");

const server = express();
("");
const port = 5000;
const baseUrl = "/";

server.use(express.json());
// server.use(`${baseUrl}/actions`, actionRoutes);

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

server.get("/:id", validateProjectId, (req, res) => {
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

server.put("/:id", validateProjectId, (req, res) => {
    const { id } = req.params;
    const updatedProject = req.body;

    projects
        .update(id, updatedProject)
        .then(response => {
            response
                ? res.status(200).send(response)
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

server.delete("/:id", validateProjectId, (req, res) => {
    const { id } = req.params;

    projects
        .remove(id)
        .then(resp => {
            resp > 0
                ? res.status(200).json({
                      message: `Project ${id} was successfully deleted`
                  })
                : res.status(400).json({
                      errorMessage: `No project with id ${id} was found`
                  });
        })
        .catch(err =>
            res
                .status(500)
                .json({ errorMessage: `Error deleting project ${id}` })
        );
});

server.get("/:id/actions", validateProjectId, (req, res) => {
    actions
        .get()
        .then(resp => res.status(200).send(resp))
        .catch(err =>
            res.status(500).json({ errorMessage: "Error retrieving actions" })
        );
});

server.get(
    "/:id/actions/:action_id",
    validateProjectId,
    validateActionId,
    (req, res) => {
        const { action_id } = req.params;

        actions
            .get(action_id)
            .then(resp => res.status(200).send(resp))
            .catch(err =>
                res
                    .status(500)
                    .json({
                        errorMessage: `Error retrieving action ${action_id}`
                    })
            );
    }
);

server.post("/:id/actions", validateProjectId, (req, res) => {
    const { id } = req.params;
    const projectAction = { ...req.body, project_id: id };

    if (!projectAction || Object.keys(projectAction).length === 0) {
        res.status(400).json({ errorMessage: `Missing action data` });
    } else if (!projectAction.description || !projectAction.notes) {
        res.status(400).json({
            errorMessage: `Please include a description and notes`
        });
    } else if (projectAction.description.length > 128) {
        res.status(400).json({
            errorMessage: `Action description must be 128 characters or less`
        });
    } else {
        actions
            .insert(projectAction)
            .then(resp => res.status(200).send(resp))
            .catch(err =>
                res.status(500).json({
                    errorMessage: `Error creating new action for project ${id}`
                })
            );
    }
});

server.put(
    "/:id/actions/:action_id",
    validateProjectId,
    validateActionId,
    (req, res) => {
        const { id, action_id } = req.params;

        const updatedAction = req.body;

        if (
            updatedAction.description &&
            updatedAction.description.length > 128
        ) {
            res.status(400).json({
                errorMessage: "Description must be 128 characters or less"
            });
        } else {
            actions
                .update(action_id, updatedAction)
                .then(response => {
                    response
                        ? res.status(200).send(response)
                        : res.status(404).json({
                              errorMessage: `Action with id ${action_id} does not exist`
                          });
                })
                .catch(err =>
                    res.status(500).json({
                        errorMessage: `Error updating action ${action_id}`
                    })
                );
        }
    }
);

server.delete(
    "/:id/actions/:action_id",
    validateProjectId,
    validateActionId,
    (req, res) => {
        const { action_id } = req.params;

        actions
            .remove(action_id)
            .then(resp => {
                resp > 0
                    ? res.status(200).json({
                          message: `Action ${action_id} was successfully delete`
                      })
                    : res.status(400).json({
                          errorMessage: `No action with id ${action_id} was found`
                      });
            })
            .catch(err =>
                res
                    .status(500)
                    .json({
                        errorMessage: `Error deleting action ${action_id}`
                    })
            );
    }
);

server.listen(port, () => console.log(`Server listening on port ${port}`));
