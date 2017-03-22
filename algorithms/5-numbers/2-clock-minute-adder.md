# Prompt

Given a current time in the string format `HH:MM` and a number of minutes, return the clock time given those minutes added to the base time. Assume you're working with a standard 12-hour clock and the output should match the input format `HH:MM`.

# Examples

```js
addMinutes('1:30', 30);     // 2:00
addMinutes('12:30', 40);    // 1:10
addMinutes('11:59', 1);     // 12:00
addMinutes('1:59', 240);    // 5:59
addMinutes('1:23', 456789); // 6:32
```

# Solutions

The solution below uses modular math. We can calculate the "total" minutes by adding the current minute hand value to the given minutes to add. From there, if we mod by 60 we'll get the remainder, which tells us where the minute hand would end up. For the hours, we can follow a similar process: add the current hour hand value to the given "hours to add" (which we can get by dividing the total minutes by 60) and then mod by 12.

There's one edge case to consider. The hours are "one-indexed" not "zero-indexed", i.e. there's no such time as `0:40` (well for non-military clocks), instead it's `12:40`. To solve this, we can subtract 1 then mod by 12 then add 1.

```js
function addMinutes (oldTime, minLater) {
  const [oldHrs, oldMins] = oldTime.split(':').map(str => Number(str));
  
  const oldTotalMins = (oldHrs * 60) + oldMins;
  const newTotalMins = oldTotalMins + minLater;
  const totalHrs = Math.floor(newTotalMins / 60);
  const newHrs = ((totalHrs - 1) % 12) + 1;
  const newMins = newTotalMins % 60;
  
  return `${newHrs}:${newMins > 9 ? newMins : `0${newMins}`}`;
}
```
