const Job = require("job");

module.exports = class JobManager{
    constructor(room){
        this.room = room;
        if(room.memory.jobList === undefined){room.memory.jobList = [];}
    }
    
    /**
    * Update the list of jobs
    */
    updateJobList(){
        //TODO: have to deal with jobs that are no longer valid too(already completed)
        //harvester
        //removing empty sources just waste cpu as sources replentish after 300 ticks anyway
        let sources = this.room.find(FIND_SOURCES_ACTIVE);        
        for(var source of sources){
            var job = new Job("harvester",source.id,2);
            if(!this.isJobExist(job)){
                this.room.memory.jobList.push(job);
            }
        }
    
        this.room.memory.jobList.sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            }
            if (a.priority > b.priority) {
                return 1;
            }
            return 0;
          });
    }
    /**
    * Check whether a Job exist in the job list.
    * @param {Job} job the target job
    * @return {boolean} Returns true if exist, false otherwise
    */
    isJobExist(job){
        for(var jobInList of this.room.memory.jobList){
            if(job.targetId === jobInList.targetId){
                return true;
            }
        }
        return false;
    }
};
