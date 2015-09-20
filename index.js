var utils = require("./lib/util.js")
var confLoader = require("./lib/confLoader.js")
var argParser = require("./lib/argParser.js")

function nullLog(){}

defaults = {
  /* TODO add support for Env vars so override_prefix does something */
  override_prefix : "OVERRIDE",
  conf_dir        : process.cwd() + "/config",
  cmd_args        : {},
  override_dirs   : [],
  logger          : {info: nullLog, error: nullLog}
}

utils.init(defaults);

module.exports = function(opts){
  //merge opts
  utils.merge(defaults, opts || {});
  //parse cmd args
  var cmdArgs = argParser.apply();
  console.log("CMD ARGS", cmdArgs);
  defaults.cmd_args = cmdArgs;
  //split override dirs
  if(cmdArgs.override_dirs){
    defaults.override_dirs = cmdArgs.override_dirs.replace(" ", "").split(",")
  }
  //return call apply on confLoader
  return confLoader.apply(defaults);


}
