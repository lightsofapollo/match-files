describe("filters/abstract", function(){

  var klass = require('../../lib/filters/abstract'),
      options = { basedir: __dirname + '/files' },
      path = require('path'),
      subject;

  beforeEach(function(){
    subject = new klass(options);
  });


  describe("initializing", function(){

    it("should save options", function(){
      expect(subject.options.constructor).toBe(Object);
    });

    it("should ensure basedir has a following slash", function(){
      expect(subject.options.basedir).toEqual(options.basedir + '/');
    });

  });

  describe(".normalize", function(){

    var expected = 'wow/my/file.js',
        file = path.join(options.basedir, expected),
        result;

    beforeEach(function(){
      result = subject.normalize(file);
    });

    it("should return the filepath without the basedir", function(){
      expect(result).toEqual(expected);
    });

  });

});
