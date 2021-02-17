const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller = require("./controllers/user.controller");
const utils = require('./controllers/utils');

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/:userID/:lat/:lon", (req, res) => {
    controller.AddLocation(req, res);
});

// simple route
app.get("/:userID/:address", (req, res) => {
    // convert address to lat lon
    var data = utils.convertAddressToLatLon(req.params.address);
    req.params.lat = data.lat;
    req.params.lon = data.lon;

    controller.AddLocation(req, res);
});


require("./routes/user.route")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});