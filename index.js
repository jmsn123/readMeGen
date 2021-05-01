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
                type: "list",
                name: "license",
                message: "Choose your license for your project.",
                // https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/licensing-a-repository
                choices: [
                    "afl-3.0",
                    "apache-2.0",
                    "artistic-2.0",
                    "bsl-1.0",
                    "bsd-2-clause",
                    "bsd-3-clause",
                    "bsd-3-clause-clear",
                    "cc",
                    "cc0-1.0",
                    "cc-by-4.0",
                    "cc-by-sa-4.0",
                    "wtfpl",
                    "ecl-2.0",
                    "epl-1.0",
                    "epl-2.0",
                    "eupl-1.1",
                    "agpl-3.0",
                    "gpl",
                    "gpl-2.0",
                    "gpl-3.0",
                    "lgpl",
                    "lgpl-2.1",
                    "lgpl-3.0",
                    "isc",
                    "lppl-1.3c",
                    "ms-pl",
                    "mit",
                    "mpl-2.0",
                    "osl-3.0",
                    "postgresql",
                    "ofl-1.1",
                    "ncsa",
                    "unlicense",
                    "zlib",
                ],
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