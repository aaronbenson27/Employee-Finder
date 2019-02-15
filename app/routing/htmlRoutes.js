const path = require('path');
const homeHTML = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    })
}

const surveyHTML = function (app) {
    app.get('/survey', function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"))
    })
}

module.exports = {
    homeHTML,
    surveyHTML
};