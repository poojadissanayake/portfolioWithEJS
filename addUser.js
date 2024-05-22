const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
let userDb = new sqlite3.Database('User');

let username = "admin";
let password = "pass123";

bcrypt.hash(password, 10, (err, hash) => {
    userDb.run('INSERT INTO User (name, password) VALUES (?, ?)', [username,hash]);
    if (err) {
        return console.log(err.message);
    }
    console.log('User successfully added.');
});
