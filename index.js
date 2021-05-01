const fs = require("fs");
const inquirer = require("inquirer");
const fetch = require("node-fetch");
const genMarkUp = require("./genMarkup");
var ui = new inquirer.ui.BottomBar();

ui.updateBottomBar("Fill out the info");

const post = async(user) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};
const init = async() => {
    try {
        const response = await inquirer.prompt([{
                type: "input",
                message: "Project Title",
                name: "title",
            },
            {
                type: "input",
                message: "GitHub UserName",
                name: "user",
            },
            {
                type: "input",
                message: "Repo Name ",
                name: "repoName",
            },
            {
                type: "input",
                message: "Project Description",
                name: "desc",
                default: "info About Project Goes here ",
            },
            {
                type: "input",
                message: "What will application be used for ",
                name: "useCase",
            },
            {
                type: "input",
                message: "Please Enter Your Email",
                name: "email",
            },
            {
                type: "checkbox",
                message: "Choose your license",
                name: "license",
                default: "mit",
                choices: ["mit", "Apache 2.0", "gnu v3.0", "Public"],
            },
            {
                type: "input",
                name: "Contributing",
                message: "Who was on your team",
            },
            {
                type: "list",
                name: "test",
                choices: ["yes", "no"],
                message: "Can we run tests",
            },
        ]);
        console.log("...Calling Github api ");
        const gitInfo = await post(response.user)
            .then((data) => data.json())
            .catch((err) => console.log(err));
        console.log("hello world", gitInfo);
        const readme = await fs.writeFileSync(
            "./README.md",
            genMarkUp(response, gitInfo)
        );
    } catch (error) {
        console.log(error);
    }
};

init();