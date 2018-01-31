const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
app.use((req,res,next) =>{
  var now = new Date().toString();
  var log =`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if(err){
      console.log("Unable to Create Log File");
    }
  });
  next();
});
hbs.registerPartials(__dirname + '/views/partials');
app.get('/maintenance',(req,res) =>{
  res.render('maintenance.hbs', {
    pageTitle: 'Maintenanace Page',
    welcomeMessage : 'Nope',
    currentYear: new Date().getFullYear()
  });

});
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    currentYear: new Date().getFullYear()
  });
});
app.get('/bad' , (req , res)=>{
res.send({
errorMessage : "Error"
});
});
app.listen(3000, () =>{
  console.log("Server is running at port 3000");
});
