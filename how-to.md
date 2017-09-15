# How To REACTO

This is an internal guide for instructors / fellows / staff for the procedures around REACTO.

---

## Create REACTO pairs

Only do this before the first problem of each week.

- Go to learndot and look for a workshop titled something like `REACTO Week X (this workshop exists for generating pairs)`
- Go to the pairs tab and select the correct cohort 
- Generate pairs and move them around as needed (if any are red, that's showing incompatibility)
- Save the pairs in learndot and then click "copy pairs"
- Paste the pairs into the cohort google sheet
- Don't forget to slack out the pairs!

---

## Send out REACTO night-before emails

- Find the problem in the technical interview prep repo
- Copy the raw markdown into a new secret gist (and save the link to that gist for later)
- Find REACTO pairs (in cohort google sheet)
- Figure out which pair member is the interviewer for tomorrow (the first column will corresponds to those who were interviewers for the first prompt this week)
- Copy and paste the email addresses into a new email
- Send email to interviewers only, email template below (feel free to deviate from it however you want)

### Email title

REACTO Prompt for Tomorrow

### Email body

Congratulations, you're an interviewer for tomorrow's mock-interview! At {time} tomorrow morning we will go over the prompt at hand, but here it is ahead-of-time: {linkToGist}. Please don't share this with the candidates, so that we can simulate a more realistic mock interview :)

---

## Prepare to lead REACTO

This happens at least one day before you lead a given prompt.

- To check whether a prompt has already been successfully remarkised, see **Viewing markdowns as slideshows**
- Otherwise, head to the technical interview prep github repo
  - Check whether some other fellow/instructor is already working on getting the prompt ready for remarkise by looking for an issue that is assigned
  - If nobody is, decide whether you want to or not—if you decide to go for it, see **Prepare a REACTO prompt for remarkise**)

---

## Prepare a REACTO prompt for remarkise

- Check the technical interview prep github repo for an issue about preparing this particular prompt for remarkise
- If one already exists and has somebody assigned, check in with that person
- If none exists
  - Make one and assign yourself
  - Go to your local clone of the technical interview prep repo (or clone it if you haven't)
  - Make a branch and start editing
  - Here is the [remark wiki](https://github.com/gnab/remark/wiki) which you can use to help you properly format the markdown file
  - To try out your formatting, see **Viewing markdowns as slideshows**
  - When it's ready, push your branch, make a PR and assign somebody to review it

---

## Viewing markdowns as slideshows

For when you want to check whether a markdown file is slideshow-ready and/or present one that is.

- For working locally (and with live updating for your edits) use https://github.com/FullstackAcademy/fs-present
- Otherwise, you can head to https://remarkjs.com/remarkise and drop the markdown file for the prompt into the target box

---

## Lead REACTO

*Note: see the **Times** below.*

- Call interviewers into another room (for remote, see **Zoom rooms and REACTO**) and start going over the prompt at the starting time *even if some people aren't there*
- Present the remarkised markdown (if the prompt has been properly prepared for that), or the slides.com slideshow (if it exists), or otherwise just display the markdown file as it is
- Field any questions
- Before you begin review, give the "interviewers" an opportunity to give some constructive feedback to their "candidates" (2-ish minutes)

---

## Zoom rooms and REACTO

This is relevant for leading remote REACTO. It may help to check out [zoom's own tutorial on managing breakout rooms](https://support.zoom.us/hc/en-us/articles/206476313-Managing-Video-Breakout-Rooms).

- From your own computer, join the relevant zoom classroom
  - Make sure you know which one this is ahead of time
  - If the zoom classroom has not been started, you'll need to do that yourself via the host computer: 1) open zoom app, 2) start meeting
- *Use the zoom classroom host computer* (this is important because only the host can manage breakout rooms) to create as many breakout rooms as there will be mock interviews (generally, number of students divided by two)
- For the interview prep, put yourself and all of the interviewers into one breakout room
- When you're done you'll need to re-assign breakout rooms according to REACTO pairs for that day

---

## Times

### NY

| name             | time        |
|:----------------:|:-----------:|
| interviewer prep | 9:30–9:45   |
| mock interview   | 9:45–10:20  |
| class review     | 10:20–10:30 |

### Remote

*In EST*

| name             | time        |
|:----------------:|:-----------:|
| interviewer prep | 10:00–10:15 |
| mock interview   | 10:15–10:50 |
| class review     | 10:50–11:00 |

### Chicago

| name             | time      |
|:----------------:|:---------:|
| interviewer prep | 8:30–8:45 |
| mock interview   | 8:45–9:20 |
| class review     | 9:20–9:30 |

---

## REACTO + Zoom

- Head to the zoom classroom
- Use the zoom classroom host computer to create breakout rooms and create at least one breakout room
- Put yourself and all of the interviewers into that breakout room
- 
