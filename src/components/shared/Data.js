/**
 * Data
 * @author kmturley
 */

let Data = function() {
    return {
        saveUser: function(user) {
            console.log('saveUser', user);
        }
    };
};

Data.$inject = [];

export default Data;
