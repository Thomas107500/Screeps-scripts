var job = function Job(role,targetId,priority) {
    
    this.role = role;
    this.targetId = targetId;
    this.priority = priority;
    this.creepList = [];
};

module.exports = job;