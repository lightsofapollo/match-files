describe("filters/regexp", function(){

  var klass = require('../../lib/filters/regexp'),
      abstract = require('../../lib/filters/abstract'),
      options = { basedir: __dirname + '/files', regexp: /^file.js$/ },
      path = require('path'),
      subject;

  beforeEach(function(){
    subject = new klass(options);
  });

  it("should be an instance of its abstract", function(){
    expect(subject instanceof abstract).toBe(true);
  });

  describe("initializing", function(){

    it("should save options", function(){
      expect(subject.options.constructor).toBe(Object);
    });

    it("should have saved .regexp", function(){
      expect(subject.options.regexp).toBe(options.regexp);
    })

  });

  describe(".matches", function(){

    describe("when regex matches", function(){
      it("should return true", function(){
        expect(subject.matches(options.basedir + '/file.js')).toBe(true);
      });
    });

    describe("when regex does not match", function(){
      it("should return true", function(){
        expect(subject.matches(options.basedir + '/files.js')).toBe(false);
      });
    });


  });

});


