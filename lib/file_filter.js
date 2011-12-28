
var StepObject = require('step-object'),
    fs = require('fs'),
    path = require('path'),
    RecurseDirectory;

var step = StepObject({

  /**
   * Queues a file to be filtered
   *
   *
   * @param {String} path path to file
   * @param {Object} options for queue
   */
  queue: function(path, options){
    this.filePath = path;
    this.options = options;

    fs.stat(this.filePath, this);
  },

  /**
   * Filters file if file is a directory queue
   * for a scan of that directory.
   *
   * If file is a true file filter it if filter option is used.
   *
   * @param {Object} err
   * @param {Array} files list of files
   */
  read: function(err, stat){
    if(stat.isDirectory()){
      RecurseDirectory = RecurseDirectory || require('./recurse_directory');

      RecurseDirectory.filter(
        this.filePath,
        this.options,
        this
      );
    }
  },

  /**
   * Called on completion of chain returns the list of files in options
   * of filtered files.
   *
   *
   * @return {Array}
   */
  report: function(err){

  }

}, ['queue', 'read', 'report']);

exports = module.exports = {filter: step};

