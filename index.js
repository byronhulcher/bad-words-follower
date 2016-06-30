const fs = require('fs');

const changes = require('concurrent-couch-follower');
const Request = require('request');
const bad_words = [/\b\w*fuck\w*\b/g]

const db = 'https://replicate.npmjs.com';


var replacer = function(key, value){
  // replaces escaped whitespace  characters
  if (!!value && typeof(value) === 'string'){
    return value
      .replace(/(\\r\\n)|(\\n\\r)|(\\n)|(\\r)|(\\t)/g," ")
      .replace(/(\r\n)|(\n\r)|(\n)|(\r)|(\t)/g, " ");
  }
  return "";
}

Request.get(db, function(err, req, body) {
  var end_sequence = JSON.parse(body).update_seq;
  var results = [];
  changes(function(change, done) {
    if (change.seq >= end_sequence) {
      fs.writeFileSync("results.txt", JSON.stringify(results, null, 2))
      process.exit(0);
    }
    if (change.doc.name && change.doc.readme) {
      console.log("Checking:",  change.doc.name);
      for(var i = 0; i < bad_words.length; i++) {
        var matches = JSON.stringify(change.doc.readme, replacer).match(bad_words[i]);
        if (matches) {
          console.log("Found on " + change.doc.name + ":", matches);
          var hit = {
            "name":  change.doc.name,
            "words": matches
          };
          results.push(hit);
        }
      }
    }
    done();
  }, {
    db: db,
    include_docs: true,
    now:false
  })
});
