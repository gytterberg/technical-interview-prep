# System Design Strategy Guide

The open ended nature of these types of problems trip up a lot of developers, especially new ones. Below is an example strategy of how to go about system design styled questions.

## Requirement Clarifications/Goals of the System

These problems don't have one correct answer. Of course, if someone is creating Twitter or something, and they have only one table with everything on it, that would be wrong. But just like "standard" REACTOs, a candidate should clarify as much as possible in the beginning. Let's do an example of designing Twitter. Interviewers should set the tone by starting off with the idea that "we are the first engineers of Twitter and we want to design the MVP. The goal is to get them to in the mindset of creating and (later on if they have time) scaling the system. Some questions that could be asked by the candidate in the beginning are as follows:

- Will users of this Twitter clone be able to post tweets and follow other people?
- Will tweets contain videos and photos?
- Are we focusing on the backend or are we going to talk about the frontend as well?
- Do we want something like top tweets or trending topics in our MVP?
- Can users mark tweets as favorites?
- Should we display the timeline?

Another way to do it is to just define some of the requirements for them to give them a starting point especially if they are struggling in the beginning to think of anything but the goal is for them to drive mostly and the interviewer popping in every now and then to ask questions about their thought process, which will be explained a little more below.

We want to make the beginning as bare as possible and then start adding ideas afterwards because we want to build up to a point where we are going to scale, which will also be explained a little more below.

## Schema Design

I believe it is best to start at schema design because it gets right into the bare basics of what data and the relationships among that data will be in our system. It also gives something for both parties to grab onto. Since we teach PostgreSQL and the relational DB model of schema design, we will have them start off with the relational model (Note: candidates shouldn't be talking about specific technologies. For example, instead of PostgreSQL, they should just say a SQL/relational database. If they are going to use something like Redis somewhere, they should just say a cache). For our Twitter MVP, we can start off with a few tables:

- Users table
- UserFollows table
- Tweets table
- Favorites table

And have them define the relationships among the table in an ERD way. Also have them define a few different items in each of the tables.

- Users: UserID, Name, Email, LastLogin, MemberSince
- Tweet: TweetID, TweetContent, NumberOfLikes, Timestamp
- UserFollows: UserID1, UserID2
- FavoriteTweets: UserID, TweetID, Timestamp

## System APIs

This is also another place the candidates can start. I'm more of a fan of starting off with schema design but it is dealer's choice. The systems we create will have APIs that we create. They can be public facing APIs or internal APIs. An example of an API for our Twitter MVP:

```
tweet(user_id tweet_content, tweet_date, tweet_location, twitter_handle, )
```

- tweet_content (string): 140 characters of the tweet
- tweet_date (date): at what time the tweet was created/posted
- tweet_location (string): optional latitude and longitude
- twitter_handle (string): who wrote the tweet

Other APIs they can talk about but not have to "implement" or can talk about later are:

- Tweet Search API
- Generate Timeline API

## Short Discussion on CAP Theorem/Tradeoffs

System design is about tradeoffs. So an example of how this conversation would go: 

- Our system should be highly available
- Define how long is acceptable in terms of latency of something like timeline generation
- What are we trading off? Consistency?

# Everything below this does not apply for REACTOs but can be a means of discussion for TC/As

## Extremely High Level Diagram of Core Components of Our System

For Twitter, we would need multiple (application) servers to serve all the read/write requests with load balancers in front of them for traffic distribution. And on the backend, we need a database (we decided relational earlier) that can store the tweets. This can literally be a bunch of shapes that represent a load balancers, DB, whatever.

- Load balancer(s)
- App servers
- Database(s)
- File Storage (for photos and stuff if they got to that point or was added early)

## (If they get far into it) Scaling/Zeroing In On a Part of the High Level Diagram/Discussion on Different Types of Technologies

Example of what I mean from the title:

- At what layer should we introduce a cache to speed things up?
- Should we be storing all our data in one database?
- Since our timeline will contain most recent tweets (assume we haven't gotten to the point of "relevant" tweets), how should we store that data in a way that's optimized to get the latest tweets?
- Should we be using a NoSQL solution? Or maybe a combo of different databases?

## Scaling into the Future: More Features

The candidates should also talk about future features of our MVP. This shows that they are thinking about the future, thinking about how to grow this system, and is invested in the success of this system.

- Hashtags
- Searching for tweets
- Replying to tweets
- Trending topics
- Tagging other users
- Notifications
- Suggestions

You can add this somewhere after the discussion of the high level diagram or zeroing in on the high level diagram. Have them add new tables to the schema. Interviewer should ask questions like:

- How would we add hashtags to our current design schema and have them walk through their logic (Add another table)

## (If they get really far into it) Identify Bottlenecks

- What are our single points of failure? How are we mitigating it?
- How are we handling possible service shutdowns? (Always fun to talk about Netflix's Chaos Architecture)
- How are we monitoring performance and failures?

## (Optional) "Back of the Envelope Estimation"

This is an optional strategy. I do believe it gets very nitpicky even though it's supposed to be "back of the envelope". Some resources go as far as "How many KB of data will we store?" But starting the conversation about scaling early by saying something like "In one year, we expect 20K users" is good.

Expanding on scale of a system:
- How many tweets do we expect to be sent in a day?
- How many number of timeline generations do we expect to happen per hour?
- How much storage do we need?
    - If the interview gets to the point where they are talking about photos and other forms of media on a tweet, then storage will change.
- What kind of network bandwith are we expecting?
    - A good conversation would be about how we manage traffic with load balancers or something