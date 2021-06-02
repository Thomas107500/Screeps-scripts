module.exports = class Spawner {
    
    /**
    * Creates a new Spawner object.
    * @constructor
    * @param {StructureSpawn} spawn StructureSpawn object of the spawner
    * @param {boolean} isQueued Whether this Spawner is set to spawn creep in the next tick
    */
    constructor(spawn,isQueued){
        this.spawn = spawn;
        this.room = this.spawn.room;
        this.isQueued = isQueued;
    }
};