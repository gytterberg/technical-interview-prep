# Design Fandango

## Requirements and Goals

- List cities where movies are located based on affiliate movie theaters
- Once city is selected, our system should display all the movies in that city
- Once movie is selected, show the available show times
- The user can then choose a showing at an affiliate movie theater and book their ticket
- It should then pop up a screen to show seating arrangements that are available or not the ability to select multiple available seats
- First come first serve booking

## Sample User Story

1. User searches for movie
2. User selects movie
3. User is shown available showings of the movie
4. User select specific show timing
5. User selects number of seats to reserve
6. User pays for seats
7. User enjoys movie

## Sample API Design

### Search Movies API

Sample Parameters:

- keyword (string) - filter by keyword
- city (string) - filter by city
- datetime (string) - filter by movie start time
- resultsPerPage (number) - number of results per page

Other parameters:

- sort (If we want to provide that option)

### Reserve Seats API

Sample Parameters:

- sessionID (string) to keep track of a specified user's reservation
- movieID (string) to reserve
- seatsReserved (array)

Depending on the status of the reservation, we can return successful or failed

## Schema

![Sample Schema](./sample-schema.png)

## Discussion on Taking the Booking System to the Next Level

It's first come first serve but how can we handle multiple users wanting to book the same seat? We should try to implement something like a timed system where you can reserve your seats by clicking on them and those seats are locked (based on availability) for a specific amount of time, say 5 minutes. After 5 minutes are up, and the user doesn't purchase the seats, the seats are freed up for someone else to take them. If the user does purchase the seats, the seats become fully unavailable.

# Everything below this is optional and would be better talked about in TC/A

### Using Microservices for Reservation System

#### Microservice for Active Reservation

- We can keep the reservations in some sort of a cache (as well as a database) that when a seat is purchased, it is removed from the reservation list. But also, would release the seats if the expiry time passes.

#### Microservice for Waiting Users

- Same idea as above but we have a cache of users. The user who was waiting the longest would be "next in line" for the seats.
- Use web sockets to be updated on reservation status
