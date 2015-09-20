/*
  Here we use recursion to work our way through nested json objects.
  The default behavior will be to replace strings, ints, and arrays.
  Objects will be recured and have the same rules apply.
*/
var logger;

module.exports.init = function(opts){
  logger = opts.logger;
}

function isObject(objSuspect){
  return Object.prototype.toString.call(objSuspect) === '[object Object]';
}

function mergeOverrides(defaults, override){

  for(key in override){
    var val = override[key];
    if( isObject(val) ){
      mergeOverrides(defaults[key]||{}, val);
    }else{
      logger.info(key + " Was overwritten with: " + val)
      defaults[key] = val;
    }
  }

}

module.exports.merge = function(defaults, override){

  for(key in override){
    var val = override[key];
    if( isObject(val) ){
      mergeOverrides(defaults[key]||{}, val);
    }else{
      logger.info(key + " Was overwritten with: " + val)
      defaults[key] = val;
    }
  }

}
