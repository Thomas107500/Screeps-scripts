var roomManager = require('roomManager');

module.exports = class ColonyManager {

//1. Get necessary room data(energy count? resource count? creep count? role composition?)
//2. evaluate room status(under attack? threat imminent? condition escalating?)
//3. Grab job and assign them to creep
//4. Spawn creep(if there are not enough creep, spawn them and assign them)
//5. determine the next high level action(expand? reinforce rooms? retreat? relocate?)
    
    static run() {
        var roomList = [];
        for (var name in Game.rooms) {
            roomList.push(new roomManager(Game.rooms[name]));
        }
        for(var manager of roomList){
            manager.run();
        }
    }
    
};
