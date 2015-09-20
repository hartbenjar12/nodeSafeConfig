module.exports.apply = function(){
  var cmdArgs = {/* mongo: { host: "foo.local"} */}

  return process.argv.reduce(function(previousValue, currentValue, index, array){
    console.log(previousValue, currentValue)
    if(currentValue.indexOf("=") > 0){
      var kv = currentValue.split("=");
      var keys = kv[0].replace("--", "").split(".");
      var value = kv[1];
      return extractDocValues(previousValue, keys, value);
    }else{
      return previousValue;
    }
  }, {})

  function extractDocValues(object, values, value){
    console.log(object, values, value);
    var current = values.shift();
    if(values.length > 0){
      object[current] = object[current] || {};
      extractDocValues(object[current], values, value);
    }else{
      object[current] = value;
    }
    return object;
  }

  /*.forEach(function (val, index, array) {
    if(val.indexOf("=")){
      var kv = val.split("=");
      var keys = kv[0].split(".");
      var value = kv[1];

      keys.reduce(function(previousValue, currentValue, index, array){
        if(index != array.length -1){
          return previousValue[currentValue] = {}
        }else{
          reu
        }
      }, {});

    }
  });*/

}
