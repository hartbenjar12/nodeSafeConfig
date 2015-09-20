# Node Safe Config

## About
The idea was to make a way of configuring things in node as easy as using a typesafe config. There will be sensible defaults as a part of the repo. This will default to {process CWD}/config. This can be overwritten by the following with the first load. After the first time loading you no longer have to specify the conf_dir.
```Javascript
require("nodeSafeConfig")({conf_dir:"..."})
```

## Usage
###Default config file in ./config/mongo.json
```Javascript
  {
    host: "127.0.0.1",
    db: "MyApp"
  }
```
###Override Config in /server_configs/mongo.json
This config will contain environment properties.
The nodeSafeConfig lib will replace anything in
the default config with what is in the override
config. When there are multiple override
configurations the last folder provided is the top
level config.
```Javascript
  {
    host: "production.mongo.myapp.com"
  }
```
###App Code in app.js
``` Javascript
  var configs = require("nodeSafeConfig")()
  var mongoHost = configs.getVal("mongo", "host")
```
###CMD
```Bash
node app.js --override_dirs="/server_configs,/myApp/moreconfigs"
```

###CMD With commandline overrides.
This makes since for quick testing or pointing things somewhere else real quick without modifing configs. Any command line args will be taken over anything else in any config file
```Bash
node app.js --override_dirs="..." --mongo.host="production.mongo.region2.myapp.com"
```
