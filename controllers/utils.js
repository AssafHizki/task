const https = require("https");

module.exports = {
    convertAddressToLatLon: async function(address) {
        var options = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        options += address;

        await https.get(options, res => {
            res.setEncoding("utf8");
            let body = "";
            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                console.log(body);
                return body;
            });
        });
    }
}