const user = require("../models/user.model");

// Create and Save a new user's location
// Check if the location is on water
// Calc distance to last query
// Get percentage of on land quaries
// Save the new query
exports.AddLocation = (req, res) => {
    // Validate request
    if (!req.params.userID || !req.params.lat || !req.params.lon) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    var data = {
        onLand: true,
        distanceFromLastQuery: 0,
        onLandQueriesPercent: 0
    }

    // Check if location is on water
    user.isOnLand(req.params.lat, req.params.lon).then((isOnLand) => {
        data.onLand = isOnLand;
    });

    // Calc distance from last query    
    data.distanceFromLastQuery = user.getDistanceFromLastQuery(req.params.userID, req.params.lat, req.params.lon);

    // Save user query
    user.saveQuery(req.params.userID, req.params.lat, req.params.lon, data.onLand);

    // Calc on land percentage
    data.onLandQueriesPercent = user.getOnLandQueriesPercent(req.params.userID);

    // Set success
    res.status(200).send(data);

};