const genMarkUp = (info, git) => {
    let badge;
    if (info.license) {
        badge = `[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)  
    `;
    } else {
        badge = "no titlef";
    }

    return `
##    ${info.title} 👋 ![badge](https://img.shields.io/badge/license-${
    info.license
  }-brightgreen)<br />
## Description
        🔍 ${info.desc}

## Installation
        clone from git clone then run npm i && npm start 
## Usage
        💻 ${info.usage}
## License ${badge}
      
## About Me
        👪 ${git.blog}
## Tests
        ✏️ ${info.test}
## Can we Test? ✋ ${info.test === "yes" ? true : false}<br />

`;
};

module.exports = genMarkUp;