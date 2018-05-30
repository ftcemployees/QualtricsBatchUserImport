const csv = require('fast-csv');
const fs = require('fs');
const axios = require('axios');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Extract data from the csv file and store it in an array of user objects
 */
const parseCSV = (file, cb) => {
    const stream = fs.createReadStream(file);
    let users = [];
    csv.fromStream(stream, {headers: true}).on('data', data => { users.push(data)})
                                                .on('error', err => cb(err))
                                                .on('end', () => cb(null, users)) 

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
function getParams() {
    return new Promise((resolve, reject) => {
        const params = {};
        rl.question("Please enter your Qualtrics API token: ", token => {
            rl.question("Please enter the path of the csv of users: ", path => {
                params.path = path.trim();
                params.token = token.trim();
                rl.close();
                resolve(params)
            });
        });
    })
}

function main() {
    getParams().then((params) => {
        console.log(params)
    })
    
    
    // Validation
    // const apiToken = process.argv[3];
    // if(!apiToken) {
    //     console.error("WARNING: No API Token was provided. Exiting");
    //     return;
    // }

    // const file = process.argv[2];
    // if(!file) {
    //     console.error("WARNING: No file path provided. Exiting");
    //     return;
    // }

    // parseCSV(process.argv[2], (err, users)=> {
    //     if (err) console.log(err);
    //     else {
    //         // process all requests async
    //        axios.all(users.map(buildQueries))
    //        // Could use some work....
    //        .then(axios.spread( (stuff, stuff2)=> {
    //            console.log(stuff, stuff2);
    //        })).catch(err => console.log(err)); 
    //     }
    // })
}

main();
