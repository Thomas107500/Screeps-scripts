var libUtility = {
    
    containsObject: function(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            //console.log(list[i].Id)
            //console.log(obj.Id)
            if (list[i].Id == obj.id) {
                return true;
            }
        }

        return false;
    }
    
};

module.exports = libUtility;