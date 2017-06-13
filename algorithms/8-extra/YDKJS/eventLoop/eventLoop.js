// To implement the 'eventQueue' you can assume that it is a Queue without writing that functionality
// OR simply use an array that acts as a queue by only using '.shift()'
let eventQueue = [];

// ensure the event loop keeps going "forever"
while (true) {
    // perform a "tick"
    if (eventQueue.length > 0) {
        // get the next event in the queue
        let event = eventQueue.shift();

        // now, execute the next event
        //this block does all of the checks to ensure that the event is a function that can run appropriately
        try {
            event();
        }
        catch (err) {
            reportError(err);
        }
    }
}