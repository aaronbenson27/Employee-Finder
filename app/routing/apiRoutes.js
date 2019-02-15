const lists = require('../data/employees')

module.exports = function (app) {
    app.get(`/api/employees`, function (req, res) {
        res.json(lists.employeeList);
    }),
        app.post(`/api/employees`, function (req, res) {
            lists.employeeList.push(req.body)
            res.end();
        })
}

