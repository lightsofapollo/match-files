module.exports = exports = Abstract;

var path = require('path');

function Abstract(options){
  //Inherit object
  this.options = Object.create(options);
  this.options.basedir = path.join(this.options.basedir, '/');

};

Abstract.prototype.normalize = function(path){
  return path.replace(this.options.basedir, '');
};
