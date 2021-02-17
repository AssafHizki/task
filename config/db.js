// This is the Cache memory db
// Normally I would use a normal DB such as Redis / Mongo / SQL
// Implemented as Singleton
exports.DB = (function() {
    var dictionary;

    function createInstance() {
        var object = new Object();
        return object;
    }

    return {
        getInstance: function() {
            if (!dictionary) {
                dictionary = createInstance();
            }
            return dictionary;
        }
    };
})();