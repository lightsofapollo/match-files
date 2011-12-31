
var StepObject = require('step-object'),
    FileFilter,
    fs = require('fs'),
    path = require('path'),
    step, util = require('util');


step = StepObject({

  /**
   * Queues a directory to be scanned.
   *
   *
   * @param {String} path path to directory
   * @param {Object} options for queue
   */
  queue: function(path, options){
    if(!options){
      options = {};
    }

    this.directory = path;
    this.options = options;

    this.options.files = this.options.files || [];

    if(typeof(this.directory) == 'object'){
      console.log(arguments[0].stack);
    }
    fs.readdir(this.directory, this);
  },

  /**
   * Scan directory's files.
   * Queues files to be filtered.
   *
   * @param {Object} err
   * @param {Array} files list of files
   */
  read: function(err, files){
    if(err){
      console.log(err.stack);
      throw err;
    }

    var i = 0, len = files.length, group = this.group();
    //Prevents the partial loading of this module which prevents 
    //tests from running cleanly
    FileFilter = FileFilter || require('./file_filter')

    for(; i < len; i++){
      //FileFilter is actually responsible for pushing files into
      //the this.options.files array.
      FileFilter.filter(
        path.join(this.directory, files[i]), this.options, group()
      );
    }
  },

  /**
   * Called on completion of chain returns the list
   * of filtered files.
   *
   *
   * @return {Array}
   */
  report: function(err){
    return this.options.files;
  }

}, ['queue', 'read', 'report']);

module.exports = exports = {filter: step};

