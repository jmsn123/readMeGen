const fs = require("fs");
const inquirer = require("inquirer");
const fetch = require('node-fetch');


const post = async(user) => {
    try {
        const response = await fetch('https://api.github.com/users/${user.RepoName}')
        return response.data
    } catch (error) {
        console.log(error);
    }
}
const init = async() => {
    console.log(module.exports);
    try {
        const response = await inquirer.prompt([{
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
        }, {
            type: "input",
            name: "test",
            message: "Can we run tests"
        }])
        console.log("...Calling Github api ");
        // post(response).then(data => {
        //     console.log(data);
        // })
        const readme = await fs.writeFileSync('./dist/README.md', "new content")

    } catch (error) {
        console.log(error);
    }


}


init()