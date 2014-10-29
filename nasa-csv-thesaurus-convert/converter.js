var fs = require('fs'),
    readline = require('readline'),
    thesaurus = {}

readFile(function() {
  writeFile();
});


function readFile(callback) {
  fs.readFile('NASA_Thesaurus_Alpha_CSV.txt', { encoding: 'utf8'}, function(err, data) {
    if(err) {
      console.log(err);
    }

    convert(data.split('\n'), function() {
      callback();
    });
  });
}

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

function convert(data, callback) {
  for(var i = 0; i < data.length; i++) {
    var tokens = data[i].split(',');

    var key = _scrub(tokens[1]);

    if(thesaurus[key] === undefined) {
      thesaurus[key] = []
      thesaurus[key].push(tokens[5]);
    } else {
      thesaurus[key].push(tokens[5]);
    }
  }

  callback();
}

function _scrub(word) {
  if(!word) return;
  word = word.replace(/"/g,'');
  return(word.toString());
}
