let sqlite3 = require('sqlite3').verbose();
let feedbackDb = new sqlite3.Database('Feedback');
let messageDb = new sqlite3.Database('Messages');
let userDb = new sqlite3.Database('User');

feedbackDb.serialize(function () {
    feedbackDb.run("CREATE TABLE IF NOT EXISTS Feedback (Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, rating INT, feedback TEXT)")
});

messageDb.serialize(function () {
    messageDb.run("CREATE TABLE IF NOT EXISTS Messages (Id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)")
});

userDb.serialize(function () {
    userDb.run("CREATE TABLE IF NOT EXISTS User (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE, password TEXT)")
});

feedbackDb.close();
messageDb.close();
userDb.close();