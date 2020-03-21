# Sprint Challenge: Express and Node.js - Projects & Actions

## Description

In this challenge, you design and create a web API to manage the following resources: `Projects` and `Actions`.

## Instructions

**Read these instructions carefully**. Understand exactly what is expected **_before_** starting to code.

This is an individual assessment, please work on it alone. It is an opportunity to demonstrate proficiency of the concepts and objectives introduced and practiced in preceding days.

If the instructions are not clear, please seek support from your TL and Instructor on Slack.

The Minimum Viable Product must be completed in three hours.

Follow these steps to set up and work on your project:

-   [ ] Create a forked copy of this project.
-   [ ] Add your _Team Lead_ as collaborator on Github.
-   [ ] Clone your forked version of the Repository.
-   [ ] Create a new Branch on the clone: git checkout -b `firstName-lastName`.
-   [ ] Implement the project on this Branch, committing changes regularly.
-   [ ] Push commits: git push origin `firstName-lastName`.

Follow these steps for completing your project.

-   [ ] Submit a Pull-Request to merge `firstName-lastName` Branch into master on **your fork, don't make Pull Requests against Lambda's repository**.
-   [ ] Please don't merge your own pull request.
-   [ ] Add your _Team Lead_ as a Reviewer on the Pull-request
-   [ ] Your _Team Lead_ will count the challenge as done by merging the branch into _master_.

## Commits

Commit your code regularly and use descriptive messages. This helps both you (in case you ever need to return to old code) and your Team Lead.

## Self-Study/Essay Questions

Demonstrate your understanding of this Sprint's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your Team Lead.

-   [ ] Mention two parts of Express that you learned about this week.

    Express is an awesome Node framework that lets us set up a REST api very simply. It also lets us implement both third-party and custom middleware so that we can perfectly tailor our express server to fit our needs.

-   [ ] Describe Middleware?

    Middleware is an array of functions that are invoked and executed in the order they are written in our code. They allow us to abstract out our CRUD methods to make our code more DRY by allowing us to write functions that can check for certain things before continuing on in the code inside of the CRUD method. Middleware allows us an easy way to add modules to our codebase.

-   [ ] Describe a Resource?

    A resource is anything that can be requested or used from an API, like the data from the database we want to communicate with.

-   [ ] What can the API return to help clients know if a request was successful?

    An API can return an HTTP status code. Status codes are numbers that tell the user what kind of status the request they made came back with. For example, a status of 404 means that the resource requested was not found. An API can also send back a message if the server was set up to send back messages in addition to the status.

-   [ ] How can we partition our application into sub-applications?

    We can use an express Router to break apart the application into smaller, more readable parts. This way, we don't have to put all of our CRUD methods for the entire application into the same file. We can simply create a new route and use it in our main server file.

## Minimum Viable Product

-   [ ] Configure an _npm script_ named _"server"_ that will execute your code using _nodemon_. Make _nodemon_ be a development time dependency only, it shouldn't be deployed to production.
-   [ ] Configure an _npm script_ named _"start"_ that will execute your code using _node_.

Design and build the necessary endpoints to:

-   [ ] Perform CRUD operations on _projects_ and _actions_. When adding an action, make sure the `project_id` provided belongs to an existing `project`. If you try to add an action with an `id` of 3 and there is no project with that `id` the database will return an error.
-   [ ] Retrieve the list of actions for a project.

Please read the following sections before implementing the Minimum Viable Product, they describe how the database is structured and the files and methods available for interacting with the data.

### Database Schemas

The description of the structure and extra information about each _resource_ stored in the included database (`./data/lambda.db3`) is listed below.

#### Projects

| Field       | Data Type | Metadata                                                                    |
| ----------- | --------- | --------------------------------------------------------------------------- |
| id          | number    | no need to provide it when creating projects, the database will generate it |
| name        | string    | required.                                                                   |
| description | string    | required.                                                                   |
| completed   | boolean   | used to indicate if the project has been completed, not required            |

#### Actions

| Field       | Data Type | Metadata                                                                                         |
| ----------- | --------- | ------------------------------------------------------------------------------------------------ |
| id          | number    | no need to provide it when creating posts, the database will automatically generate it.          |
| project_id  | number    | required, must be the id of an existing project.                                                 |
| description | string    | up to 128 characters long, required.                                                             |
| notes       | string    | no size limit, required. Used to record additional notes or requirements to complete the action. |
| completed   | boolean   | used to indicate if the action has been completed, not required                                  |

### Database Persistence Helpers

The `/data/helpers` folder includes files you can use to manage the persistence of _project_ and _action_ data. These files are `projectModel.js` and `actionModel.js`. Both files publish the following api, which you can use to store, modify and retrieve each resource:

**All these helper methods return a promise. Remember to use .then().catch() or async/await.**

-   `get()`: resolves to an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.
-   `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.
-   `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
-   `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_.

We have provided test data for all the resources.

## Stretch Goal

-   Use `create-react-app` to create an application in a separate folder (outside the API project folder). Name it anything you want.
-   From the React application show a list of all _projects_ using the API you built.
-   Add functionality to show the details of a project, including its actions, when clicking a project name in the list. Use React Router to navigate to a separate route to show the project details.
-   Add styling!
