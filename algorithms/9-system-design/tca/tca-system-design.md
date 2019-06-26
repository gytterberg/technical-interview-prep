# Think/Pair/Share

For the week 4 TC/A in 1902, we went over throttling, load balancers, queues and caches. Because coming up with an ERD and system APIs (for system design) and coming up with class diagrams and activity diagrams (for OOP design) would take up a lot of time and there is a lot of material in the lecture, we can reserve some time in the TC/A on Fridays to either add on ideas like caches or load balancers to the system design REACTO or to introduce some scenarios on how to apply system design principles or both.

This would follow Matt's philosophy of JIT (Just in Time) learning as well as a spaced repetition model while facilitating communication, sharing, and presenting on how to talk about systems without having to go super deep into detail. This method also addresses the relevancy problem that Dan brought up about something like caches and load balancers being too advanced. We will introduce the 50K foot view of system design, the students can be tested on schema design, API design, OO design for the REACTOs, the students can take this further with the TC/A on Friday.

Examples of what can be asked in a TC/A:

Assuming they did a REACTO with schema and design for some system (Twitter, Fandango, etc):

- Where and how can we introduce a load balancer(s) in the system?
- How might we be able to introduce a cache?

Other questions that can be asked based on the lecture:

- What is database replication? In what situation might it be useful?
- How would you protect your API from being abused?
- What is sharding? Why is it useful?
- Above questions with load balancers, cache apply here as well

Other ways of doing a TC/A:

- Ask the pairs to design/diagram a very high level system (Tinder, Twitter, etc). This doesn't need to have schemas or APIs but rather just a high level flow chart noting system flow from application to database. After they do this, a group can volunteer to present their idea.
