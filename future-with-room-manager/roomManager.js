const JobManager = require("jobManager");
const SpawnManager = require("spawnManager");
module.exports = class RoomManager {
    
    constructor(room){
        this.room = room;
        this.jobManager = new JobManager(room);
        this.spawnManager = new SpawnManager(room);
        console.log(`RoomManager created for room ${room.name}...`);
    }
    
    
    run(){
        console.log(`RoomManager processing room ${this.room.name}...`);
        this.jobManager.updateJobList();
        for(var i=0; i<this.room.memory.jobList.length; i++){
            switch(this.room.memory.jobList[i].role){
                case "harvester":
                    //each source need at least 5 WORK part to be drain within 300 ticks
                    let count = 0;
                    for(var creepName of this.room.memory.jobList[i].creepList){
                        if(Game.creeps[creepName] === undefined && !this.spawnManager.getSpawningCreeps().includes(creepName)){
                            this.room.memory.jobList[i].creepList.splice(this.room.memory.jobList[i].creepList.indexOf(creepName),1);
                        }else{
                            count += Game.creeps[creepName].getActiveBodyparts(WORK);
                        }
                    }
                    if(count < 5){
                        let result = this.spawnManager.trySpawnCreep(this.spawnManager.getHarvesterBody(),"Harvester",{memory: {role: 'harvester', targetId: null}});
                        if(result !== false){
                            //TODO: not finished yet, still lacking code to remove creep from creepList and testing whether job completed in role.harvester
                            this.room.memory.jobList[i].creepList.push(result);
                            Game.creeps[result].memory.targetId = this.room.memory.jobList[i].targetId;
                        }
                    }
                    break;
            }
        }
        
        
    }
    
    
    
    
    /**
     * Get creeps of a specific role base on room name.
    * @param {string} roleName name of the role
    * @param {string} roomName name of the room
    * @return {Creep[]} Returns a list of creeps of specified role as an array
    */
    static getRoleCreepsByRoomName(roomName, roleName) {
        return Game.rooms[roomName].find(FIND_MY_CREEPS, {
            filter: function (object) {
                return object.memory.role === roleName;
            }
        });
    }
    
    /**
    * Get creeps of a specific role base on room object.
    * @param {string} roleName name of the role
    * @param {Room} roomObj name of the room
    * @return {Creep[]} Returns a list of creeps of specified role as an array
    */
    static getRoleCreepsByRoom(roomObj, roleName) {
        return roomObj.find(FIND_MY_CREEPS, {
            filter: function (object) {
            return object.memory.role === roleName;
            }
        });
    }
};
