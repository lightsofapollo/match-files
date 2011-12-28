var StepObject = require('step-object');

describe("match-files", function(){

  var dir = __dirname + '/files/';
  var fs = require('fs'),
      path = require('path');


  var RecurseDirectory = StepObject({
    queue: function(path, files){
      this.directory = path;
      this.files = files || [];

      fs.readdir(path, this);
    },

    read: function(err, files){
      var i, len, filePath, group = this.group();

      for(i = 0, len = files.length; i < len; i++){
        StatFile(path.join(this.directory, files[i]), this.files, group());
      }
    },

    resolve: function(){
      return this.files;
    }

  }, ['queue', 'read', 'resolve']);

  var StatFile = StepObject({

    queue: function(path, files){
      this.filePath = path;
      this.files = files;

      fs.stat(path, this);
    },

    read: function(err, stat){
      if(stat.isDirectory()){
        RecurseDirectory(this.filePath, this.files, this);
      } else {
        this.files.push(this.filePath);
        next();
      }
    },

    resolve: function(){
      return this.files;
    }

  }, ['queue', 'read', 'resolve']);

  it("should work well", function(){

    RecurseDirectory(dir, function(err, files){
      done = true;
    });

  });

});
