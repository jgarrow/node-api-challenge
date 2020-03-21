const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

const validateProjectId = async (req, res, next) => {
    const { id } = req.params;
    console.log("id in validateProjectId: ", id);

    const projectsArray = await projects.get();
    console.log("projectsArray: ", projectsArray);
    const projectIndex = projectsArray.findIndex(
        project => parseInt(project.id) === parseInt(id)
    );
    console.log("projectIndex: ", projectIndex);

    if (projectIndex > -1) {
        req.project = projectsArray[projectIndex];
        next();
    } else {
        res.status(400).json({ errorMessage: "Invalid user id" });
    }
};

const validateActionId = async (req, res, next) => {
    const { action_id } = req.params;

    const actionsArray = await actions.get();
    const actionIndex = actionsArray.findIndex(
        action => parseInt(action.id) === parseInt(action_id)
    );
    console.log("action_id: ", action_id);
    console.log("actionsArray: ", actionsArray);
    console.log("actionIndex: ", actionIndex);

    if (actionIndex > -1) {
        req.action = actionsArray[actionIndex];
        next();
    } else {
        res.status(400).json({ errorMessage: "Invalid action id" });
    }
};

module.exports = { validateProjectId, validateActionId };
