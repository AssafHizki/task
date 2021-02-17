const https = require("https");
const DB = require('../config/db');

//Access token for is on water API
var token = "UGxscahFnzm3pgpQznqx";

module.exports = {
    isOnLand: async function(lat, lon) {
        var options = "https://api.onwater.io/api/v1/results/";
        options += lat + ",";
        options += lon + "?access_token=" + token;

        await https.get(options, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);

                return body["water"] == false;
            });
        });
    },

    getDistanceFromLastQuery: function(id, lat, lon) {
        var lastQuery = getUserLastQuery(id);

        if (!lastQuery) {
            return 0;
        }

        return calcDistance(lat, lon, lastQuery["lat"], lastQuery["lon"]);
    },

    saveQuery: function(userID, lat, lon, onLand) {
        var params = { lat: lat, lon: lon, onLand: onLand };
        if (!DB[userID]) {
            DB[userID] = [params];
        } else {
            DB[userID].push(params);
        }
    },

    getOnLandQueriesPercent: function(userID) {
        let counter = 0;

        DB[userID].forEach(query => {
            if (query["onLand"]) {
                counter++;
            }
        });
        return (counter * 100 / DB[userID].length);
    }

}

function getUserLastQuery(id) {
    var user = DB[id];
    if (!user) {
        return 0;
    }

    return user[user.length - 1];
}

function calcDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}