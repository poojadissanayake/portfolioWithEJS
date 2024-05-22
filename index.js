const express = require('express');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const path = require('path');
const { title } = require('process');

// Import sqlite3 library
let sqlite3 = require('sqlite3').verbose();
let feedbackDb = new sqlite3.Database('Feedback');
let messageDb = new sqlite3.Database('Messages');
let userDb = new sqlite3.Database('User');

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public_html'))

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Route to serve the static index.html file
app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/login', (req, res, next) => {
    res.render('login', { errorLog: '' });
});

// Handle login submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    userDb.get('SELECT * FROM User WHERE name = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).send('Database error');
        }

        if (!user) {
            res.render('login', { errorLog: 'User not found' });
        }
        else {
            // Compare hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return res.status(500).send('Error checking password');
                }
                if (!isMatch) {
                    res.render('login', { errorLog: 'Password incorrect' });
                }
                res.redirect('/message');
            });
        }

    });
});

app.post('/message', (req, res, next) => {
    let name = req.body.name;
    let email = req.body.email;
    let msg = req.body.message;
    console.log(req.body.name);

    // Insert the message into the Messages table
    messageDb.run(`INSERT INTO Messages (name, email, message) VALUES (?, ?, ?)`, [name, email, msg]);
    res.status(200).redirect('/');
});

app.get('/message', (req, res) => {
    // SELECT * FROM Feedback ORDER BY Id DESC LIMIT 1', (err, row) => {
    messageDb.all('SELECT * FROM Messages', (err, row) => {
        console.log(row);
        if (err) {
            return next(err);
        }
        res.render('messages', {
            title: "Queries: ",
            responses: row,
            notfound: ''
        });
    });

});

app.post('/search', (req, res, next) => {
    const searchTerm = req.body.searchBar;
    if (!searchTerm) {
        return res.status(400).send('Search term is required');
    }

    // parameterized query to avoid SQL injection for best practices
    messageDb.all('SELECT * FROM Messages WHERE name LIKE ?', [`%${searchTerm}%`], (err, rows) => {
        if (err) {
            return next(err);
        }
        if (rows.length == 0) {
            res.render('messages', {
                title: 'Search Results for: ' + searchTerm,
                responses: [],
                notfound: 'No results found 🙁'
            });
        }
        else {
            res.render('messages', {
                title: 'Search Results for: ' + searchTerm,
                responses: rows,
                notfound: ''
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
