const fs = require('fs');

const matches = JSON.parse(fs.readFileSync('results.txt', 'utf-8'));

var count = function(ary, skipPackageNames) {
  return ary.reduce(function(counter, item) {
    var words = item.words
    words.map(function(value, index){
        value = value.toLowerCase(value);
        if (skipPackageNames && value === item.name){
            return;
        }
        counter[value] = counter.hasOwnProperty(value) ? counter[value] + 1 : 1;
    })
    
    return counter;
  }, {})
};

var countByWord = count(matches);
var countByWordWithoutPackageNames = count(matches, true);

fs.writeFileSync("analysis.txt", JSON.stringify(countByWord, null, 2));
fs.writeFileSync("analysis-without-package-names.txt", JSON.stringify(countByWordWithoutPackageNames, null, 2));
