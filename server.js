const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const Clarifai = require("clarifai");
const pgp = require('pg-promise')();

const bcrypt = require('bcrypt');
const saltRounds = 10;

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const appClarifai = new Clarifai.App({
 apiKey: API_KEY
});

app.use(bodyParser.json());
app.use(cors());

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'braindb',
    user: '',
    password: ''
};

const db = pgp(connection);

// db.any('SELECT * FROM user_brain', '')
//   .then(data => {
//     console.log('DATA:', data)
//   })
//   .catch(error => {
//     console.log('ERROR:', error)
//   })

app.get('/', (req, res) => {res.send('it is working!')});

// Sign In --> user POST
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt, saltRounds)});

// Register --> User POST
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)});

// UPDATE the counter of images
app.put('/image', (req, res) => {image.handleImageCount(req, res, db)});

// GET Clarifai request
app.post('/imageurl', (req, res)=> {image.handleImageApi(req, res, appClarifai)});

// Users profile --> user GET
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})


// app.get('/', (req, res)=>{
//   res.json('Hello');
// })


app.listen(3000, ()=>{
  console.log('app is running port 3000...');
})

// app.set('view engine', 'ejs');

// app.get('/', (req, res)=>{
//   let nameUser = {
//     name: 'Fer',
//     lastName: 'Lujan'
//   };
//
//   res.render('index', {
//     nameUser: nameUser,
//   });
// })
