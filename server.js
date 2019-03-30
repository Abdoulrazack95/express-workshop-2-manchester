const express = require('express'); //load the server.
const app = express(); //initialise the function express, to be able to access inside this class.
const handlebars = require('express-handlebars');// load handlebars.
const blogHere = require('./data/blogPosts.json');
const bodyParser = require("body-parser");
// const fs = require('fs-promise');
// const formidable = require('express-formidable');
const fs = require("fs-extra");
const bodyParserMiddleware = bodyParser.urlencoded({ extended: true });


app.engine('handlebars', handlebars());//initialise handlebars
app.set('view engine', 'handlebars')//specify engine for page rendering.

app.use(express.static('public'));
// app.use(formidable());
app.use(bodyParserMiddleware);


app.get('/', function(req, res){
  fs.readFile('./data/blogPosts.json')
  .then(file => JSON.parse(file))
  .then((blogHere) => {res.render('index', {
    firstName: 'Abdoulrazack',
    lastName: 'Ahmed', 
    currentTime: new Date().toLocaleString(),
    currentYearCopyRight: new Date().getFullYear(),
    changeColor: 'style = "font-style: italic"',
    pageName: 'Home',
    titleWindow: 'Abdoulrazack-profile',
    blogHere: blogHere
  })})
  // res.sendFile(__dirname + '/views/index.html');
  
});

app.get('/my-cv', function(req, res){
  res.render('my-cv', {
    firstName: 'Abdoulrazack',
    lastName: 'Ahmed',
    pageName: 'My cv',
    currentTime: new Date().toLocaleString()
  });
});

app.get('/posts/:postId', function(req,res){
  const id = req.params.postId;
  res.render('posts', {
    namePost: 'Post',
    currentTime: new Date().toLocaleString(),
    namePagePost: 'Post' + " " + id,
    blogHere: blogHere[id],
    postId: id
  })
})

app.get('/compose-post', (req, res) => {
  res.render('compose-post',{
    firstName: 'Abdoulrazack',
    lastName: 'Ahmed', 
    currentTime: new Date().toLocaleString(),
    currentYearCopyRight: new Date().getFullYear(),
    changeColor: 'style = "font-style: italic"',
    pageName: 'Page for new post',
    titleWindow: 'Create new post',
  })
});

app.post("/compose-post", (req, res) => {
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    content: req.body.content
  }
    fs.readJson("./data/blogPosts.json")
    .then(blogPosts => blogPosts.concat(newPost))
    .then(updatedBlogPosts => fs.writeJson("./data/blogPosts.json", updatedBlogPosts))
    .then(() => res.redirect("/"))
});


app.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  fs.readJson('./data/blogPosts.json')
  .then(blogPosts => {
    blogPosts.splice(postId, 1);
    return blogPosts;
  })
  .then(updatedBlogPosts => fs.writeJson('./data/blogPosts.json', updatedBlogPosts))
  .then(()=> res.send(202));
});


//   fs.readJson("./data/blogPosts.json")
//     .then(blogPosts => blogPosts.concat(structurePost))
//     .then(updatedBlogPosts => fs.writeJson("./data/blogPosts.json", updatedBlogPosts))
//     .then(() => res.redirect("/"))
// });


// app.post("/compose-post", (req, res) =>{
//   const putData = req.fields;
//     const newPost = {
//       'title': putData.title,
//       'summary': putData.summary,
//       'content': putData.content
//     }

//     fs.readFile(__dirname + '/data/blogPosts.json')
//     .then(file => JSON.parse(file))
//     .then(array => [...array,newPost])
//     .then(newObj => fs.writeFile(__dirname + '/data/blogPosts.json', JSON.stringify(newObj)))
//     .then(()=> res.redirect('/'))
//     .then(err => res.send(err.toString()))
// })


// app.post("/post", (req, res) => {
//   const newPost = req.body;

//   fs.readJson("./data/blogPosts.json")
//     .then(blogPosts => blogPosts.concat(newPost))
//     .then(updatedBlogPosts => fs.writeJson("./data/blogPosts.json", updatedBlogPosts))
//     .then(() => res.redirect("/"))
// });

const SERVER_PORT = process.env.PORT || 3000;
app.listen(SERVER_PORT, function(){
  console.log(`Server is listening on port ${SERVER_PORT}. Ready to accept requests!`);
})

// fs-extra  writejson conca in the blog don't modifie but merge with the new one





