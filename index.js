const fs = require('fs');

const changes = require('concurrent-couch-follower');
const Request = require('request');
const bad_words = [/\b\w*fuck\w*\b/g]

const db = 'https://replicate.npmjs.com';


var replacer = function(key, value){
    // replaces all escaped newline characters
    return !!value && typeof(value) === 'string' ? value.replace(/(\\r\\n)|(\\n\\r)|(\\n)|(\\r)|(\\t)/g,"") : "";
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
    //   console.log("checking: " + change.doc.name);
      for(var i = 0; i < bad_words.length; i++) {
        var matches = JSON.stringify(change.doc.readme, replacer).match(bad_words[i]);
        if (matches) {
          console.log("found: ", matches);
          if (matches.indexOf("nBrainfuckme") >= 0){
              console.log("FOUND IT!")
              console.log(change.doc)
              throw new Error();
          }
          
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
