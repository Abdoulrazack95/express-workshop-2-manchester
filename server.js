const express = require('express'); //load the server.
const app = express();
const handlebars = require('express-handlebars');// load handlebars.
const blog = require('./data/blogPosts.json');

app.engine('handlebars', handlebars());//initialise handlebars
app.set('view engine', 'handlebars')//specify engine for page rendering.

app.use(express.static('public'));

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/views/index.html');
  res.render('index', {
    firstName: 'Abdoulrazack',
    lastName: 'Ahmed', 
    currentTime: new Date().toLocaleString(),
    currentYearCopyRight: new Date().getFullYear(),
    changeColor: 'style = "color: pink"',
    pageName: 'Home',
    blogPost: blog
  });
});

app.get('/my-cv', function(req, res){
  res.render('my-cv', {
    firstName: 'Abdoulrazack',
    lastName: 'Ahmed',
    pageName: 'My cv',
    currentTime: new Date().toLocaleString()
  });
});

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function(){
  console.log(`Server is listening on port 3000 ${SERVER_PORT}. Ready to accept requests!`);
})






