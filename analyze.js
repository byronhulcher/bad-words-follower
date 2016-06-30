const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('results.txt', 'utf-8'));

var count = function(ary, classifier) {
  return ary.reduce(function(counter, item) {
    var words = (classifier || String)(item);
    words.map(function(value, index){
        value = value.toLowerCase(value);
        counter[value] = counter.hasOwnProperty(value) ? counter[value] + 1 : 1;
    })
    
    return counter;
  }, {})
};

var countByWord = count(matches, function(match) { return match.words });
fs.writeFileSync("analysis.txt", JSON.stringify(countByWord, null, 2));
