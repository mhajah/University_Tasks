function createGenerator() {
    var _state = 0;
    return {
        next : function() {
            return {
                value : _state,
                done : _state++ >= 10
            }
        }
    }
}

var foo = {
    [Symbol.iterator] : createGenerator
};

for ( var f of foo )
console.log(f);
    