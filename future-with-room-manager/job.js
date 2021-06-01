module.exports = class Job {
    
    /**
    * Creates a new Job object.
    * @constructor
    * @param {string} role role the job belongs to
    * @param {string} targetId id of the job's target
    * @param {number} priority priority of the job(from 1-9 with 1 is the highest)
    */
    constructor(role,targetId,priority){
        this.role = role;
        this.targetId = targetId;
        this.priority = priority;
        this.creepList = [];
    }
};

