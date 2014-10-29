var fs = require('fs'),
    thesaurus = {}

readFile(function() {
  writeFile();
});


/**
* Read in txt file
*/
function readFile(callback) {
  fs.readFile('NASA_Thesaurus_Alpha_CSV.txt', { encoding: 'utf16le'}, function(err, data) {
    if(err) {
      console.log(err);
    }

    convert(data.split('\n'), function() {
      callback();
    });
  });
}

/**
* Write JSON to file
*/
function writeFile() {
  var outputFilename = 'thesaurus.json';

  fs.writeFile(outputFilename, JSON.stringify(thesaurus, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
  });
}

/**
* Traverse rows, split and store into object
*/
function convert(data, callback) {
  for(var i = 0; i < data.length; i++) {
    var tokens = data[i].split(',');

    var key = _scrub(tokens[1]);

    if(thesaurus[key] === undefined) {
      thesaurus[key] = []
      thesaurus[key].push(_scrub(tokens[5]));
    } else {
      thesaurus[key].push(_scrub(tokens[5]));
    }
  }

  callback();
}

/**
* Strip whitespace
*/
function _scrub(word) {
  if(!word) return;
  word = word.replace(/"/g,'');
  return(word);
}
