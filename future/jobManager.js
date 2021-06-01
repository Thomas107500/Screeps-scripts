var jobManager = {
    run: function() {
        if (Memory.jobs == undefined) {Memory.jobs = [];}
        //Harvester job, currently hardcoded to be only 1 vaccancy
        for (var room of Game.rooms) {
            room.find(FIND_SOURCES)
        }
    }
};

module.exports = jobManager;