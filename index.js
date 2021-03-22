const fs = require("fs");
const nodeFetch = require("node-fetch");
const inquirer = require("inquirer");

const init = () => {
    inquirer.prompt([{
        type: "input",
        message: "Project Title",
        name: "Title"
    }, {
        type: "input",
        message: "GitHub UserName",
        name: "user"
    }, {
        type: "input",
        message: "Repo Name ",
        name: "RepoName"
    }, {
        type: "input",
        message: "Project Description",
        name: "desc",
        default: "info About Project Goes here "
    }, {
        type: "input",
        message: "What will application be used for ",
        name: "useCase"
    }, {
        type: "input",
        message: "Please Enter Your Email",
        name: "email"
    }, {
        type: "checkbox",
        message: "Choose your license",
        name: "license",
        default: "mit",
        choices: ["mit", "Apache 2.0", "gnu v3.0", "Public"]
    }, {
        type: "input",
        name: "team",
        message: "Who was on your team",
    }]).then(response => {
        console.log(response);
    })
}


init()