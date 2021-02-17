module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User query
    router.get("/", user.AddLocation);

    app.use('/api/user', router);
};