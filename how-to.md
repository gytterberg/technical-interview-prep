# How To REACTO

This is an internal guide for instructors / fellows / staff for the procedures around REACTO.

---

## Create REACTO pairs

- Go to learndot and look for a workshop titled something like `REACTO Week X (this workshop exists for generating pairs)`
- Go to the pairs tab and select the correct cohort 
- Generate pairs and move them around as needed (if any are red, that's showing incompatibility)
- Save the pairs in learndot and then click "copy pairs"
- Paste the pairs into the cohort google sheet 

---

## Send out REACTO night-before emails

- Find the problem in the technical interview prep repo
- Copy the raw markdown into a new secret gist (and save the link to that gist for later)
- Find REACTO pairs (in cohort google sheet)
- Figure out which pair member is the interviewer for tomorrow (the first column will corresponds to those who were interviewers for the first prompt this week)
- Send email to interviewers only, email template below (feel free to deviate from it however you want)

### Email title

REACTO Prompt for Tomorrow

### Email body

Congratulations, you're an interviewer for tomorrow's mock-interview! At 9:30 tomorrow morning we will go over the prompt at hand, but here it is ahead-of-time: {linkToGist}. Please don't share this with the candidates, so that we can simulate a more realistic mock interview :)

---

## Prepare to lead REACTO

- Presumably this happens at least one day before you lead a given prompt
- You can check whether a prompt has already been successfully remarkised by dropping the relevant `.md` file into https://remarkjs.com/remarkise
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
  - To try out your formatting, head to https://remarkjs.com/remarkise and drop the `.md` file for the prompt into the target box
  - When it's ready, push your branch, make a PR and assign somebody to review it

---

## Lead REACTO

- Call interviewers into another and start going over the prompt at 9:30 *even if some people aren't there*
- Present the remarkised markdown (if the prompt has been properly prepared for that), or the slides.com slideshow (if it exists), or otherwise just display the markdown file as it is
- Field any questions
- Try to finish prepping the interviewers by 9:45
- Before you begin review, give the "interviewers" an opportunity to give some constructive feedback to their "candidates" (2-ish minutes)
- Try to start the review no later than 10:20
