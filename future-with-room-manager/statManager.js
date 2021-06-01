var statManager = {
    getSourcesAvailableEnergy(room){
        let sources = room.find(FIND_SOURCES_ACTIVE);
        var totalEnergy;
        if(sources.length > 0){
            for(var source of sources){
                totalENergy += source.energy;
            }
            return totalEnergy;
        }else{
            return 0;
        }
    }
};

module.exports = statManager;