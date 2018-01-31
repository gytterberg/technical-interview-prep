class: center middle
## Clock Minute Adder

---

## Interviewer Prompt

__Given:__  
  - a time in string format HH:MM
  - a number of minutes

__Return:__  
  - The time given those minutes added to the base time
 
__Assumptions:__
  - You're working with a standard 12-hour clock
  - Output needs to match input format HH:MM

---

## Example Output

```js
addMinutes('1:30', 30);     // 2:00
addMinutes('12:30', 40);    // 1:10
addMinutes('11:59', 1);     // 12:00
addMinutes('1:59', 240);    // 5:59
addMinutes('1:23', 456789); // 6:32
```

---

class: center middle
## Interviewer Guide

---

### RE

The interviewee should mention modular math in their approach. If they come up with a solution that does not account for the edge cases, you may choose to bring these up now, or add them on when a basic solution is reached.

---

### AC

There may be many solutions to transforming the data. If the approach will correctly calculate the total hours/minutes allow them to implement. If it's less efficient, focus on this for your optimization step.

That said, make sure each of the calculations is correct before moving on.

---

### TO

There is not a lot of room for optimization, as most of the operations they'll use are O(1). That said keep prototype method time complexity in mind. String.split(), for example, is an O(n) operation.


---

## Solution and Explanation (a)


One valid solution uses modular math. We can calculate the total minutes by adding the current minute hand value to the given minutes to add. From there, if we mod by 60 we'll get the remainder, which tells us where the minute hand would end up.

For hours, we can follow a similar process. Add the current hour hand value to the given hours to add, which we can get by dividing total minutes by 60, and then mod by 12

There's one edge case to consider. The hours are "one-indexed" not "zero-indexed", i.e. there's no such time as `0:40` (well for non-military clocks), instead it's `12:40`. To solve this, we can subtract 1 then mod by 12 then add 1.

---

## Solution Code
```js
function addMinutes (oldTime, minLater) {
  const [oldHrs, oldMins] = oldTime.split(':').map(str => Number(str));
  
  // get old minutes by converting old hours to minutes
  // then adding old minutes
  const oldTotalMins = (oldHrs * 60) + oldMins;
  // Add the new minutes
  const newTotalMins = oldTotalMins + minLater;
  // Using new total minutes, calculate the hours by dividing by 60
  const totalHrs = Math.floor(newTotalMins / 60);
  // Why subtract and add 1 here?
  const newHrs = ((totalHrs - 1) % 12) + 1;
  // Find minutes by determining how many are left over after dividing by 60
  const newMins = newTotalMins % 60;
  
  // Create return string using interpolation
  return `${newHrs}:${newMins > 9 ? newMins : `0${newMins}`}`;
}
```

---
