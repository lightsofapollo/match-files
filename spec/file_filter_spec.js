describe("FileFilter", function(){
  var RecurseDirectory = require('../lib/recurse_directory'),
      FileFilter = require('../lib/file_filter'),
      MockStepObjectScope = require('./spec_helper'),
      util = require('util'),
      fs = require('fs'),
      path = require('path');

  var klass,
      path = __dirname + '/files/file.js',
      options = {files: []},
      subject;

  function mockStat(){
    return {
      isDirectory: function(){ return false; }
    };
  };

  beforeEach(function(){
    klass = MockStepObjectScope(FileFilter.filter)
    subject = klass(path, options);
  });

  describe(".queue", function(){
    beforeEach(function(){
      spyOn(fs, 'stat');
      subject = klass(path, options);
    });

    it("should set .filePath to first argument", function(){
      expect(subject.filePath).toEqual(path);
    });

    it("should set .options to second argument", function(){
      expect(subject.options).toBe(options);
    });

    it("should queue a fs.stat call", function(){
      expect(fs.stat).toHaveBeenCalledWith(path, subject);
    });

  });

  describe(".read", function(){

    var stat;

    beforeEach(function(){
      stat = mockStat();
    });

    describe("when stat is a directory", function(){
      beforeEach(function(){
        spyOn(RecurseDirectory, 'filter');
        spyOn(stat, 'isDirectory').andCallFake(function(){
          return true;
        });

        subject.methods.read.call(subject, null, stat);
      });

      it("should queue a RecurseDirectory.filter call", function(){
        expect(RecurseDirectory.filter).toHaveBeenCalledWith(
          path, options, subject
        )
      });


    });

  });

});
