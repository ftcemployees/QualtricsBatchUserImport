const csv = require('fast-csv');
const fs = require('fs');
const axios = require('axios');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const Confirm = require('prompt-confirm');


/**
 * Extract data from the csv file and store it in an array of user objects
 */
const parseCSV = (file, cb) => {
    try {
    const stream = fs.createReadStream(file);
    let users = [];
    csv.fromStream(stream, {headers: true}).on('data', data => { users.push(data)})
                                                .on('error', err => cb(err))
                                                .on('end', () => cb(null, users)) 
    } catch (e) {
        console.error("Could not open file. Please check your path and try again");
        process.exit(1);
    }
}

/**
 * Builds a query function
 */
const buildQueries = user => {
    user => {
        const data = {
            "firstName": user.firstname,
            "username": user.username,
            "password": user.password,
            "lastName": user.lastname,
            "email": user.email,
            "userType": user.usertype,
            "language": 'en'
        }
        console.log(data)
        return axios({
            method: 'post',
            url: 'https://byui.az1.qualtrics.com/API/v3/users',
            headers: {"X-API-TOKEN": apiToken},
            data: data
        })
       }
}

/**
 * Requests an API token and CSV file from the user
 */
function getParams() {
    return new Promise((resolve, reject) => {
        const params = {};
        rl.question("Please enter your Qualtrics API token: ", token => {
            rl.question("Please enter the path of the csv of users: ", path => {
                params.path = path.trim().replace(/ /g, '');
                params.token = token.trim().replace(/ /g, '');
                rl.close();
                resolve(params)
            });
        });
    })
}

/**
 * Uploads a set of users to Qualtrics 
 */
function uploadUsers(err, users) {
    if (err) console.log(`Unable to read file. Please check your file path and try again`);
    else {
         axios.all(users.map(buildQueries))
           // Could use some work....
        .then(axios.spread( (stuff, stuff2)=> {
            console.log(stuff, stuff2);
        })).catch(err => console.log(err)); 
    }
}

/**
 * Prompts for params, confirms, and uploads to Qualtrics
 */
function main() {
    getParams().then((params) => {
        const prompt = new Confirm(`Please confirm:\n\tYour Qualtrics API token is: "${params.token}"\n\tYour csv file is: "${params.path}"`);
        prompt.run().then((answer) => {
          if(!answer) {
            process.exit(1); 
          }
          parseCSV(params.path, uploadUsers);
        });
    });
}

main();
