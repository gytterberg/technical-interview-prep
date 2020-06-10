# Optimizations

## Current questions

- Memoization and caching
- Queues and throttles
- Load balancing

### Definitions and trade-offs

For each optimization above, explain what each saves and what it costs.

#### Potential answers

- Caching save time for a cost of more space by storing responses statically.
  Memoization caches function return values for given inputs.
- Queues give availability for a cost of more response time. A queue says, "I
  will answer your request eventually", that is, a queue provides eventual
  availability.
- Throttles saves time for a cost of availability. A throttle says, "I
  cannot answer your request right now, try again later."
- Load balancing saves time for a cost of money. Load balancing enables
  horizontal scaling, that is, your application can respond to client requests
  by having more servers.

### Handling too many requests

Say a server can process 10000 requests per second, but you expect 100 times as
many requests per second. Discuss how the optimizations above can help handle
these requests.

#### Potential answer

Load balancing can help handling many requests. Having a load balancer that can
handle this load and 100 identical servers will allow your application to
respond all these requests. This will have significant costs. If money is
limited then throttling the excess requests and putting each on a queue will
allow for responding to each request, but in this scenario the queues will
never be emptied. It is possible that caching can solve this, but it is not a
guaranteed solution.

### Handling an API that is too slow?

Your server makes one API call per client request. This API can respond to at
most 10 requests per second. Most of the time your website gets less than 10
requests per second, but occasionally you get 100 requests per second. How
would you manage this traffic? What if each response from the API is unique?

#### Potential answer

Since this traffic is transient, that is, it only appears occassionally, then
throttling requests and placing them on a queue is a good solution. As long as
the frequency of spikes is less than once every 10 seconds then the queue will
eventually empty meaning all requests will have responses in a timely manner.

## Extra questions

- How would you find duplicates in an array if you’re optimizing for space?
  (Hash tables won’t save you here). If there are many duplicates, just return
  one of them.
- What are some data structures that can help obtain more optimized runtime?
- Describe how different time complexities vary with small vs large input.
- If you notice that your web application is running/loading slowly, what steps
  would you take to optimize load time?

## Thanks

Thanks to the following contributors to this page:
- Jess Bracht
