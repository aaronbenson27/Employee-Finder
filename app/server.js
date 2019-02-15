const express = require('express');

const app = express();

const path = require('path')

const apiRoutes = require('./routing/apiRoutes')(app)

const htmlRoutes = require('./routing/htmlRoutes')

const PORT = 8080;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

htmlRoutes.homeHTML(app);

htmlRoutes.surveyHTML(app)

app.listen(PORT, function(){
  console.log(`App is now listening on PORT ${PORT}`)
})