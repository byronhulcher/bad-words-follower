# bad-words-follower
> making a list (of readmes) and checking it just once, for bad fucking language.

this repository is the home of an npm registry follower that reads in package READMEs
and checks how many of them are using the word `fuck` or a word containing it.

the main goal of this repository is to flag potentially problematic READMEs. Since
this checks for substrings, it is capable of false positives.

## initial setup

1. Fork and clone this repository
2. `cd bad-words-follower`
3. `npm install`

## to run
1. `npm start`