[Slides](http://slides.com/seemaullal/reacto#/)

---

# Prompt

Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words. 

The array that is returned should only contain unique values and its elements should be in alphabetical order. 

# Examples

```javascript
stringPermutations('one') 
// should return  [ 'eon', 'eno' 'neo', 'noe', 'one', 'oen']
stringPermutations('app') 
// should return  [ 'app','pap','ppa']
stringPermutations('nn') //should return  [ 'nn' ]
```

# Solutions

```javascript
function stringPermutations(str) {
    var results = [ ];
    var letters = str.split('');
    results.push([letters.shift()]); //add first letter (as an array) to results
    while (letters.length) {
        var curLetter = letters.shift();
        var tmpResults = [ ];
        results.forEach(function(curResult) {
            for (var i = 0; i<= curResult.length; i++) {
                var tmp = curResult.slice(); //make copy so we can modify it
                 //insert the letter at the current position
                tmp.splice(i,0,curLetter);
                tmpResults.push(tmp);
            }
        });
        results = tmpResults; //overwrite the previous results
    }
    results = results.map(function(letterArr) {
        return letterArr.join(''); //make string from letter array
    });
    return results.filter(function(el,index) {
        return results.indexOf(el) === index; //filter out non-unique words
    }).sort();
}
```

```javascript
function recursiveStringPermutations(str) {
    var results = [ ];
    getPerms(str, [ ]);
    function getPerms(str, arr) {
        if (typeof str === 'string')
            //on first call, split the string into an array 
            str = str.split('');
        if (!str.length) 
            //base case- push the compiled results into the results variable
            results.push(arr.join('')); 
        for (var i = 0; i < str.length; i++) {
            var letter = str.splice(i, 1); 
            arr.push(letter);
            getPerms(str, arr); //recursive call
            arr.pop(); 
            str.splice(i, 0, letter);
        }
    }
    return results.filter(function(el,index) {
        return results.indexOf(el) === index; //filter out non-unique words
    }).sort();
}
```

A solution that implicitly keeps the results sorted as it generates them:

```js
// finds all possible permutations *while* maintaining the order of the characters
function stringPermutations (str) {
  if (str.length === 1) return [str]; // base case
  const all = [];
  // go through each character in the string
  let i = 0;
  while (i < str.length) {
    // get each individual character
    const letter = str[i];
    // get all the other characters surrounding it
    const otherChars = str.slice(0, i) + str.slice(i + 1);
    // compute all permutations of the *other* characters
    stringPermutations(otherChars).forEach(submpermut => {
      // add the current letter to the front of each of these "sub-permutations"
      // include *that* into the full result set
      all.push(letter + submpermut);
    });
    // increment until we reach a new letter (to avoid duplicates in the result set)
    while (str[i] === letter) i++;
  }
  return all;
}
function sortedStringPermutations (str) {
  // first sort the characters in the string
  const sortedStr = str.split('').sort().join('');
  // then find the ordered permutations of that sorted string
  return stringPermutations(sortedStr);
}
```
