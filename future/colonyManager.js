var stat = require('statManager');

var colonyManager = {

//1. Get necessary room data(energy count? resource count? creep count? role composition?)
//2. evaluate room status(under attack? threat imminent? condition escalating?)
//3. Grab job and assign them to creep
//4. Spawn creep(if there are not enough creep, spawn them and assign them)
//5. determine the next high level action(expand? reinforce rooms? retreat? relocate?)
    
    run: function() {
        for (var room of Game.rooms) {
            
            stat.getRoleCreepsByRoom(room,"harvester");
        }
    }
    
};

module.exports = colonyManager;