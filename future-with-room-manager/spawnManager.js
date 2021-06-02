var Spawner = require("spawner");

module.exports = class SpawnManager{
    constructor(room){
        this.room = room;
        this.spawnerList = [];
        for(var spawn of this.room.find(FIND_MY_SPAWNS)){
            this.spawnerList.push(new Spawner(spawn,false));
        }
    }
    /**
     * Try to spawn a creep base on given parameter.
    * @param {string[]} body An arry of the body parts of the creep
    * @param {string} creepType Type of the creep
    * @param {object} options An option object for spawning: e.g. {memory: {role: 'harvester', targetId: null}}
    * @returns {(string|boolean)} Returns the creep's name if succeeded, false otherwise
    */
    trySpawnCreep(body,creepType,options){
        for(var spawner of this.spawnerList){
            if(spawner.spawn.spawning === null && !spawner.isQueued){
                if(spawner.spawn.spawnCreep(body,creepType+Game.time,{dryrun: true}) !== ERR_NOT_ENOUGH_ENERGY){
                    let creepName = creepType+Game.time;
                    spawner.spawn.spawnCreep(body,creepName,options);
                    spawner.isQueued = true;
                    return creepName;
                }else{
                    return false;
                }
            }
        }
        return false;
    }
    /**
     * Return a list of creeps that are spawning in the room.
    * @returns {string[]} List of creeps that are spawning.
    */
    getSpawningCreeps(){
        let spawningList = [];
        for(var spawner of this.spawnerList){
            if(spawner.spawn.spawning === null){
                continue;
            }
            spawningList.push(spawner.spawn.spawning.name);
        }
        return spawningList;
    }
    
    
    getHarvesterBody(){
        //harvester body ratio: 5 WORK , 1 CARRY, 3 MOVE
        //if there is so less energy that we cant even use ratio yet, use default template first
        if(this.room.energyCapacityAvailable<= 450){
            return [WORK,CARRY,MOVE];
        }
        
        let body = [];
        for (var i = 0; i < Math.floor((this.room.energyCapacityAvailable*(5/8))/BODYPART_COST.work); i++) {
            body.push(WORK);
        }
        for (var j = 0; j < Math.floor((this.room.energyCapacityAvailable*(1/8))/BODYPART_COST.carry); j++) {
            body.push(CARRY);
        }
        for (var k = 0; k < Math.floor((this.room.energyCapacityAvailable*(3/8))/BODYPART_COST.move); k++) {
            body.push(MOVE);
        }
        return body;
    }

    static getCreepPartCount(targetPart,body){
        var count = 0;
        for(var part of body){
            if(part === targetPart){
                count += 1;
            }
        }
        return count;
    }
};