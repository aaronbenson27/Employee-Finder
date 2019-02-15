const express = require('express');

const app = express();

const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

require('./routing/apiRoutes')(app)

require('./routing/htmlRoutes')(app)

const PORT = 8080;

app.listen(PORT, function(){
  console.log(`App is now listening on PORT ${PORT}`)
})