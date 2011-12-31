var util = require('util'),
    Abstract = require('./abstract');

function Filter(){
  Abstract.apply(this, arguments);
};

util.inherits(Filter, Abstract);

Filter.prototype.matches = function(path){
  return !!(this.normalize(path).match(this.options.regexp));
};

module.exports = exports = Filter;
