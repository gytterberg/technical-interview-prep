[Slides](http://slides.com/katehumphrey/rainwater-collector#/)

---

# Prompt

You're an industrious programmer that lives off the grid. The local well that you use to fetch water has gone dry, so you've decided to collect rain water to filter; however, your collection device isn't flat. 

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water your collection device is able to trap after raining.

# Example

Given `[0,1,0,2,1,0,1,3,2,1,2,1]`, return `6`.

Visual Representation of above: 

<img src="http://i.imgur.com/sB0F67W.png" />

Here are some samples to test to be sure the function works.
It is helpful to draw them out then walk step-by-step through 
the solution to help visualize it.

```js
// vol = 7
const a = [0,0,1,2,4,3,2,5,0,0,2,1];
console.log('collection device "a" can hold', totalVol(a));
 
// vol = 6
const b = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log('collection device "b" can hold', totalVol(b));
 
// vol = 12
const c =[0,3,0,1,0,0,0,1,0,2];
console.log('collection device "c" can hold', totalVol(c));
 
// vol = 8
const d = [0,1,0,3,5,0,0,0,2,0,1];
console.log('collection device "d" can hold', totalVol(d));
 
// vol = 38
const e = [0,5,3,2,8,8,1,1,2,4,3,3,7,1,2,4,3,2];
console.log('collection device "e" can hold', totalVol(e));
```

# Solutions

Before we begin to sum the total water volume of the collector, it is important to use our understanding of water itself. Water will only gather up to the height of its reservoir walls. Therefore we should think about this problem in terms of height. Initially one might attempt to loop through the array and try to sum the volumes of the vertical columns of water. This approach quickly breaks down whenever the complexity of calculating the size of each reservoir is encountered.

Instead of summing the volume vertically we will think about how much volume exists in a horizontal plane at each incremental height. The solution below goes about this by starting at the highest 'peak' and and summing the total amount of volume at that level then decrementing the height by one and repeating the process until a height of 0 is reached. This produces an `O(n*a)` solution (`n` is the size of the array, `a` is the maximum number in the array). See individual comments to better understand the solution.

```js 
/* the 'totalVol' function will find the 'peak'
of the collection array then sum the volume
at each subsequent level util the 'ground'
is reached. */
   
function totalVol (blocks) {
  // 'peak' is set to the return of Math.max() 
  //  when it is applied to the array with
  // 'null' as the 'this'.
  const peak = Math.max(...blocks);
  
  // instantiate volume to 0
  let vol = 0;
  
  // this loop starts at the 'peak' height
  // then decrements the height
  for (let height = peak; height > 0; height--) {

    // 'peaksAtHeightLevel' is set to the return of 
    // 'peakIndicesMaker' which is an array of indices
    //  of reservoir walls that exist at that level.
    const peaksAtHeightLevel = peakIndicesMaker(blocks, height);
    
    // 'vol' is then incremented by the volume that exists
    // at that level.
    vol += volAtLevel(peaksAtHeightLevel);
  }

  // total volume is returned
  return vol;
}


/* As demonstrated above this function takes
the original array as well as the height level
and returns an array of indices where reservoir
walls exist*/
function peakIndicesMaker (blocks, level) {

  // instantiation
  const peakIndices = [];
  
  // loop over the entire array
  for (let i = 0; i < blocks.length; i++) {

    // if the wall height present at each index
    // is at least the height of the given level
    // then that index is pushed to the output array
    if(blocks[i] >= level) {
      peakIndices.push(i);
    }
  }

  // array of indices is returned
  return peakIndices;
}

/* This is the meat of the calculation for this problem.
The key point to understand is that the distance between
the two walls at the same height will also be the 
volume of water held between them.  Finally if two walls of 
at least the same height are adjacent to one another then it
is not possible for water to be present.*/
function volAtLevel(peakIndices) {

  // instantiation
  let levelVol = 0;
  
  // if there is only one wall at the height currently being
  // calculated, there cannot physically be any water 
  // at that level.  In this case we return 0 volume.
  if(peakIndices.length === 1) {
    return 0;
  } else {

    // If there is more than one wall of at least the current 
    // level being measured then the level volume is incremented
    // for each 'pair' of walls at that level.  It is important 
    // to note that we are comparing each wall to its adjacent
    // neighbor located at the next index in the array.  Therefore
    // the last element in the array could not possibly hold water
    // to its right.  This is because no wall exists at that level
    // beyond the last wall.
    for (let i = 0; i < (peakIndices.length-1); i++) {

        // this is the most important part of the function.
      // Instead of simply summing the difference of the 
      // indices we have to think about the physical nature
      // of the walls. The walls have a width of 1 so we
      // need to measure the right side of one wall to the
      // left side of its neighbor.  This ensures that a total
      // volume of 0 is added for adjacent walls.
      levelVol += (peakIndices[i+1] - (peakIndices[i]+1));
      
    };
  }

  // the level volume is then returned after all pairs have been summed.
  return levelVol
}
```

We could refactor the same approach to more succinct recursive solution like so:

```js
function rainCollector (blocks, level = Math.max(...blocks)) {
  if (level < 1) return 0;
  let prevMatch;
  const atThisLevel = blocks.reduce((collected, block, idx) => {
    if (block < level) return collected;
    if (prevMatch) collected += idx - prevMatch - 1;
    prevMatch = idx;
    return collected;
  }, 0);
  return atThisLevel + rainCollector(blocks, level - 1);
}
```

We can do even better—we can get this down to `O(n)` time. The approach goes something like this: to determine the water at any given block, look for that block's largest leftwards neighbor, and it's largest rightwards neighbor. Each block has these "bounding walls". The water above each block will be the vertical distance between it and the *smaller* of these bounding walls.

So here's the implementation outline: we can run through the array of blocks in order to keep track of each block's largest leftwards neighbor, and we can run through them in reverse to determine each block's largest rightwards neighbor. Then we can do one final loop, where we determine the water above each block by subtracting its height from the smaller of its two bounding walls.

```js
function rainCollector (blocks) {
  const rightMaxes = [];
  let rightMax = 0;
  for (let i = blocks.length - 1; i >= 0; i--) {
    rightMax = Math.max(rightMax, blocks[i]);
    rightMaxes[i] = rightMax;
  }
  
  const leftMaxes = [];
  let leftMax = 0;
  for (let i = 0; i < blocks.length; i++) {
    leftMax = Math.max(leftMax, blocks[i]);
    leftMaxes[i] = leftMax;
  }

  return blocks.reduce((waterCollected, block, idx) => {
    const leftMax = leftMaxes[idx];
    const rightMax = rightMaxes[idx];
    return waterCollected + Math.min(leftMax, rightMax) - block;
  }, 0);
}
```

...it is possible to simplify the above solution. We can merge the last two loops together—while keeping track of the leftwards maximum for any given block, we can also be calculating the water above it. There's no need to do these two things in separate loops:

```js
function rainCollector (blocks) {
  const rightMaxes = [];
  let rightMax = 0;
  for (let i = blocks.length - 1; i >= 0; i--) {
    rightMax = Math.max(rightMax, blocks[i]);
    rightMaxes[i] = rightMax;
  }
  
  let waterCollected = 0;
  let leftMax = 0;
  for (let i = 0; i < blocks.length; i++) {
    leftMax = Math.max(leftMax, blocks[i]);
    const rightMax = rightMaxes[i];
    waterCollected += Math.min(leftMax, rightMax) - blocks[i];
  }
  
  return waterCollected;
}
```
