# bad-words-follower
> making a list (of readmes) and checking it just once, for bad fucking language.

this repository is the home of an npm registry follower that reads in package READMEs
and checks how many of them are using the word `fuck` or a word containing it.

the main goal of this repository is to flag potentially problematic READMEs. since
this checks for substrings, it is capable of false positives.

## initial setup

1. Fork and clone this repository
2. `cd bad-words-follower`
3. `npm install`

## to run
1. `npm start`

this will produce three files in JSON format:
`results.txt` - List of packages containing bad words in their README and relevant words
`analysis.txt` - contains a dictionary of all words found, along with their count
`analysis-witout-package-names.txt` - contains a dictionary of words found, along with their count, excluding words from a README that match the package name
