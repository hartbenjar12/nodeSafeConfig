var fs = require('fs');


module.exports.apply = function(opts){

  var logger    = opts.logger;
  var conf_dir  = opts.conf_dir;
  var cmd_args = opts.cmd_args;
  var override_dirs = opts.override_dirs;

  var localCache = { /* confName : json */}

  function isObject(objSuspect){
    return Object.prototype.toString.call(objSuspect) === '[object Object]';
  }

  /* TODO we need to preload config files
  I want things to not require genorator
  functions or callbacks to get values,
  but if i have to check if file exists
  then it becomes required. I don't like
  this try catch but it was a quick fix to the issue
  */
  function getConf(conf){
    try{return require(conf);}
    catch(e){logger.info(e+"\nfailed to load: " + conf);return {};}

  }

  function getOverrideConfs(conf){

    var config = {}

    for (var i=0; i<override_dirs.length; i++) {
      var next_file = override_dirs[i] + "/" +conf+'.json';
      logger.info("going to load: " + next_file);
      mergeOverrides(config, getConf(next_file));
    }
    logger.info(config);
    return config;

  }

  /*
    Here we use recursion to work our way through nested json objects.
    The default behavior will be to replace strings, ints, and arrays.
    Objects will be recured and have the same rules apply.
  */
  function mergeOverrides(defaults, override){

    for(key in override){
      var val = override[key];
      if( isObject(val) && defaults[key] ){
        mergeOverrides(defaults[key]||{}, val);
      }else{
        logger.info(key + " Was overwritten with: " + val)
        defaults[key] = val;
      }
    }

  }

  function existsInCache(conf){
      return localCache.hasOwnProperty(conf);
  }

  function loadInCache(conf){
    var defaults = getConf(conf_dir + "/" + conf + ".json");
    var override = getOverrideConfs(conf);
    mergeOverrides(defaults, override);
    var cmdArgs = cmd_args[conf] || {};
    mergeOverrides(defaults, cmdArgs);
    localCache[conf] = defaults;
  }

  function getFromCache(conf){
    return localCache[conf];
  }

  function recureKeyArray(obj, keyArr){
    var currKey = keyArr.shift();
    var val = obj[currKey];

    if( isObject(val) && keyArr.length > 0 ){
      return recureKeyArray(val, keyArr);
    }else{
      return val;
    }
  }
  /*
    Get val uses mongo dot syntax to fetch things from
    nested objects.
  */
  return {
    getVal: function(conf, key){
      if(!existsInCache(conf)){loadInCache(conf);}

      var keyArray = key.split(".");
      var config = getFromCache(conf);
      var result = recureKeyArray(config, keyArray);

      //TODO setup proper logging.
      logger.info("From:", conf, " Loaded:", key, "And got type:", typeof result);
      return result;
    }
  }

}
