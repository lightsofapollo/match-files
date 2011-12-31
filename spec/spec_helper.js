module.exports = exports = MockStepObjectScope;

function MockStepObjectScope(stepObject){
  var groupFn = function(){
        return groupFn;
      },
      parallelFn = function(){
        return parallelFn;
      },
      result, firstStep = stepObject.order[0],
      i, len;

  var constructor = function(){

    var context = function(){};

    context.methods = stepObject.methods;
    context.group = function(){
      return groupFn;
    };

    context.parallel = function(){
      return parallelFn;
    };

    stepObject.methods[firstStep].apply(context, arguments);

    return context;
  }

  return constructor;
};
