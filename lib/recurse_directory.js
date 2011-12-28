
var StepObject = require('step-object'),
    FileFilter,
    fs = require('fs'),
    path = require('path'),
    step;


step = StepObject({

  /**
   * Queues a directory to be scanned.
   *
   *
   * @param {String} path path to directory
   * @param {Object} options for queue
   */
  queue: function(path, options){
    this.directory = path;
    //Use options as a proto so we can overwrite props
    this.options = Object.create(options);

    this.options.files = this.options.files || [];

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
    var i = 0, len = files.length;

    //Prevents the partial loading of this module which prevents 
    //tests from running cleanly
    FileFilter = FileFilter || require('./file_filter')

    if(err){
      //TODO: Figure out best approach
    }

    for(; i < len; i++){
      //FileFilter is actually responsible for pushing files into
      //the this.options.files array.
      FileFilter.filter(
        path.join(this.directory, files[i]), this.options, this
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

