var Manager = {
    
    creepList: function() {
        var counter = 0;
        
        var harvester = 0;
        var builder = 0;
        var upgrader = 0;
        var carrier = 0;
        var defender = 0;
        
        console.log("====Creep List====");
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            counter += 1;
            console.log(counter+ ": " + creep.memory.role);
            if(creep.memory.role == 'harvester') harvester += 1;
            if(creep.memory.role == 'builder') builder += 1;
            if(creep.memory.role == 'upgrader') upgrader += 1;
            if(creep.memory.role == 'carrier') carrier += 1;
            if(creep.memory.role == 'defender') defender += 1;
        }
        console.log(`harvester: ${harvester} builder: ${builder} upgrader: ${upgrader} carrier: ${carrier} defender: ${defender}`);
        console.log("==================");
    }
    
};

module.exports = Manager;