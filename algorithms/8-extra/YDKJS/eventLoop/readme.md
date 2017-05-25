<a href="http://slides.com/katehumphrey/reacto-7-8#/">Slides</a> <br/>
<a href="https://repl.it/C9mj/0">repl.it</a>

-----

Problem:

The event loop is how the browser manages asynchronicity. Understanding how it works means you understand the environment you are working in.

Implement code that mimics how the event loop works. 
Don't get lost in the details, but simply try to capture its main functionality

-----
Blurb Extended:

“The JS engine doesn't run in isolation. It runs inside a hosting environment, which is for most developers the typical web browser. Over the last several years (but by no means exlusively), JS has expanded beyond the browser into other environments, such as servers, via things like Node.js. In fact, JavaScript gets embedded into all kinds of devices these days, from robots to lightbulbs.

But the one common "thread" (that's a not-so-subtle asynchronous joke, for what it's worth) of all these environments is that they have a mechanism in them that handles executing multiple chunks of your program over time, at each moment invoking the JS engine, called the "event loop."

In other words, the JS engine has had no innate sense of time, but has instead been an on-demand execution environment for any arbitrary snippet of JS. It's the surrounding environment that has always scheduled”
“events" (JS code executions).

So, for example, when your JS program makes an Ajax request to fetch some data from a server, you set up the "response" code in a function (commonly called a "callback"), and the JS engine tells the hosting environment, "Hey, I'm going to suspend execution for now, but whenever you finish with that network request, and you have some data, please call this function back."

The browser is then set up to listen for the response from the network, and when it has something to give you, it schedules the callback function to be executed by inserting it into the event loop.”

Excerpt From: Kyle Simpson. “You Don't Know JS: Async & Performance.” iBooks. 



The event loop is how the browser manages asynchronicty. Understanding how the event loop works is critical to our ability to write performant asynchronous code. 
Try to pseudocode out the eventLoop. Don't get lost in the details. Simply try to capture its main functionality. 