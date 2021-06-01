var statManager = {
    
    /**
     * Get creeps of a specific role base on room name.
     * @param {string} roleName name of the role
     * @param {string} roomName name of the room
     * @return {Creep[]} Returns a list of creeps of specified role as an array
     */
    getRoleCreepsByRoomName: function(roomName,roleName) {
        return Game.rooms[roomName].find(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.memory.role == roleName;
            }
        });
    },
    /**
     * Get creeps of a specific role base on room object.
     * @param {string} roleName name of the role
     * @param {Room} roomObj name of the room
     * @return {Creep[]} Returns a list of creeps of specified role as an array
     */
    getRoleCreepsByRoom: function(roomObj,roleName) {
        return roomObj.find(FIND_MY_CREEPS, {
            filter: function(object) {
                return object.memory.role == roleName;
            }
        });
    }
    
};

module.exports = statManager;