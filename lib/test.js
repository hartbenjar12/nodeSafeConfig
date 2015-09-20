
console.log("LIB_FILE_NAME",__filename)
console.log( "LIB_PROCESS_CWD", process.cwd() )

console.log( "LIB_PARENT_FILE_NAME", module.parent.filename )

var path = require('path');
var appDir = path.dirname(require.main.filename);

console.log("LIB_MAIN_FILE_NAME", appDir)
