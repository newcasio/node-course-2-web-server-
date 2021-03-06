var express= require('express');
var hbs = require('hbs');
var fs = require('fs');

var port = process.env.PORT||3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req,res,next) =>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err)=>{
    if (err){
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance page'
//   });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase()
});

app.get('/', (req, res)=>{
  res.render('home.hbs',{
    pageTitle: 'Welcome page',
    welcomeText: 'Screen, battery, mouse, computer, typing, grey black everspace window car noise brick yawn'
  })
});

app.get('/about', (req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req,res)=>{
  res.render('projects.hbs',{
    pageTitle: 'Portfolio'
  });
});

// app.listen(3000, () => {
//   console.log('Server has started on port 3000.')
// });
app.listen (port, ()=>{
  console.log(`Server is up on port ${port}`);
});
