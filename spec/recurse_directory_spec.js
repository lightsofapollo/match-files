describe("RecurseDirectory", function(){
  var RecurseDirectory = require('../lib/recurse_directory'),
      FileFilter = require('../lib/file_filter'),
      MockStepObjectScope = require('./spec_helper'),
      util = require('util'),
      fs = require('fs'),
      path = require('path');

  var subject, dir = __dirname + '/files/', 
      options = {
        filter: /nested\/file.js/
      }, klass;

  beforeEach(function(){
    klass = MockStepObjectScope(RecurseDirectory.filter);
    subject = klass(dir, options);
  });

  describe(".queue", function(){

    var behavesLikeQueue = function(){
      it("should save options", function(){
        expect(subject.options.filter).toEqual(options.filter);
      });


      it("should set this.directory to first argument", function(){
        expect(subject.directory).toEqual(dir);
      });

      it("should queue a fs.readdir call", function(){
        expect(fs.readdir).toHaveBeenCalledWith(
          dir,
          subject
        );
      });
    };

    beforeEach(function(){
      spyOn(fs, 'readdir');
      subject = klass(dir, options);
    });

    describe("when given .files in options", function(){

      var files = ['wow'];
      beforeEach(function(){
        var newOpts = Object.create(options);
        newOpts.files = files;

        subject = klass(dir, newOpts);
      });

      behavesLikeQueue();

      it("should the same .files object when given in options", function(){
        expect(subject.options.files).toBe(files);
      });

    });

    it("should set options.files to an array", function(){
      expect(subject.options.files).toEqual([]);
    });

    behavesLikeQueue();

  });

  describe(".read", function(){
    beforeEach(function(){
      spyOn(FileFilter, 'filter');
      subject.methods.read.call(subject, null, ['file', 'file2']);
    });

    it("should queue a FileFilter", function(){
      expect(FileFilter.filter).toHaveBeenCalledWith(
        path.join(dir, 'file'), subject.options, subject
      );

      expect(FileFilter.filter).toHaveBeenCalledWith(
        path.join(dir, 'file2'), subject.options, subject
      );
    })
  });

  describe(".report", function(){

    var expected = ['list'], actual;

    beforeEach(function(){
      subject.options.files = expected;

      actual = subject.methods.report.call(subject);
    });

    it("should return subject.options.files", function(){
      expect(actual).toBe(expected);
    });

  });

});
