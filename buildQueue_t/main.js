var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleCarrier = require('role.carrier');
var util = require('lib.utility');

const wantedHarvesters = 2;
const wantedBuilders = 2;
const wantedDefenders = 0;
const wantedUpgraders = 0;
const wantedCarriers = 1;

if (Memory.buildQueue == undefined) {Memory.buildQueue = [];}
if (Memory.processingQueue == undefined) {Memory.processingQueue = [];}

module.exports.loop = function () {
    console.log(Memory.buildQueue.length);
    var damagedObj = Game.spawns.Spawn1.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.hits / structure.hitsMax) < 0.2;}});
        
        for(i = 0; i < damagedObj.length; i++){
            if(!util.containsObject(damagedObj[i], Memory.processingQueue) && !util.containsObject(damagedObj[i], Memory.buildQueue)){
                if (damagedObj[i].structureType == STRUCTURE_CONTAINER || damagedObj[i].structureType == STRUCTURE_ROAD || damagedObj[i].structureType == STRUCTURE_STORAGE){
                    var job = {Id: damagedObj[i].id, priority: 2};
                    Memory.buildQueue.push(job);
                }
                if (damagedObj[i].structureType == STRUCTURE_WALL && damagedObj[i].hits < 100){
                    var job = {Id: damagedObj[i].id, priority: 2};
                    Memory.buildQueue.push(job);
                }
                else{
                    var job = {Id: damagedObj[i].id, priority: 4};
                    Memory.buildQueue.push(job);//TODO: Will keep building priority 4 object even if there are more urgent one(check the queue once in a while?)
                }
            }
        }
        var buildSites = Game.spawns.Spawn1.room.find(FIND_CONSTRUCTION_SITES);
        for (i = 0; i < buildSites.length; i++){
            if(!util.containsObject(buildSites[i], Memory.processingQueue) && !util.containsObject(buildSites[i], Memory.buildQueue)){
                var job = {Id: buildSites[i].id, priority: 3};
                Memory.buildQueue.push(job);
            }
        }
        Memory.buildQueue.sort((a,b) => {
            if (a.priority == b.priority){
                return 0;
            }else{
                return a.priority < b.priority ? -1 : 1;
            }
            
        }
        );
    
    var tower = Game.getObjectById('TOWER_ID');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == 'defender');
    var carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    
    if(harvesters.length < wantedHarvesters) {
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }
    
    if(builders.length < wantedBuilders) {
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'builder', repairTargetId: null}});
    }
    
    if(upgraders.length < wantedUpgraders) {
        var newName = 'upgrader' + Game.time;
        //console.log('Spawning new upgraer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }
    
    if(defenders.length < wantedDefenders) {
        var newName = 'defender' + Game.time;
        //console.log('Spawning new defender: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([ATTACK,ATTACK,MOVE,MOVE], newName,
            {memory: {role: 'defender'}});
    }
    
    if(carriers.length < wantedCarriers) {
        var newName = 'Carrier' + Game.time;
        //console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,MOVE,MOVE,MOVE], newName,
            {memory: {role: 'carrier'}});
    }
    
    
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'defender') {
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            roleCarrier.run(creep);
        }
    
    }
};