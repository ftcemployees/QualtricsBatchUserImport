const csv = require('fast-csv');
const fs = require('fs');
const axios = require('axios');

const parseCSV = (file, cb) => {
    const stream = fs.createReadStream(file);
    let users = [];
    csv.fromStream(stream, {headers: true}).on('data', data => { users.push(data)})
                                                .on('error', err => cb(err))
                                                .on('end', () => cb(null, users)) 

}



function main() {
    parseCSV(process.argv[2], (err, users)=> {
        if (err) console.log(err);
        else {
            
           axios.all(users.map(user => {
            const data = {
                firstName: user.firstname,
                    "username": user.username,
                    "password": user.password,
                    "lastName": user.lastname,
                    "email": user.email,
                    "userType": "UT_2c6FLGoehcbvqLz",
                    "language": 'en'
            }
            console.log(data)
            return axios({
                method: 'post',
                url: 'https://byui.az1.qualtrics.com/API/v3/users',
                headers: {"X-API-TOKEN": "dMGkYJQI5UI9OqKAJlJj4Aufe9BBpxedemWeQxXd"},
                data: data
            })
           }))
           .then(axios.spread( (stuff, stuff2)=> {
               console.log(stuff, stuff2);
           })).catch(err => false); 
        }
    })
}

main();
