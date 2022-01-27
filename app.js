//remmeber to npm install these
const express = require('express');
const { use } = require('express/lib/application');
const { render } = require('express/lib/response');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes')

//express app
const app = express();

//connects to mongoDB
const dbURI = 'mongodb+srv://brandon:signode2021@servertest.v3fds.mongodb.net/serverTest?retryWrites=true&w=majority'
//for above make sure to put in ur password and corresponding name of the database u wanna connect to
//in this case signode 2021 = pass and serverTest is database name
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
//usenewurlparser and unified are just to prevent warnings of deprecations
//.then((result) => app.listen(5000))//site only listens to requests once database is fully loaded
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs')
//knows to use ejs view engine on any .ejs files and converts the ejs logic to html

//listen for requests
app.listen(5000);
console.log("site is running")

//middleware and static files (gaining access to files in certain folders)
//just search up middleware like morgan then require it at top
app.use(express.static('public'));//our folder is called public
//I then referenced/linked the styles.css file in the footer.ejs

app.use(express.urlencoded({extended: true}));

app.use((req,res,next) => {
    console.log('path: ', req.path);
    next();//next() tells the code to move past the app.use function (onto rest of code)
});

app.get('/', (req,res) => {
    res.redirect('/orders');
})

app.get('/about', (req,res) => {
    //res.sendFile('./views/about.html', {root:__dirname})
    res.render('about');
})

app.use('/orders',orderRoutes)//all urls within the orderRoutes.js will start with /orders

app.get('/create', (req,res) => {
    //res.sendFile('./views/about.html', {root:__dirname})
    res.render('create');
})

//404 page
//code goes from top to bottom, if no other app.get finds matching url then this is used
app.use((req,res) => {
    //res.status(404).sendFile('./views/404.html', {root:__dirname})
    res.status(404).render('404');
})