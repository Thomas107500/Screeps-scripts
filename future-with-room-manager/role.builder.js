var util = require('lib.utility');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            if(creep.memory.repairTargetId == null && creep.ticksToLive > 5){
                if(Memory.buildQueue.length > 0){
                    var obj = Memory.buildQueue.shift();
                    creep.memory.repairTargetId = obj.Id;
                    Memory.processingQueue.push(obj);
                    creep.say("Got new job: "+ obj.Id);
                }
            }
            var target = Game.getObjectById(creep.memory.repairTargetId);
            if((creep.repair(target) == ERR_INVALID_TARGET && creep.build(target) == ERR_INVALID_TARGET) || creep.ticksToLive <= 5 || (creep.build(target) == ERR_INVALID_TARGET && target.hits == target.hitsMax)){
                Memory.processingQueue.splice(Memory.processingQueue.indexOf(creep.memory.repairTargetId));
                creep.memory.repairTargetId = null;
                creep.say("pop job");
                
            }else{
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
                
                
                
            
            
        }
        else {
            if(creep.ticksToLive <= 5 && creep.memory.repairTargetId != null){
                Memory.processingQueue.splice(Memory.processingQueue.indexOf(creep.memory.repairTargetId));
                creep.memory.repairTargetId = null;
                creep.say("pop job(age)");
            }
            
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE) && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;}});
            if (container != undefined){
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else{
                var sources = creep.room.find(FIND_SOURCES_ACTIVE);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

module.exports = roleBuilder;