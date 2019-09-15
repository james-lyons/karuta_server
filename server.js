const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

// BodyParser
app.use(bodyParser.urlencoded({
    extended: false}));
    app.use(bodyParser.json());

// Custom Logger Middleware
app.use((req, res, next) => {
    const url = req.url;
    const method = req.method;
    const requestedAt = new Date().toLocaleDateString();
    console.table({ url, method, requestedAt });
    next();
});

// User Session
app.use(session({
    secret: 'Doges are the bestest pets!',
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://karuta-react.herokuapp.com/"); 
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const corsOptions = {
    origin: ["https://karuta-react.herokuapp.com/", "https://karuta-react.herokuapp.com"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    headers: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// SECTION Routes
// Get Root
app.get('/', (req, res) => {
    res.send('<h1>Karuta!</h1>')
});

// Auth Routes
app.use('/auth', routes.auth);

// User Routes
app.use('/user', routes.user);

// Deck Routes
app.use('/deck', routes.deck);

// Start Server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
